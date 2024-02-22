import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../states/store';
import { useParams } from 'react-router-dom';
import { editWeatherDataNoteAsync, deleteWeatherDataNoteAsync } from '../../states/LargestCitySlice';
import { FaFilePen, FaTrash } from "react-icons/fa6";



const CityDetails = () => {
  const dispatch = useDispatch()
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [newNote, setNewNote] = useState('');
  const [ showForm, setShowForm] = useState(false)

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


  return (
    <div className='flex flex-col w-full sm:px-16 p-4 '> 
      <div className='w-full mx-auto flex flex-col sm:flex-row gap-4 flex-grow'> 
      {weatherData ? (
        <>
          
          <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold mb-4">{cityName} Details</h1>
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

    </div>
  );
};

export default CityDetails;