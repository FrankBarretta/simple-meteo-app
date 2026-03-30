import { describe, expect, it, vi } from 'vitest';
import { fetchWeather } from './weatherApi';

function createJsonResponse(data, ok = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  });
}

describe('fetchWeather', () => {
  it('builds the weather request and maps current and forecast data', async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      createJsonResponse({
        current: {
          temperature_2m: 22.6,
          relative_humidity_2m: 54,
          apparent_temperature: 21.2,
          is_day: 1,
          precipitation: 0.3,
          weather_code: 0,
          wind_speed_10m: 12.4,
        },
        daily: {
          time: ['2026-03-26', '2026-03-27'],
          weather_code: [0, 63],
          temperature_2m_max: [24.1, 19.8],
          temperature_2m_min: [14.2, 11.1],
        },
      }),
    );

    const result = await fetchWeather(45.4642, 9.19);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const requestUrl = new URL(global.fetch.mock.calls[0][0]);

    expect(requestUrl.origin + requestUrl.pathname).toBe('https://api.open-meteo.com/v1/forecast');
    expect(requestUrl.searchParams.get('latitude')).toBe('45.4642');
    expect(requestUrl.searchParams.get('longitude')).toBe('9.19');
    expect(requestUrl.searchParams.get('timezone')).toBe('auto');
    expect(requestUrl.searchParams.get('forecast_days')).toBe('5');
    expect(requestUrl.searchParams.get('current')).toContain('temperature_2m');
    expect(requestUrl.searchParams.get('daily')).toContain('temperature_2m_max');
    expect(result).toEqual({
      weather: {
        temperature: 22.6,
        humidity: 54,
        apparentTemperature: 21.2,
        isDay: true,
        precipitation: 0.3,
        weatherCode: 0,
        windSpeed: 12.4,
      },
      forecast: [
        {
          date: '2026-03-26',
          weatherCode: 0,
          maxTemperature: 24.1,
          minTemperature: 14.2,
        },
        {
          date: '2026-03-27',
          weatherCode: 63,
          maxTemperature: 19.8,
          minTemperature: 11.1,
        },
      ],
    });
  });

  it('throws a readable error when the weather API fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(fetchWeather(45.4642, 9.19)).rejects.toThrow(
      'Impossibile recuperare i dati meteo.',
    );
  });
});