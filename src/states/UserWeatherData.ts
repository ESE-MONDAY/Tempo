import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserWeatherInfo } from '../services/UserWeatherInfo';

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

export const fetchUserWeatherData = createAsyncThunk(
  'weather/userWeather',
  async () => {
    try {
      const weatherInfo = await fetchUserWeatherInfo();
      return weatherInfo;
    } catch (error) {
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
      .addCase(fetchUserWeatherData.pending, state => {
        state.error = null;
      })
      .addCase(fetchUserWeatherData.fulfilled, (state, action) => {
        state.city = action.payload.city;
        state.temperature = action.payload.temperature;
        state.currentTime = action.payload.currentTime;
        state.weatherIcon = action.payload.weatherIcon;
        state.error = null;
      })
      .addCase(fetchUserWeatherData.rejected, (state, action) => {
        state.error = action.payload || 'An error occurred while fetching weather information';
      });
  },
});

export default weatherSlice.reducer;
