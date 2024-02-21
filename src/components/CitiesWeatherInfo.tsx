import React, {useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/store';
import { fetchCitiesWithWeather } from '../states/LargestCitySlice';
import LargestCityWeatherInfo from './LargestCityWeatherInfo';
import { clearLargestCities } from '../states/LargestCitySlice';

const CitiesWeatherInfo = () => {
    const dispatch = useDispatch();
    const { citiesWithWeather,loading} = useSelector((state: RootState) => state.largestCity)

    const fetchData = useCallback(() => {
        dispatch(fetchCitiesWithWeather() as any);
        
      }, [dispatch]);
    
      useEffect(() => {
        fetchData();
      }, [fetchData]);


    const sortedCitiesWithWeather = [...citiesWithWeather].sort((a, b) =>
    a.city.localeCompare(b.city)
  );
  const handleClearLargestCities = () => {
    dispatch(clearLargestCities() as any);
  };
  return (
    <div className='mt-8'>
      {
        sortedCitiesWithWeather.length > 0 &&(
          <>
            <h3>Here are a list top 15 cities</h3>
                  <button className='text-sm text-red-500 font-medium'  onClick={handleClearLargestCities}>Delete</button>
                  <div className=' flex flex-wrap gap-4'>
                        {sortedCitiesWithWeather.map((cityWeather) =>(
                            <div key={cityWeather.city} className=''>
                                <LargestCityWeatherInfo  cityInfo={cityWeather}/>
                            </div>
                        ))}
                  
                </div>
          </>

        )
      }
     
    </div>
   
  )
}

export default CitiesWeatherInfo