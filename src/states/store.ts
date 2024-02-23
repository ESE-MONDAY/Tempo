import { configureStore } from '@reduxjs/toolkit';
import  weatherReducer  from './UserWeatherData';
import largestCityReducer from './LargestCitySlice';
import FavouriteCityReducer from './FavouriteCity';
import cityWeatherSliceReducer from './FetchWeatherInfo';
import cityWeatherForecastReducer from './WeatherForecast'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    largestCity: largestCityReducer,
    favouriteCity: FavouriteCityReducer,
    cityWeather: cityWeatherSliceReducer,
    cityWeatherForecast : cityWeatherForecastReducer 
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
