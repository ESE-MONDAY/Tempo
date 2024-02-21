import React, { useState, useEffect } from 'react';
import SearchBar from './shared/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from '../states/UserWeatherData';
import { RootState } from '../states/store';
import { useNavigate } from 'react-router-dom'; 


interface UserLocation {
  latitude: number;
  longitude: number;
}

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { city, temperature, currentTime, weatherIcon } = useSelector((state: RootState) => state.weather);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const baseUrl = 'https://openweathermap.org/img/wn/';
  const iconUrl = `${baseUrl}${weatherIcon}@2x.png`;

  const handleSearch = (query: string) => {
    alert(query);
  };

  const defaultLocation = { longitude: 3.3686, latitude: 6.5143 }

 

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location: UserLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(location);
          dispatch(fetchWeatherData(location) as any);
          
        },
        (error: GeolocationPositionError) => {
          


          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleButtonClick = () => {
    fetchUserLocation();
  };

  useEffect(() => {
    const fetchLocationTimeout = setTimeout(() => {
      if (!city) {
        fetchUserLocation();
      }
    },1000);

    return () => clearTimeout(fetchLocationTimeout);
  }, []);



  return (
    <div className='w-full sm:w-[40%] p-4 shadow-md '>
      <SearchBar onSearch={handleSearch} />
      <div className='mt-8'>
        <img alt='WeatherIcon' src={iconUrl} />
       {city}
       {temperature}°C
       {currentTime}
      </div>
   
      <div>
       
      </div>
    </div>
  );
};

export default Sidebar;
