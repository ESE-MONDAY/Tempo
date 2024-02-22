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

const WEATHER_DATA_KEY = 'userWeatherData';
export const fetchUserWeatherInfo = async (): Promise<WeatherInfo> => {

  try {
    // Ask for the user's location
    const position = await getCurrentPosition();
    const userLocation: Coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    const cityResponse = await axios.get(
      `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${userLocation.latitude}&lng=${userLocation.longitude}&username=eselite`
    );
    const cityData = cityResponse.data;
    const city = cityData?.geonames[0]?.adminName1;
    const apiKey = String(process.env.REACT_APP_WEATHER_KEY) 
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${apiKey}&units=metric`
    );
    const temperature = weatherResponse.data?.main?.temp;
    const weatherIcon = weatherResponse.data?.weather[0]?.icon;
    const currentTime = new Date().toLocaleTimeString();

    const weatherInfo: WeatherInfo = { city, temperature, currentTime, weatherIcon };


    saveWeatherInfoToLocalStorage(weatherInfo);
    if (city) {
      window.location.href = `/search/${city}`;
    }

    return weatherInfo;
  } catch (error) {
    throw new Error('An error occurred while fetching weather information');
  }
};

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};


const saveWeatherInfoToLocalStorage = (weatherInfo: WeatherInfo): void => {
  localStorage.setItem(WEATHER_DATA_KEY, JSON.stringify(weatherInfo));
};

export const getWeatherInfoFromLocalStorage = (): WeatherInfo | null => {
  const weatherInfoJSON = localStorage.getItem(WEATHER_DATA_KEY);
  return weatherInfoJSON ? JSON.parse(weatherInfoJSON) : null;
};
