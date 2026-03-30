import { formatShortDate } from '../utils/formatDate';
import { formatTemperature } from '../utils/formatTemperature';
import { getWeatherLabel } from '../utils/weatherCodes';

function ForecastList({ forecast }) {
  return (
    <section className="forecast-section">
      <p className="section-label">Prossimi giorni</p>
      <div className="forecast-grid">
        {forecast.map((day) => (
          <article className="forecast-card" key={day.date}>
            <strong>{formatShortDate(day.date)}</strong>
            <span>{getWeatherLabel(day.weatherCode)}</span>
            <span>
              {formatTemperature(day.minTemperature)} / {formatTemperature(day.maxTemperature)}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ForecastList;
