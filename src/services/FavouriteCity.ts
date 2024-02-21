import toast from "react-hot-toast";
export interface City {
    city: string;
    description: string;
    humidity: number
    pressure: number
    temp_max: number;
    temp_min: number;
    icon: string;
    temperature: number
  }
  
  const FAVORITE_CITIES_KEY = 'favoriteCities';
  
  export const getFavoriteCitiesFromLocalStorage = (): City[] => {
    const favoriteCitiesJSON = localStorage.getItem(FAVORITE_CITIES_KEY);
    return favoriteCitiesJSON ? JSON.parse(favoriteCitiesJSON) : [];
  };
  
  export const saveFavoriteCityToLocalStorage = (city: City): void => {
    const favoriteCities = getFavoriteCitiesFromLocalStorage();
    const existingCity = favoriteCities.find((favCity) => favCity.city === city.city);

    if (!existingCity) {
      favoriteCities.push(city);
      localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(favoriteCities));
      toast.success("City added to favorites",);
    } else {
      toast.error("City already exists in favorites");
    }
  };
  
  
  export const deleteFavoriteCityFromLocalStorage = (city: City): void => {
    let favoriteCities = getFavoriteCitiesFromLocalStorage();
    favoriteCities = favoriteCities.filter((favoriteCity) => favoriteCity.city.toLowerCase() !== city.city.toLowerCase());
    localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(favoriteCities));
  };
  export const clearFavoriteCitiesFromLocalStorage = (): void => {
    localStorage.removeItem(FAVORITE_CITIES_KEY);
  };
  