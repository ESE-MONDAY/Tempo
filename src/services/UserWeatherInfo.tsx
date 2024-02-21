// weatherService.ts
import axios from 'axios';


interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherInfo {
  city: string;
  temperature: number;
  currentTime: string;
  weatherIcon: string;
}
const WEATHER_DATA_KEY = 'userLocation';
const defaultLocation = { longitude: 3.3686, latitude: 6.5143 }


export const fetchWeatherInfo = async (userLocation: Coordinates): Promise<WeatherInfo> => {
  try {
    const cityResponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.geonames.org/findNearbyPlaceNameJSON?lat=${userLocation.latitude}&lng=${userLocation.longitude}&username=eselite`);
    const cityData = cityResponse.data;
    const city = cityData?.geonames[0]?.adminName1;
    const weatherResponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=1457b5f7f9dd52eb99023f987eca1c3f&units=metric`);
    const temperature = weatherResponse.data?.main?.temp;
    const weatherIcon = weatherResponse.data?.weather[0]?.icon
    const currentTime = new Date().toLocaleTimeString();

    return { city, temperature, currentTime, weatherIcon };
  } catch (error) {
    throw new Error('An error occurred while fetching weather information');
  }
};
