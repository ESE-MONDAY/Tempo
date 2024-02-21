import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../services/FavouriteCity';
import { saveFavoriteCityToLocalStorage, deleteFavoriteCityFromLocalStorage, clearFavoriteCitiesFromLocalStorage, getFavoriteCitiesFromLocalStorage } from '../services/FavouriteCity';
import toast from 'react-hot-toast';

interface FavoriteCitiesState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteCitiesState = {
  cities: getFavoriteCitiesFromLocalStorage(),
  loading: false,
  error: null,
};

const favoriteCitiesSlice = createSlice({
  name: 'favoriteCities',
  initialState,
  reducers: {
    addFavoriteCity: (state, action: PayloadAction<City>) => {
      const existingCity = state.cities.find(favCity => favCity.city.toLowerCase() === action.payload.city.toLowerCase());
      if (!existingCity) {
        state.cities = [...state.cities, action.payload]; 
        saveFavoriteCityToLocalStorage(action.payload);
      }else{
        toast.error("city already in favourite")
      }
    },
    removeFavoriteCity(state, action: PayloadAction<City>) {
      const cityToRemove = action.payload;
      const index = state.cities.findIndex(city => city.city === cityToRemove.city);
      if (index !== -1) {
        state.cities.splice(index, 1);
        toast.success("City removed to favorites",);
        deleteFavoriteCityFromLocalStorage(cityToRemove); 
      }else{
        toast.error("city not in favourite")
      }
    },
    clearFavoriteCities(state) {
      state.cities = [];
      toast.success("Favourites cleared successfully",);
      clearFavoriteCitiesFromLocalStorage(); 
    },
  },
});

export const { 
  addFavoriteCity, 
  removeFavoriteCity, 
  clearFavoriteCities 
} = favoriteCitiesSlice.actions;

export default favoriteCitiesSlice.reducer;
