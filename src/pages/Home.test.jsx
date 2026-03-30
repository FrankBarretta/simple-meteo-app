import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Home from './Home';

function createJsonResponse(data, ok = true) {
  return {
    ok,
    json: () => Promise.resolve(data),
  };
}

function createDeferred() {
  let resolve;
  let reject;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

const geocodingSuccess = {
  results: [
    {
      name: 'Milano',
      admin1: 'Lombardia',
      country: 'Italia',
      latitude: 45.4642,
      longitude: 9.19,
    },
  ],
};

const weatherSuccess = {
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
};

describe('Home', () => {
  it('shows a validation error when the city input is empty', async () => {
    global.fetch = vi.fn();

    const user = userEvent.setup();

    render(<Home />);

    const input = screen.getByLabelText(/cerca una citta/i);

    await user.clear(input);
    await user.click(screen.getByRole('button', { name: /cerca/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Inserisci il nome di una citta per continuare.',
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('renders weather cards and forecast after a successful search', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse(geocodingSuccess))
      .mockResolvedValueOnce(createJsonResponse(weatherSuccess));

    const user = userEvent.setup();

    render(<Home />);

    const input = screen.getByLabelText(/cerca una citta/i);

    await user.clear(input);
    await user.type(input, 'Milano');
    await user.click(screen.getByRole('button', { name: /cerca/i }));

    expect(await screen.findByRole('heading', { name: 'Milano, Lombardia, Italia' })).toBeVisible();
    expect(screen.getAllByText('Sereno')).toHaveLength(2);
    expect(screen.getByText('23°C')).toBeVisible();
    expect(screen.getByText('Percepita 21°C')).toBeVisible();
    expect(screen.getByText('Prossimi giorni')).toBeVisible();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('disables the form and shows the loading status while requests are in flight', async () => {
    const geocodingRequest = createDeferred();
    const weatherRequest = createDeferred();

    global.fetch = vi
      .fn()
      .mockReturnValueOnce(geocodingRequest.promise)
      .mockReturnValueOnce(weatherRequest.promise);

    const user = userEvent.setup();

    render(<Home />);

    const input = screen.getByLabelText(/cerca una citta/i);
    const button = screen.getByRole('button', { name: /cerca/i });

    await user.clear(input);
    await user.type(input, 'Milano');
    await user.click(button);

    expect(await screen.findByRole('status')).toHaveTextContent('Recupero dati meteo in corso...');
    expect(input).toBeDisabled();
    expect(screen.getByRole('button', { name: /caricamento/i })).toBeDisabled();

    geocodingRequest.resolve(createJsonResponse(geocodingSuccess));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    weatherRequest.resolve(createJsonResponse(weatherSuccess));

    expect(await screen.findByRole('heading', { name: 'Milano, Lombardia, Italia' })).toBeVisible();
  });

  it('clears stale weather data when a later search fails', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse(geocodingSuccess))
      .mockResolvedValueOnce(createJsonResponse(weatherSuccess))
      .mockResolvedValueOnce(createJsonResponse({ results: [] }));

    const user = userEvent.setup();

    render(<Home />);

    const input = screen.getByLabelText(/cerca una citta/i);

    await user.clear(input);
    await user.type(input, 'Milano');
    await user.click(screen.getByRole('button', { name: /cerca/i }));

    expect(await screen.findByRole('heading', { name: 'Milano, Lombardia, Italia' })).toBeVisible();

    await user.clear(input);
    await user.type(input, 'Atlantide');
    await user.click(screen.getByRole('button', { name: /cerca/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Nessuna citta trovata. Controlla il nome inserito.',
    );
    expect(screen.queryByRole('heading', { name: 'Milano, Lombardia, Italia' })).not.toBeInTheDocument();
    expect(screen.queryByText('Prossimi giorni')).not.toBeInTheDocument();
  });
});