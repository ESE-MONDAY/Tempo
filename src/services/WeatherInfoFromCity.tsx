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
  const geoNamesUrl = `https://cors-anywhere.herokuapp.com/https://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${apiKey}`;

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

const getWeatherInfo = async (latitude: number, longitude: number): Promise<WeatherInfo | null> => {
  const weatherApiKey = '1457b5f7f9dd52eb99023f987eca1c3f';
  const weatherUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;

  try {
    const response = await axios.get(weatherUrl);
    const { main, weather } = response.data;
    const { temp, humidity, pressure, temp_max, temp_min } = main;
    const { description, icon } = weather[0];
    return {
      temperature: temp,
      description,
      humidity,
      pressure,
      temp_max,
      temp_min,
      icon,
    };
  } catch (error) {
    console.error('Error fetching weather info:', error);
    return null;
  }
};

export const fetchCityWeather = async (cityName: string): Promise<WeatherInfo | null> => {
  const city = await getCoordinates(cityName);
  if (city) {
    return await getWeatherInfo(city.latitude, city.longitude);
  } else {
    return null;
  }
};