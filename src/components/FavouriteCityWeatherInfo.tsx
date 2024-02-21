import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/store';
import CityWeatherInfo from './CityWeatherInfo';
import { clearFavoriteCities } from '../states/FavouriteCity';

const FavouriteCityWeatherInfo = () => {
  const dispatch = useDispatch()
  


  const { cities, loading } = useSelector((state: RootState) => {
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
         <h3>Here are a list of your favourite cities</h3>
         <button className='text-sm text-red-500 font-medium'  onClick={handleClearFavorites}>Delete</button>
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
