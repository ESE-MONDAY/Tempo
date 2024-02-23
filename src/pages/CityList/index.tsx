import React, {useEffect} from 'react';
import CitiesWeatherInfo from '../../components/CitiesWeatherInfo';
import FavouriteCityWeatherInfo from '../../components/FavouriteCityWeatherInfo';
import { fetchUserWeatherData } from '../../states/UserWeatherData';
import { useDispatch} from 'react-redux';


const CityList = () => {
  const dispatch = useDispatch();


  useEffect(() => {
   
    const timeoutId = setTimeout(() => {
      dispatch(fetchUserWeatherData() as any);
    },5 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);


  return (
    <div className='w-full flex-col sm:flex-row gap-4 h-auto bg-blue-200 '>
      <div className=' p-4 overflow-auto lg:px-16 max-w-[1200px] mx-auto'>
        <h1>Tempo - Get Weather forecast for your city</h1>
          <FavouriteCityWeatherInfo />
          <CitiesWeatherInfo />
      </div>
    </div>
  )
}

export default CityList