import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/store';
import CityWeatherInfo from './CityWeatherInfo';
import { clearFavoriteCities } from '../states/FavouriteCity';

const FavouriteCityWeatherInfo = () => {
  const dispatch = useDispatch()
  


  const { cities } = useSelector((state: RootState) => {
    const sortedCities = state.favouriteCity.cities.slice().sort((a, b) => a.city.localeCompare(b.city));
    return {
      cities: sortedCities,
      loading: state.favouriteCity.loading
    };
  });

  const handleClearFavorites = () => {
    dispatch(clearFavoriteCities());
  };

  return (
    <div>
      {cities.length > 0 && (
        <>
         <div className='flex justify-between mt-8 '>
          <h2 className='font-semibold text-2xl'>Favourite Cities </h2>
          <button className='text-sm text-white bg-red-500 px-2 py-1 rounded-md font-medium'  onClick={handleClearFavorites}>Delete</button>
          </div>
    
     
          <div className='flex flex-wrap gap-4'>
            {
               cities.map((cityWeather) => (
                <div key={cityWeather.city} className=''>
                  <CityWeatherInfo cityInfo={cityWeather} />
                </div>
              ))}
     
           </div>
        </>

      )}
     
    </div>
   
  );
}

export default FavouriteCityWeatherInfo;
