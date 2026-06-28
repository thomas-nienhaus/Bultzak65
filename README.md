# QR Schatzoektocht

Statische QR-code schatzoektocht app. Geen backend, geen database — alles
draait client-side met een JSON-bestand voor de caches en `localStorage` voor
teamnaam en score.

## Hoe het werkt

- Elke cache heeft een eigen pagina op `/cache/<id>` (zie `src/data/caches.json`)
- Teams kiezen een naam op de startpagina; dit wordt opgeslagen in `localStorage`
- Bij elke cache klikt het team op "Gevonden!" om punten te verdienen
- `/admin` toont de voortgang van het team **op dat toestel** (geen gedeelde
  database tussen telefoons — elk team scant op zijn eigen telefoon)

## Caches aanpassen

Bewerk `src/data/caches.json`. Elke cache heeft:

```json
{ "id": 1, "name": "Start", "points": 50, "hint": "..." }
```

## Lokaal draaien

```bash
npm install
npm run dev
```

## QR-codes genereren

Genereert een PNG per cache in `/qrcodes` die linkt naar `<base-url>/cache/<id>`:

```bash
npm run qrcodes -- https://jouw-domein.vercel.app
```

Print de PNG's uit `/qrcodes` en plak ze op de locaties.

## Deployen

```bash
git push
```

Importeer de repo in [Vercel](https://vercel.com) of [Netlify](https://netlify.com)
— beide werken zonder extra configuratie (SPA-rewrites staan al in
`vercel.json` / `public/_redirects`).

## Testen voor het event

1. Genereer QR-codes met de echte productie-URL
2. Test met 2 telefoons en 2 teams door minstens de eerste paar caches te scannen
3. Controleer dat scores correct optellen en dat de hint-flow klopt
