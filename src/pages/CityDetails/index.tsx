import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../states/store';
import { useParams } from 'react-router-dom';
import { editWeatherDataNoteAsync, deleteWeatherDataNoteAsync } from '../../states/LargestCitySlice';
import { FaFilePen, FaTrash } from "react-icons/fa6";
import { fetchForecast } from '../../states/WeatherForecast';
import { formatDateString, formatSunriseSunset } from '../../utils/DateFormatter';
import LineChartComponent from '../../components/LineChart';
import BarChartComponent from '../../components/BarChart';
import { SunRise, SunSet } from '../../components/shared/Icons';



const CityDetails = () => {
  const dispatch = useDispatch()
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [newNote, setNewNote] = useState('');
  const [ showForm, setShowForm] = useState(false)

  const {citiesWithWeather, error} = useSelector((state: RootState) => state.largestCity)
  const { forecastDetails, weatherForecast, weatherIcon} = useSelector((state: RootState) => state.cityWeatherForecast)
  const sunRise = weatherForecast?.sunrise
  const sunSet = weatherForecast?.sunset
  const timezone = weatherForecast?.timezone
  const formattedTimes = sunRise !== undefined && sunSet !== undefined && timezone !== undefined
  ? formatSunriseSunset(sunRise, sunSet, timezone)
  : { sunrise: 'N/A', sunset: 'N/A' }; 

  const baseUrl = 'https://openweathermap.org/img/wn/';
  const iconUrl = `${baseUrl}${weatherIcon}@2x.png`;
  const currentTime = new Date().toLocaleTimeString();



  useEffect(() => {
    const cityWeather = citiesWithWeather.find((city) => city.city === cityName);
    if (cityName) {
      setWeatherData(cityWeather);
      dispatch(fetchForecast(cityName) as any);
    } 
  }, [cityName, citiesWithWeather, dispatch]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
  };

  const handleDelete = (cityName: string) => {
    if (cityName) {
      dispatch(deleteWeatherDataNoteAsync({ cityName }) as any).then(() => {
        setWeatherData((prevData: any) => ({
          ...prevData,
          note: "",
        }));
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowForm(false)
    if (cityName) {
      dispatch(editWeatherDataNoteAsync({ cityName, newNote }) as any).then(() => {
        setWeatherData((prevData: any) => ({
          ...prevData,
          note: newNote,
        }));
      });
    }
  };
  const data = forecastDetails?.map(detail => ({
    name: formatDateString(detail.dt_txt),
    temp: detail.main.temp, 
    humidity: detail.main.humidity, 
    pressure: detail.main.pressure 
  }));

  
  const dataList = forecastDetails?.map(detail => ({
    name: formatDateString(detail.dt_txt),
    temp_min: detail.main.temp_min, 
    temp_max: detail.main.temp_max, 
    feels_like: detail.main.feels_like 
  }));

  if (!cityName) {

    return <div>Loading...</div>;
}

  return (
    <div className='flex flex-col w-full sm:px-16 p-4 bg-blue-200 h-full'> 
      <div className='w-full max-w-[1000px] mx-auto flex flex-col sm:flex-row gap-4 flex-grow'> 
      {weatherData ? (
        <>
          
          <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold mb-4">{cityName} </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Description:</p>
            <p className="">{weatherData.description}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Temperature:</p>
            <p>{weatherData.temperature}</p>
          </div>
          
          {weatherData.note ? (
            <div className="flex flex-col">
              <div className='flex gap-4'> 
              <p className="text-lg font-semibold">Note:</p>
              <button className='bg-red-500 text-white rounded-md px-4 py-2'  onClick={() => setShowForm(true)}><FaFilePen /> </button>
              <button className='bg-red-500 text-white rounded-md px-4 py-2' onClick={() => handleDelete(cityName as string )}><FaTrash /></button>
              
              </div>
              <p>{weatherData.note}</p>
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg max-w-[100px]"
            >
              Add Note
            </button>
          )}
        </div>
        {showForm && (
            
            <form onSubmit={handleSubmit} className="mt-6">
            <textarea
              value={newNote}
              onChange={handleNoteChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              placeholder="Add a note..."
            />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2"
              >
                Save Note
              </button>
             
            </div>
          </form>

        )}
      
           
            </div>
        </>
      ) : (
        <p>{error}</p>
      )}
        
      </div>
      <div className='max-w-[1000px] w-full  mx-auto'>
  {
  forecastDetails && weatherForecast && weatherData && (
    <>
    <div className=' flex flex-col gap-4  py-8 px-1 lg:px-4  mt-8 '>
     
      <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='col-span-1 py-8 px-1 lg:px-4 flex flex-col gap-4  items-center justify-center  bg-white rounded-xl shadow-md'>
        <img alt='weather' src={iconUrl} className=''/>
          <p className='text-3xl font-bold text-center text-gray-700'>{weatherForecast.name} <sup className='bg-orange-500 text-xl text-white rounded-full p-2'>{weatherForecast.country}</sup></p>
          <p className='font-bold text-5xl  text-gray-700 '>{Math.round(weatherData.temperature)} <sup className='text-4xl'>°C</sup></p>  
          <p className='font-bold text-xl  text-gray-700 '>{weatherForecast.description} </p>
          <p className='font-bold text-xl  text-gray-700 '>Population: {weatherForecast.population} </p>
          
        </div>
        <div className='col-span-1 sm:col-span-2 h-[350px] bg-white rounded-md shadow-md py-8 px-1  '>
        <h2 className='text-center font-semibold text-gray-700 text-xl '>5 days weather Forecast (3 hours Interval)</h2>
        <BarChartComponent data={dataList} />
        </div>
      
      </div>
   
  </div>
     <div className='h-[350px]  flex flex-col gap-4 w-full  bg-white py-8 px-1 lg:px-4 rounded-md mt-8 '>
      <h2 className='text-center font-semibold text-gray-700 text-xl '>5 days weather Forecast (3 hours Interval)</h2>
    <LineChartComponent data={data} />
  </div>
  
  <div className='grid grid-cols-1  sm:grid-cols-2 py-8 px-1 lg:px-4 gap-4  '>
  <div className='h-auto bg-white col-span-1 rounded-md '>
    <div className='border-b-[1px] border-b-gray-300 p-4 flex justify-between items-center'>
      <h3 className='font-semibold text-gray-700 text-xl'>Current Weather</h3>
      <p className='font-medium text-sm text-gray-600'>{currentTime}</p>
    </div>
    <div className='py-8 px-4 gap-8 grid grid-cols-1 sm:grid-cols-2'>
      <div className='col-span-1 flex gap-4 lg:gap-2 items-center'>
        <img alt='weather' src={iconUrl}/>
        <p className='font-bold text-7xl sm:text-5xl text-gray-700'>{Math.round(weatherData.temperature)} <sup className='text-2xl'>°C</sup></p>
      </div>
      <div className='col-span-1'>
        <div className='border-b-[1px] border-b-gray-300 flex justify-between py-2'>
          <p className='font-medium text-base text-gray-600'>Wind</p>
          <p className='font-medium text-xl text-gray-600'>{forecastDetails[0].wind.deg} ° </p>
        </div>
        <div className='border-b-[1px] border-b-gray-300 flex justify-between py-2'>
          <p className='font-medium text-base text-gray-600'>Wind Speed</p>
          <p className='font-medium text-xl text-gray-600'>{forecastDetails[0].wind.speed} Km/h</p>
        </div>
        <div className=' flex justify-between py-2'>
          <p className='font-medium text-base text-gray-600'>Wind Gust</p>
          <p className='font-medium text-xltext-gray-600'>{forecastDetails[0].wind.gust}</p>
        </div>
       
      </div>
    </div>
  </div>
  <div className='col-span-1 bg-white rounded-md'>
  <div className='border-b-[1px] border-b-gray-300 p-4'>
      <h3 className='font-semibold text-gray-700 text-xl'>Sun & Moon</h3>
    </div>
    <div className='grid grid-cols-2 py-4 '>
      <div className='col-span-1 flex items-center flex-col justify-center border-r-[1px] border-r-gray-300'>
      <SunRise width='40' height='40' />
      <p className='font-medium text-2xl mt-4 text-gray-600'>{formattedTimes.sunrise}</p>
      </div>
      <div className='col-span-1 flex items-center flex-col justify-center '>
      <SunSet width='40' height='40'/>
      <p className='font-medium text-2xl text-gray-600 mt-4'>{formattedTimes.sunset}</p>
      </div>
      
    </div>

  </div>
  </div>
  
    </>
  )
 }
  </div>

    </div>
  );
};

export default CityDetails;