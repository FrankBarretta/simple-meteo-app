const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function fetchCoordinates(city) {
  const params = new URLSearchParams({
    name: city,
    count: '1',
    language: 'it',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Impossibile recuperare le coordinate della citta.');
  }

  const data = await response.json();
  const match = data.results?.[0];

  if (!match) {
    throw new Error('Nessuna citta trovata. Controlla il nome inserito.');
  }

  return {
    latitude: match.latitude,
    longitude: match.longitude,
    locationName: [match.name, match.admin1, match.country].filter(Boolean).join(', '),
  };
}
