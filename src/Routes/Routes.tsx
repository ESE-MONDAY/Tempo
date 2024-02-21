import React from "react";
import { Navigate } from "react-router-dom";
import { IModuleRouter } from "./index";
import CityList from "../pages/CityList";
import CityDetails from "../pages/CityDetails";
import WeatherLayout from "../pages/Layout";
import SearchPage from "../pages/SearchPage";

export const WeatherRouter: IModuleRouter = {
  key: "weather",
  routes: [
    {
      path: "/",
      element: <Navigate to="/city-list" />,
    },
    {
      path: "/city-list",
      element: <CityList />,
    },
    {
      path: "/city-details/:cityName",
      element: <CityDetails />,
    },
    {
      path: "/search/:cityName",
      element: <SearchPage />,
    },
 
  ],
  layout: WeatherLayout, // Specify the layout component for the weather routes
};
