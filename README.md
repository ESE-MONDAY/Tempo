# Weather App

This is a single-page web application built with React JS that allows users to look up current weather information for cities around the world and manage a "favorites" list. Users can interact with the app to view weather details, add/remove cities to/from their favorites, add/edit/remove notes for each city, and search for weather details of other cities.

## Requirements

- Utilizes real-time world weather API services such as OpenWeatherMap API.
- By default, displays a list of the 15 largest cities in the world by population in alphabetical order with their current temperature.
- Allows users to individually remove entries from the default list.
- Clicking on a city in the list opens a page with more weather information, including a textarea field for notes which can be saved.
- Users can edit and remove notes for each city.
- Provides a search field to look up weather details for other cities.
- Allows users to add/remove cities as favorites, which appear at the top of the list on the home screen in alphabetical order.
- Retains basic functionality offline by caching the most up-to-date information in local storage.
- Built entirely as a front-end application without a back-end or database, using only local storage.
- Requests user permission to access their current location and automatically opens the details page for their city after permission is granted.
- Functionality is appropriately divided into well-defined components.
- Includes unit testing for applicable functionality.
- Features a production-ready clean/modern aesthetic.
- Uses Tailwind CSS for styling.

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/ESE-MONDAY/Tempo
```

2. Navigate to the project directory:

```bash
cd weather-app
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

```bash
# Create a .env file in the root directory
touch .env

# Add the following environment variables to the .env file
REACT_APP_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
```

Replace `your_openweathermap_api_key_here` with your actual OpenWeatherMap API key.

5. Run the development server:

```bash
npm start
```

6. Open your browser and visit `http://localhost:3000` to view the app.

## Technologies Used

- React JS
- Tailwind CSS
- Local Storage
- OpenWeatherMap API
- Unit Testing Framework ( Jest)

## Contributors

- [Ese Monday](https://github.com/ESE-MONDAY)

