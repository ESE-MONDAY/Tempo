import axios from 'axios';

interface City {
    name: string;
    latitude: number;
    longitude: number;
  }


export interface WeatherInfo {
    temperature: number;
    description: string;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
    icon: string;
  }


const apiKey = 'eselite';

const getCoordinates = async (cityName: string): Promise<City | null> => {
  const geoNamesUrl = `https://secure.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${apiKey}`;

  try {
    const response = await axios.get(geoNamesUrl);
    const cityData = response.data.geonames[0];
    if (cityData) {
      return {
        name: cityData.name,
        latitude: parseFloat(cityData.lat),
        longitude: parseFloat(cityData.lng),
      };
    } else {
      console.error('City not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};


const getWeatherForecast = async (latitude: number, longitude: number): Promise<any | null> => {
    const weatherApiKey = String(process.env.REACT_APP_WEATHER_KEY) 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
  
    try {
      const response = await axios.get(weatherUrl);
      const cityInfo = response.data.city;
      const forecastList = response.data.list;
      const icon = response.data.list[0].weather[0].icon
      return {
        cityInfo,
        forecastList,
        icon
      }

    
    } catch (error) {
      console.error('Error fetching weather info:', error);
      return null;
    }
  };
  
  export const fetchWeatherForecast = async (cityName: string): Promise<any | null> => {
    const city = await getCoordinates(cityName);
    if (city) {
      return await getWeatherForecast(city.latitude, city.longitude);
    } else {
      return null;
    }
  };