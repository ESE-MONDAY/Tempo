import React from 'react';
import Sidebar from '../../components/Sidebar';
import CitiesWeatherInfo from '../../components/CitiesWeatherInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../states/store';
import FavouriteCityWeatherInfo from '../../components/FavouriteCityWeatherInfo';



const CityList = () => {
  
  const { loading,error,cities} = useSelector((state: RootState) => state.favouriteCity)

  return (
    <div className='w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row gap-4 h-screen'>
      <Sidebar/>
      <div className='flex-grow p-4 overflow-auto'>
        <h1>Tempo - Get Weather forecast for your city</h1>
          <FavouriteCityWeatherInfo />
          <CitiesWeatherInfo />
      </div>
    </div>
  )
}

export default CityList