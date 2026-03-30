# API Meteo

Applicazione web realizzata con React e Vite che permette di cercare una citta, convertirla in coordinate tramite l'API di geocoding di Open-Meteo e visualizzare meteo corrente e previsione dei prossimi 5 giorni.

## Panoramica del progetto

L'app e pensata come interfaccia semplice e immediata per consultare rapidamente il meteo di una localita.
Il flusso principale e questo:

1. L'utente inserisce il nome di una citta.
2. L'app interroga il servizio di geocoding di Open-Meteo.
3. Ottenute latitudine e longitudine, recupera i dati meteo correnti e la previsione breve.
4. Mostra temperatura, temperatura percepita, umidita, vento, precipitazioni e stato meteo.

## Tecnologie utilizzate

- React 19
- Vite 7
- Vitest + Testing Library
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## Funzionalita

- Ricerca meteo per citta con input libero.
- Risoluzione automatica del nome della citta in coordinate geografiche.
- Visualizzazione del meteo attuale.
- Visualizzazione di dettagli aggiuntivi come umidita, vento, pioggia e stato giorno/notte.
- Previsione sintetica per 5 giorni.
- Gestione degli errori per input vuoto, citta non trovata e problemi di risposta API.
- Stato di caricamento durante le richieste.
- Test automatici per servizi e pagina principale.

## Nota importante sul logging

Il repository attuale non include alcun sistema di logging su file. L'app e interamente frontend e non contiene codice per salvare le risposte API in un file di log locale o remoto. Se vuoi aggiungere questa funzione, serve introdurre almeno un backend o un servizio esterno di raccolta log.

## Installazione

### Prerequisiti

- Node.js 18 o superiore
- npm

### Passaggi

```bash
npm install
```

Per avviare l'ambiente di sviluppo:

```bash
npm run dev
```

Per creare la build di produzione:

```bash
npm run build
```

Per visualizzare la build localmente:

```bash
npm run preview
```

## Guida all'uso

1. Avvia l'app con `npm run dev`.
2. Apri il browser all'indirizzo mostrato da Vite, di solito `http://localhost:5173`.
3. Inserisci il nome di una citta nel campo di ricerca, ad esempio `Milano`.
4. Premi il pulsante `Cerca`.
5. Consulta i dati meteo attuali e la previsione dei giorni successivi.

### Comportamento in caso di errore

- Se il campo e vuoto, l'app mostra un messaggio che richiede l'inserimento di una citta.
- Se la citta non viene trovata, l'app mostra un errore dedicato.
- Se una delle API risponde con errore, l'interfaccia informa l'utente senza bloccare la pagina.

## Output di esempio

### Esempio di utilizzo

Input utente:

```text
Milano
```

Possibile risultato mostrato nell'interfaccia:

```text
Meteo attuale
Milano, Lombardia, Italia
Parzialmente nuvoloso
18°C
Percepita 17°C

Dettagli
Umidita: 61%
Vento: 14 km/h
Pioggia: 0 mm
Giorno / Notte: Giorno

Prossimi giorni
Lun 12/05  14°C / 21°C
Mar 13/05  13°C / 22°C
Mer 14/05  12°C / 20°C
Gio 15/05  11°C / 19°C
Ven 16/05  10°C / 18°C
```

### Esempio di messaggio di errore

```text
Nessuna citta trovata. Controlla il nome inserito.
```

## Script disponibili

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run test:watch
```

## Test

Esecuzione test una tantum:

```bash
npm test
```

Esecuzione test in watch mode:

```bash
npm run test:watch
```

## Struttura del progetto

```text
src/
  assets/          Risorse statiche e icone
  components/      Componenti UI riutilizzabili
  hooks/           Hook custom per logica applicativa
  pages/           Pagine dell'app
  services/        Chiamate alle API esterne
  styles/          Variabili e stili globali
  utils/           Funzioni di formattazione e mapping
  test/            Setup dei test
```

## API utilizzate

- Geocoding: https://geocoding-api.open-meteo.com/v1/search
- Forecast: https://api.open-meteo.com/v1/forecast

## Miglioramenti futuri

- Aggiungere cronologia delle ricerche recenti.
- Introdurre suggerimenti automatici durante la digitazione della citta.
- Consentire la geolocalizzazione dell'utente.
- Gestire unita di misura alternative come Fahrenheit e mph.
- Aggiungere icone meteo piu ricche e animazioni leggere.
- Integrare un backend per logging, analytics o cache delle risposte.
- Salvare preferenze utente in localStorage.
- Ampliare copertura test con scenari end-to-end.
