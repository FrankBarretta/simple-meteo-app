import { useState } from 'react';
import { fetchCoordinates } from '../services/geocodingApi';
import { fetchWeather } from '../services/weatherApi';

export function useWeather() {
  const [city, setCity] = useState('Roma');
  const [locationName, setLocationName] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCityChange = (value) => {
    setCity(value);
  };

  const handleSearch = async () => {
    const normalizedCity = city.trim();

    if (!normalizedCity) {
      setError('Inserisci il nome di una citta per continuare.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const coordinates = await fetchCoordinates(normalizedCity);
      const weatherData = await fetchWeather(coordinates.latitude, coordinates.longitude);

      setLocationName(coordinates.locationName);
      setWeather(weatherData.weather);
      setForecast(weatherData.forecast);
    } catch (requestError) {
      setWeather(null);
      setForecast([]);
      setLocationName('');
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    city,
    error,
    forecast,
    handleCityChange,
    handleSearch,
    loading,
    locationName,
    weather,
  };
}
