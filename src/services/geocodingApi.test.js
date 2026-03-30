import { describe, expect, it, vi } from 'vitest';
import { fetchCoordinates } from './geocodingApi';

function createJsonResponse(data, ok = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  });
}

describe('fetchCoordinates', () => {
  it('builds the geocoding request and maps the first result', async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      createJsonResponse({
        results: [
          {
            name: 'Milano',
            admin1: 'Lombardia',
            country: 'Italia',
            latitude: 45.4642,
            longitude: 9.19,
          },
        ],
      }),
    );

    const result = await fetchCoordinates('Milano');

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const requestUrl = new URL(global.fetch.mock.calls[0][0]);

    expect(requestUrl.origin + requestUrl.pathname).toBe(
      'https://geocoding-api.open-meteo.com/v1/search',
    );
    expect(requestUrl.searchParams.get('name')).toBe('Milano');
    expect(requestUrl.searchParams.get('count')).toBe('1');
    expect(requestUrl.searchParams.get('language')).toBe('it');
    expect(requestUrl.searchParams.get('format')).toBe('json');
    expect(result).toEqual({
      latitude: 45.4642,
      longitude: 9.19,
      locationName: 'Milano, Lombardia, Italia',
    });
  });

  it('throws a readable error when the geocoding API fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(fetchCoordinates('Milano')).rejects.toThrow(
      'Impossibile recuperare le coordinate della citta.',
    );
  });

  it('throws a readable error when no city is found', async () => {
    global.fetch = vi.fn().mockImplementation(() => createJsonResponse({ results: [] }));

    await expect(fetchCoordinates('Atlantide')).rejects.toThrow(
      'Nessuna citta trovata. Controlla il nome inserito.',
    );
  });
});