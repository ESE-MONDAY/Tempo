// weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherInfo } from '../services/UserWeatherInfo';
import toast from 'react-hot-toast';

interface WeatherInfo {
  city: string | null;
  temperature: number | null;
  currentTime: string | null;
  error: string | null | object | undefined; 
  weatherIcon: string;
}

const initialState: WeatherInfo = {
  city: null,
  temperature: null,
  currentTime: null,
  error: null,
  weatherIcon: ""
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (userLocation: { latitude: number; longitude: number }) => {
    try {
      const weatherInfo = await fetchWeatherInfo(userLocation);
      toast.success("Info fetched successfully");
      return weatherInfo;
    } catch (error) {
      // Throw the error to trigger automatic rejection and dispatch
      throw error;
    }
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherData.pending, state => {
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.city = action.payload.city;
        state.temperature = action.payload.temperature;
        state.currentTime = action.payload.currentTime;
        state.weatherIcon = action.payload.weatherIcon;
        state.error = null;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.error = action.payload || 'An error occurred while fetching weather information';
      });
  },
});

export default weatherSlice.reducer;
