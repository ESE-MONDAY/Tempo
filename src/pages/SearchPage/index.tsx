import React, { useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../states/store';
import { useParams } from 'react-router-dom';
import { fetchCityWeatherData } from '../../states/FetchWeatherInfo';
import { fetchForecast } from '../../states/WeatherForecast';
import { formatDateString, formatSunriseSunset } from '../../utils/DateFormatter';
import LineChartComponent from '../../components/LineChart';
import BarChartComponent from '../../components/BarChart';
import { SunRise, SunSet } from '../../components/shared/Icons';
import SearchBar from '../../components/shared/SearchBar';
import Navbar from '../../components/shared/Navbar';



const SearchPage = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch()
  const { weatherData} = useSelector((state:RootState) => state.cityWeather)
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
 
  const fetchData = useCallback(() => {
    if (cityName) {
      dispatch(fetchCityWeatherData(cityName) as any);
      dispatch(fetchForecast(cityName) as any);
    }
  }, [cityName, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!cityName) {

      return <div>Loading...</div>;
  }

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
  return (
  
<div className='flex flex-col flex-grow w-full rounded-lg bg-white'>
  <Navbar />
<div className='bg-[#F2F2F2] flex sm:hidden'>
          <div className='max-w-[800px]  flex  mx-auto w-full '>
            <div className=' w-full p-4'>
            <SearchBar />

            </div>
           
          </div>
        
        </div>
  <div className='max-w-[1000px] w-full  mx-auto'>
  {
  forecastDetails && weatherForecast && weatherData && (
    <>
    <div className=' flex flex-col gap-4  py-8 px-1 lg:px-4  mt-8 '>
     
      <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='col-span-1 py-8 px-1 lg:px-4 flex flex-col gap-4  items-center justify-center  '>
        <img alt='weather' src={iconUrl} className=''/>
          <p className='text-3xl font-bold text-center text-gray-700'>{weatherForecast.name} <sup className='bg-orange-500 text-xl text-white rounded-full p-2'>{weatherForecast.country}</sup></p>
          <p className='font-bold text-5xl  text-gray-700 '>{Math.round(weatherData.temperature)} <sup className='text-4xl'>°C</sup></p>  
          <p className='font-bold text-xl  text-gray-700 '>{weatherForecast.description} </p>
          <p className='font-bold text-xl  text-gray-700 '>Population: {weatherForecast.population} </p>
          
        </div>
        <div className='col-span-1 sm:col-span-2 h-[350px] py-8 px-1  '>
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

export default SearchPage;