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

Genereert een PNG per cache in `/qrcodes` die linkt naar `<base-url>/#/cache/<id>`
(hash-routing, nodig voor GitHub Pages):

```bash
npm run qrcodes -- https://thomas-nienhaus.github.io/Bultzak65
```

Zonder argument wordt deze URL als standaard gebruikt. Print de PNG's uit
`/qrcodes` en plak ze op de locaties.

## Deployen naar GitHub Pages

De workflow `.github/workflows/deploy.yml` bouwt en deployt automatisch bij
elke push naar `main`. Eenmalig instellen (kan ik niet zelf doen, vereist
repo-adminrechten):

1. Ga naar **Settings → Pages**
2. Zet **Source** op **GitHub Actions**
3. Push naar `main` — de site komt live op
   `https://thomas-nienhaus.github.io/Bultzak65/`

Let op: `vite.config.js` heeft `base: '/Bultzak65/'` ingesteld voor deze
repo-naam. Bij een andere/hernoemde repo moet dat pad mee aangepast worden.

## Testen voor het event

1. Genereer QR-codes met de echte productie-URL
2. Test met 2 telefoons en 2 teams door minstens de eerste paar caches te scannen
3. Controleer dat scores correct optellen en dat de hint-flow klopt
