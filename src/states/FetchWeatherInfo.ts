import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCityWeather, WeatherInfo } from '../services/WeatherInfoFromCity';

interface WeatherState {
  weatherData: WeatherInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  loading: false,
  error: null,
};

export const fetchCityWeatherData = createAsyncThunk(
  'weather/fetchCityWeatherData',
  async (cityName: string, { rejectWithValue }) => {
    try {
      const weatherData = await fetchCityWeather(cityName);
      if (!weatherData) {
        throw new Error('Weather data not found.');
      }
      return weatherData;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);
const cityWeatherSlice = createSlice({
  name: 'cityWeather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.weatherData = action.payload;
      })
      .addCase(fetchCityWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cityWeatherSlice.reducer;
