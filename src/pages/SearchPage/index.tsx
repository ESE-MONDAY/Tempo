import React, { useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../states/store';
import { useParams } from 'react-router-dom';
import { fetchCityWeatherData } from '../../states/FetchWeatherInfo';


const SearchPage = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch()
  const { weatherData,error} = useSelector((state:RootState) => state.cityWeather)
 
  

  useEffect(() => {
    if(cityName){
      dispatch(fetchCityWeatherData(cityName) as any)
    }
  }, [cityName, dispatch]);
  
  if (!cityName) {

      return <div>Loading...</div>;
  }


  return (
  
<div className='flex flex-col flex-grow w-full p-4 lg:px-16 rounded-lg '>
  <div className='w-full mx-auto flex flex-col sm:flex-row gap-4 flex-grow'>
    {weatherData ? (
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-2">{cityName} Details</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-base mb-2">Description: {weatherData.description}</p>
          <p className="text-base">Temperature: {weatherData.temperature}</p>
        </div>
      </div>
    ) : (
      <p className="text-base text-red-600">{error}</p>
    )}
  </div>
</div>

   

  );
};

export default SearchPage;