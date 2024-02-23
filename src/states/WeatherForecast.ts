import { fetchWeatherForecast } from "../services/WeatherForcast";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



interface WeatherForecastData {
    id: number;
    description: string;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  interface ForecastDetails {
    dt: string;
    dt_txt: string;
    main:{
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_kf: number;
      temp_max: number;
      temp_min: number;
    };
    weather:{
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind:{
      speed: number;
      deg: number;
      gust: number;
    }
  }
interface State {
  weatherForecast: WeatherForecastData | null;
  forecastDetails: ForecastDetails[] | null;
  weatherIcon: string
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  weatherForecast: null,
  forecastDetails: null, 
  weatherIcon: "",
  loading: false,
  error: null,
};

export const fetchForecast = createAsyncThunk(
  'weather/forecast',
  async (cityName: string, { rejectWithValue }) => {
    try {
      const weatherForecast = await fetchWeatherForecast(cityName);
      return weatherForecast;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cityWeatherForecast = createSlice({
  name: 'cityWeatherForecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.weatherForecast = action.payload.cityInfo;
        state.forecastDetails = action.payload.forecastList;
        state.weatherIcon = action.payload.icon;
      
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cityWeatherForecast.reducer;
