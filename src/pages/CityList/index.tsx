import React, {useEffect} from 'react';
import CitiesWeatherInfo from '../../components/CitiesWeatherInfo';
import FavouriteCityWeatherInfo from '../../components/FavouriteCityWeatherInfo';
import { fetchUserWeatherData } from '../../states/UserWeatherData';
import { useDispatch} from 'react-redux';
import SearchBar from '../../components/shared/SearchBar';


const CityList = () => {
  const dispatch = useDispatch();


  useEffect(() => {
   
    const timeoutId = setTimeout(() => {
      dispatch(fetchUserWeatherData() as any);
    },5 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);


  return (
    <div className='w-full flex-col sm:flex-row gap-4 h-auto bg-white '>
       <div className='h-auto relative'>
          <img alt='header' src='./winter6.jpg' style={{objectFit: "fill"}} className='w-full h-[300px]' />
          <div className='absolute top-0 left-0 w-full h-full flex  items-center px-4 bg-black/50'>
            <div className='max-w-[800px] w-full mx-auto  '>
            <h1 className='text-[#EB6E4B] text-3xl sm:text-6xl font-bold'>Tempo Weather</h1>
            <p className='text-white mt-8 font-semibold text-xl sm:text-3xl max-w-[400px]'>Weather forecasts, nowcasts and history in a fast and elegant way</p>
            </div>
            </div>
        </div>
        <div className='bg-[#F2F2F2]'>
          <div className='max-w-[800px] p-4 flex  mx-auto '>
            <div className='sm:basis-2/3 w-full'>
            <SearchBar />

            </div>
           
          </div>
        
        </div>
      <div className=' p-4 overflow-auto lg:px-16 max-w-[1200px] mx-auto'>
       
      
          <FavouriteCityWeatherInfo />
          <CitiesWeatherInfo />
      </div>
    </div>
  )
}

export default CityList