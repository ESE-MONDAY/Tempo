import React, {useState, useEffect} from 'react';
import Footer from '../../components/shared/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../states/store';
import { useParams } from 'react-router-dom';
import { editWeatherDataNoteAsync, deleteWeatherDataNoteAsync } from '../../states/LargestCitySlice';



const CityDetails = () => {
  const dispatch = useDispatch()
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [newNote, setNewNote] = useState('');

  const {citiesWithWeather, error} = useSelector((state: RootState) => state.largestCity)

  useEffect(() => {
    const cityWeather = citiesWithWeather.find((city) => city.city === cityName);
    if (cityWeather) {
      setWeatherData(cityWeather);
    } 
  }, [cityName, citiesWithWeather]);

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
    if (cityName) {
      dispatch(editWeatherDataNoteAsync({ cityName, newNote }) as any).then(() => {
        setWeatherData((prevData: any) => ({
          ...prevData,
          note: newNote,
        }));
      });
    }
  };


  return (
    <div className='flex flex-col min-h-screen w-full max-w-[1600px] '> 
      <div className='w-full mx-auto flex flex-col sm:flex-row gap-4 flex-grow'> 
      {weatherData ? (
        <>
          <h1>{cityName} Details</h1>
          <p>Description: {weatherData.description}</p>
          <p>Temperature: {weatherData.temperature}</p>
          <p>Note:{weatherData.note} </p>
          <form onSubmit={handleSubmit}>
              <textarea value={newNote} onChange={handleNoteChange} rows={4} cols={50} />
              <button type='submit'>Save Note</button>
            </form>
            <button onClick={() => handleDelete(cityName as string )}>Delete</button>
        </>
      ) : (
        <p>{error}</p>
      )}
        
      </div>
      <Footer />
    </div>
  );
};

export default CityDetails;