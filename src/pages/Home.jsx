import ErrorMessage from '../components/ErrorMessage';
import ForecastList from '../components/ForecastList';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherDetails from '../components/WeatherDetails';
import { useWeather } from '../hooks/useWeather';

function Home() {
  const {
    city,
    error,
    forecast,
    handleCityChange,
    handleSearch,
    loading,
    locationName,
    weather,
  } = useWeather();

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">React + Open-Meteo</p>
          <h1>Controlla il meteo di qualsiasi citta in pochi secondi.</h1>
          <p className="hero-text">
            Inserisci una citta, recupera coordinate e previsioni e visualizza tutto in
            un layout semplice e leggibile.
          </p>
        </div>

        <div className="content-panel">
          <SearchBar
            value={city}
            onChange={handleCityChange}
            onSubmit={handleSearch}
            disabled={loading}
          />

          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {weather && (
            <div className="weather-grid">
              <WeatherCard locationName={locationName} weather={weather} />
              <WeatherDetails weather={weather} />
            </div>
          )}

          {forecast.length > 0 && <ForecastList forecast={forecast} />}
        </div>
      </section>
    </main>
  );
}

export default Home;
