import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchLargestCitiesWithWeather, getWeatherDataFromLocalStorage, deleteWeatherDataFromLocalStorage, deleteWeatherDataNote, clearLargestCitiesFromLocalStorage, editWeatherDataNote }from '../services/LargestCity';

interface CityWeather {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  pressure: number
  temp_max: number;
  temp_min: number;
  icon: string;
  note: string
}

interface FetchCitiesResponse {
  city: string;
  weather: {
    temperature: number;
    description: string;
    humidity: number;
    pressure: number
    temp_max: number;
    temp_min: number;
    icon: string;
    note: string;
  };
}


export const getInitialData = () => {
  const existingData = getWeatherDataFromLocalStorage();
  const citiesWithWeather = existingData.map(({ city, weather }) => ({
    city,
    temperature: weather.temperature,
    description: weather.description,
    humidity: weather.humidity,
    pressure: weather.pressure,
    temp_max: weather.temp_max,
    temp_min: weather.temp_min,
    icon: weather.icon,
    note: weather.note
  }));
  return citiesWithWeather;
};
interface WeatherState {
  citiesWithWeather: CityWeather[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  citiesWithWeather: getInitialData(),
  loading: false,
  error: null,
};


export const clearLargestCities = createAsyncThunk(
  'weather/clearLargestCities',
  async () => {
    clearLargestCities()
    return [];
  }
);

export const deleteCityWeatherData = createAsyncThunk(
  'weather/deleteCityWeatherData',
  async (cityName: string, { getState }) => {
    deleteWeatherDataFromLocalStorage(cityName);
    const existingData = getWeatherDataFromLocalStorage();
    const transformedData: CityWeather[] = existingData.map(({ city, weather }) => ({
      city,
      temperature: weather.temperature,
      description: weather.description,
      humidity: weather.humidity,
      pressure: weather.pressure,
      temp_max: weather.temp_max,
      temp_min: weather.temp_min,
      icon: weather.icon,
      note: weather.note
    }));
    return transformedData;
  }
);

export const fetchCitiesWithWeather = createAsyncThunk(
  'weather/fetchCitiesWithWeather',
  async () => {
    try {
      const citiesWithWeatherResponse: FetchCitiesResponse[] = await fetchLargestCitiesWithWeather();
      const citiesWithWeather: CityWeather[] = citiesWithWeatherResponse.map(({ city, weather }) => ({
        city,
        temperature: weather.temperature,
        description: weather.description,
        humidity: weather.humidity,
        pressure: weather.pressure,
        temp_max: weather.temp_max,
        temp_min: weather.temp_min,
        icon: weather.icon,
        note: weather.note
      }));
      return citiesWithWeather;
      
    } catch (error: any) {
      throw new Error('An error occurred while fetching cities with weather');
    }
  }
);
export const editWeatherDataNoteAsync = createAsyncThunk(
  'weather/editWeatherDataNote',
  async ({ cityName, newNote }: { cityName: string; newNote: string }) => {
    try {
      editWeatherDataNote(cityName, newNote);
      const existingData = getWeatherDataFromLocalStorage();
      const transformedData: CityWeather[] = existingData.map(({ city, weather }) => ({
        city,
        temperature: weather.temperature,
        description: weather.description,
        humidity: weather.humidity,
        pressure: weather.pressure,
        temp_max: weather.temp_max,
        temp_min: weather.temp_min,
        icon: weather.icon,
        note: weather.note
      }));
      return transformedData;
    } catch (error) {
      throw new Error('An error occurred while editing weather data note');
    }
  }
);

export const deleteWeatherDataNoteAsync = createAsyncThunk(
  'weather/deleteWeatherDataNote',
  async ({ cityName}: { cityName: string }) => {
    try {
      deleteWeatherDataNote(cityName);
      const existingData = getWeatherDataFromLocalStorage();
      const transformedData: CityWeather[] = existingData.map(({ city, weather }) => ({
        city,
        temperature: weather.temperature,
        description: weather.description,
        humidity: weather.humidity,
        pressure: weather.pressure,
        temp_max: weather.temp_max,
        temp_min: weather.temp_min,
        icon: weather.icon,
        note: weather.note
      }));
      return transformedData;
    } catch (error) {
      throw new Error('An error occurred while editing weather data note');
    }
  }
);



const largestCities = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesWithWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesWithWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.citiesWithWeather = action.payload;
      })
      .addCase(fetchCitiesWithWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred while fetching cities with weather';
      })
      .addCase(deleteCityWeatherData.fulfilled, (state, action) => {
        state.citiesWithWeather = action.payload;
      })
      .addCase(clearLargestCities.fulfilled, (state, action) => {
        state.citiesWithWeather = action.payload;
      })
      .addCase(editWeatherDataNoteAsync.rejected, (state, action) => {
        state.citiesWithWeather = action.payload  as CityWeather[];;
        state.loading = false;
        state.error = action.error.message || 'An error occurred while editing weather data note';
      })
      .addCase(deleteWeatherDataNoteAsync.rejected, (state, action) => {
        state.citiesWithWeather = action.payload  as CityWeather[];;
        state.loading = false;
        state.error = action.error.message || 'An error occurred while editing weather data note';
      });
  },
});

export default largestCities.reducer;
