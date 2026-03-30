const weatherLabels = {
  0: 'Sereno',
  1: 'Prevalentemente sereno',
  2: 'Parzialmente nuvoloso',
  3: 'Coperto',
  45: 'Nebbia',
  48: 'Brina',
  51: 'Pioviggine leggera',
  53: 'Pioviggine',
  55: 'Pioviggine intensa',
  61: 'Pioggia debole',
  63: 'Pioggia',
  65: 'Pioggia intensa',
  71: 'Neve debole',
  73: 'Neve',
  75: 'Neve intensa',
  80: 'Rovesci deboli',
  81: 'Rovesci',
  82: 'Rovesci intensi',
  95: 'Temporale',
  96: 'Temporale con grandine',
  99: 'Temporale forte con grandine',
};

export function getWeatherLabel(code) {
  return weatherLabels[code] ?? 'Condizioni variabili';
}
