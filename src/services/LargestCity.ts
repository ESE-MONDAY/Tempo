import axios from 'axios';
import toast from 'react-hot-toast';

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

interface WeatherInfo {
  temperature: number;
  description: string;
  humidity: number;
  pressure: number
  temp_max: number;
  temp_min: number;
  icon: string;
  note: string;
}

export interface WeatherData {
  city: string;
  weather: WeatherInfo;
}

const WEATHER_DATA_KEY = 'weatherData';
// const apiKey = process.env.REACT_APP_WEATHER_API_KEY

export const getWeatherDataFromLocalStorage = (): WeatherData[] => {
  const weatherDataJSON = localStorage.getItem(WEATHER_DATA_KEY);
  return weatherDataJSON ? JSON.parse(weatherDataJSON) : [];
};

export const editWeatherDataNote = (cityName: string, newNote: string): void => {
  const existingData = getWeatherDataFromLocalStorage();
  const updatedData = existingData.map((data) => {
    if (data.city === cityName) {
      return { ...data, weather: { ...data.weather, note: newNote } };
    }
    return data;
  });
  toast.success("Note saved successfully")
  saveWeatherDataToLocalStorage(updatedData);
};
export const deleteWeatherDataNote = (cityName: string): void => {
  const existingData = getWeatherDataFromLocalStorage();
  const updatedData = existingData.map((data) => {
    if (data.city === cityName) {
      return { ...data, weather: { ...data.weather, note: "" } };
    }
    return data;
  });
  toast.success("Note deleted successfully")
  saveWeatherDataToLocalStorage(updatedData);
};

 export const saveWeatherDataToLocalStorage = (weatherData: WeatherData[]): void => {
  localStorage.setItem(WEATHER_DATA_KEY, JSON.stringify(weatherData));
};
export const deleteWeatherDataFromLocalStorage = (cityName: string): void => {
  const existingData = getWeatherDataFromLocalStorage();
  const newData = existingData.filter((data) => data.city !== cityName);
  saveWeatherDataToLocalStorage(newData);
};
export const clearLargestCitiesFromLocalStorage = (): void => {
  localStorage.removeItem(WEATHER_DATA_KEY);
};


const fetchWeatherInfo = async (latitude: number, longitude: number): Promise<WeatherInfo> => {
  try {
    const apiKey = '1457b5f7f9dd52eb99023f987eca1c3f'; 
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    const temperature = response.data.main.temp;
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;
    const {humidity,pressure, temp_max, temp_min} =response.data.main
    const note = ""
    return { temperature, description,humidity,pressure, temp_max, temp_min,icon, note };
  } catch (error: any) {
    toast.error('Error fetching weather info:', error);
    throw new Error('An error occurred while fetching weather info');
  }
};

const fetchLargestCities = async (): Promise<City[]> => {
  const url = 'https://secure.geonames.org/searchJSON';
  const params = {
    featureCode: 'PPL',
    population: '>1000000',
    orderby: 'population',
    maxRows: 1000,
    username: 'eselite',
  };

  try {
    const response = await axios.get(url, { params });
    const cities = response.data.geonames.map((cityData: any) => ({
      name: cityData.name,
      latitude: cityData.lat,
      longitude: cityData.lng,
    }));
    const sortedCities = cities.sort((a:any, b:any) => b.population - a.population);
    const top15Cities = sortedCities.slice(0, 15);
   
    return top15Cities;
  } catch (error) {
    console.error('Error fetching largest cities:', error);
    throw new Error('An error occurred while fetching largest cities');
  }
};

export const fetchLargestCitiesWithWeather = async (): Promise<WeatherData[]> => {
  try {
    const cities = await fetchLargestCities();

    const weatherInfos: Promise<WeatherData | null>[] = [];

    for (const city of cities) {
      const weatherInfoPromise = fetchWeatherInfo(city.latitude, city.longitude)
        .then((weather) => ({ city: city.name, weather }))
        .then((weatherData) => {
          const existingData = getWeatherDataFromLocalStorage();
          const isExisting = existingData.some((data) => data.city === city.name);
          if (!isExisting) {
            return weatherData;  
          } else {
            return existingData.find((data) => data.city === city.name) || null;
          }
        })
        .catch((error) => {
          toast.error(`Error fetching weather info for ${city.name}: ${error}`);
          return null;
        });

      weatherInfos.push(weatherInfoPromise);
    }
    const resolvedWeatherInfos = await Promise.all(weatherInfos);
    const filteredInfos = resolvedWeatherInfos.filter((info): info is WeatherData => info !== null);
    saveWeatherDataToLocalStorage(filteredInfos);
    return filteredInfos;
    
  } catch (error: any) {
   
    throw new Error('An error occurred while fetching largest cities with weather');
  }
};






