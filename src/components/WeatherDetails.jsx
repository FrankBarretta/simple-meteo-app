function WeatherDetails({ weather }) {
  const items = [
    { label: 'Umidita', value: `${weather.humidity}%` },
    { label: 'Vento', value: `${weather.windSpeed} km/h` },
    { label: 'Pioggia', value: `${weather.precipitation} mm` },
    { label: 'Giorno / Notte', value: weather.isDay ? 'Giorno' : 'Notte' },
  ];

  return (
    <article className="card details-card">
      <p className="section-label">Dettagli</p>
      <div className="details-grid">
        {items.map((item) => (
          <div className="detail-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

export default WeatherDetails;
