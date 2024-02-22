import React, {useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/store';
import { fetchCitiesWithWeather } from '../states/LargestCitySlice';
import LargestCityWeatherInfo from './LargestCityWeatherInfo';
import { clearLargestCities } from '../states/LargestCitySlice';

const CitiesWeatherInfo = () => {
    const dispatch = useDispatch();
    const { citiesWithWeather} = useSelector((state: RootState) => state.largestCity)

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
    <div className='mt-8 '>
      {
        sortedCitiesWithWeather.length > 0 &&(
          <>
          <div className='flex justify-between'>
          <h2 className='font-semibold text-2xl'>Top Cities </h2>
          <button className='text-sm text-white bg-red-500 px-2 py-1 rounded-md font-medium'  onClick={handleClearLargestCities}>Clear List</button>
          </div>      
                  <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {sortedCitiesWithWeather.map((cityWeather) =>(
                            <div key={cityWeather.city} className='col-span-1'>
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