# Weather API

A web application built with React and Vite that allows you to search for a city, convert it to coordinates via the Open-Meteo geocoding API, and display current weather and a 5-day forecast.

## Project Overview

The app is designed as a simple and straightforward interface for quickly checking the weather of a location.
The main flow is as follows:

1. The user enters the name of a city.
2. The app queries the Open-Meteo geocoding service.
3. Once latitude and longitude are obtained, it fetches current weather data and a short-term forecast.
4. It displays temperature, perceived temperature, humidity, wind, precipitation, and weather status.

## Technologies Used

- React 19
- Vite 7
- Vitest + Testing Library
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## Features

- Weather search by city with free text input.
- Automatic resolution of the city name into geographic coordinates.
- Display of current weather.
- Display of additional details such as humidity, wind, rain, and day/night status.
- Summary forecast for 5 days.
- Error handling for empty input, city not found, and API response issues.
- Loading state during requests.
- Automated tests for services and main page.

## Important Note on Logging

The current repository does not include any file-based logging system. The app is entirely frontend and does not contain code for saving API responses to a local or remote log file. If you want to add this feature, you need to introduce at least a backend or an external log collection service.

## Installation

### Prerequisites

- Node.js 18 or higher
- npm




### Steps

Clone this repository:
   ```bash
   git clone https://github.com/yourusername/weather-app-open-meteo.git
   ```
Navigate to the project folder:
   ```bash
   cd weather-app-open-meteo
   ```

Install dependencies:
```bash
npm install
```

To start the development environment:

```bash
npm run dev
```

To create the production build:

```bash
npm run build
```

To preview the build locally:

```bash
npm run preview
```

## Usage Guide

1. Start the app with `npm run dev`.
2. Open the browser at the address shown by Vite, usually `http://localhost:5173`.
3. Enter the name of a city in the search field, for example `Milano`.
4. Press the `Search` button.
5. View the current weather data and the forecast for the upcoming days.

### Error Behavior

- If the field is empty, the app displays a message requesting the user to enter a city.
- If the city is not found, the app shows a dedicated error message.
- If one of the APIs responds with an error, the interface informs the user without blocking the page.

## Example Output

### Usage Example

User input:

```text
Milano
```

Possible result displayed in the interface:

```text
Current Weather
Milano, Lombardia, Italia
Partly cloudy
18°C
Feels like 17°C

Dettagli
Umidita: 61%
Vento: 14 km/h
Pioggia: 0 mm
Giorno / Notte: Giorno

Prossimi giorni
Lun 12/05  14°C / 21°C
Mar 13/05  13°C / 22°C
Mer 14/05  12°C / 20°C
Gio 15/05  11°C / 19°C
Ven 16/05  10°C / 18°C
```

### Error Message Example

```text
No city found. Check the name you entered.
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run test:watch
```

## Tests

Run tests once:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Project Structure

```text
src/
  assets/          Static resources and icons
  components/      Reusable UI components
  hooks/           Custom hooks for application logic
  pages/           App pages
  services/        External API calls
  styles/          Variables and global styles
  utils/           Formatting and mapping functions
  test/            Test setup
```

## APIs Used

- Geocoding: https://geocoding-api.open-meteo.com/v1/search
- Forecast: https://api.open-meteo.com/v1/forecast

## Future Improvements

- Add recent search history.
- Introduce autocomplete suggestions while typing the city name.
- Allow user geolocation.
- Support alternative units of measurement such as Fahrenheit and mph.
- Add richer weather icons and subtle animations.
- Integrate a backend for logging, analytics, or response caching.
- Save user preferences in localStorage.
- Expand test coverage with end-to-end scenarios.
