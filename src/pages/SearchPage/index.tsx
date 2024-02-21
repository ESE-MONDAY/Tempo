import React, {useState, useCallback, useEffect} from 'react';
import Footer from '../../components/shared/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../states/store';
import { useParams } from 'react-router-dom';
import { fetchCityWeatherData } from '../../states/FetchWeatherInfo';


const SearchPage = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch()
  const {loading, weatherData,error} = useSelector((state:RootState) => state.cityWeather)
 
  

  useEffect(() => {
    if(cityName){
      dispatch(fetchCityWeatherData(cityName) as any)
    }
  }, [cityName, dispatch]);
  
  if (!cityName) {

      return <div>Loading...</div>;
  }


  return (
    <div className='flex flex-col min-h-screen w-full max-w-[1600px] '> 
      <div className='w-full mx-auto flex flex-col sm:flex-row gap-4 flex-grow'> 
      {weatherData ? (
        <>
          <h1>{cityName} Details</h1>
          <p>Description: {weatherData.description}</p>
          <p>Temperature: {weatherData.temperature}</p>
          
        </>
      ) : (
        <p>{error}</p>
      )}
        
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;