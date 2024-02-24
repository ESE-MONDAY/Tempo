import React from 'react';
import { GoHeartFill } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCity, removeFavoriteCity } from '../states/FavouriteCity';
import { RootState } from '../states/store';
import { useNavigate } from 'react-router-dom'; 



interface CityWeatherInfoProps {
  cityInfo:{
    city: string;
    description: string;
    humidity: number
    pressure: number
    temp_max: number;
    temp_min: number;
    icon: string;
    temperature: number
  }
}

const CityWeatherInfo: React.FC<CityWeatherInfoProps> = ({ cityInfo }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate(); 
  const { cities } = useSelector((state: RootState) => state.favouriteCity);
  const baseUrl = 'https://openweathermap.org/img/wn/';
  const iconUrl = `${baseUrl}${cityInfo.icon}@2x.png`;
  
 

  const isCityLiked = (city: string, cities: any[]): boolean => {
    return cities.some((c: any) => c.city === city);
  };
  

  const handleAddFavorite = () => {
    if (isCityLiked(cityInfo.city, cities)) {
      dispatch(removeFavoriteCity(cityInfo));
    } else {
      dispatch(addFavoriteCity(cityInfo));
    }
  };
  
  const handleSeeMore = () => {
    navigate(`/city-details/${cityInfo.city}`);
  };
 
 
  return (
    <div className='rounded-lg bg-gray-700 p-4  mt-8 text-gray-100'>
      <div className='flex justify-end items-center'>
        <button aria-label="Like Button" onClick={handleAddFavorite}><GoHeartFill className={`${isCityLiked(cityInfo.city, cities)  ? "text-red-500" : "text-gray-100"} text-xl `} type='button'/></button>
      </div>
      <div className='flex justify-between items-center mt-1 '>
      <img alt='WeatherIcon' src={iconUrl} className='w-16 h-16' />
          <p className='text-2xl font-medium'>{Math.round(cityInfo.temperature)} <sup className=''>°C</sup></p>
      </div>
      <p className='font-semibold text-xl '>{cityInfo.city}</p>
      <div className='flex justify-between items-center mt-1'>
          <p className='text-sm font-medium '>{cityInfo.description}</p>
          <button className='text-sm font-medium'  onClick={handleSeeMore}>See more</button>
      </div>
    </div>
  );
};

export default CityWeatherInfo;
