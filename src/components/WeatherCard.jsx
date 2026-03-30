import { formatTemperature } from '../utils/formatTemperature';
import { getWeatherLabel } from '../utils/weatherCodes';

function WeatherCard({ locationName, weather }) {
  return (
    <article className="card current-card">
      <p className="section-label">Meteo attuale</p>
      <h2>{locationName}</h2>
      <p className="weather-status">{getWeatherLabel(weather.weatherCode)}</p>
      <div className="temperature-block">
        <span className="temperature-main">{formatTemperature(weather.temperature)}</span>
        <span className="temperature-feels">
          Percepita {formatTemperature(weather.apparentTemperature)}
        </span>
      </div>
      <p className="weather-meta">
        Vento {weather.windSpeed} km/h · Precipitazioni {weather.precipitation} mm
      </p>
    </article>
  );
}

export default WeatherCard;
