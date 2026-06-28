# QR Schatzoektocht

Statische QR-code schatzoektocht app. De UI is volledig client-side (React +
Vite, gehost op GitHub Pages); gevonden caches worden ook naar Supabase
gestuurd zodat de organisator een live overzicht over alle teams heeft.

## Hoe het werkt

- Elke cache heeft een eigen pagina op `/cache/<id>` (zie `src/data/caches.json`)
- Teams scannen een team-QR (`/team/<teamnaam>`) om automatisch aan te melden
  met hun teamnaam al ingevuld — zie `src/data/teams.json` en
  `npm run qrcodes:teams`
- Bij elke cache klikt het team op "Gevonden!" om punten te verdienen; dit
  wordt opgeslagen in `localStorage` op het toestel én in de gedeelde
  Supabase-tabel `finds`
- `/admin` toont alleen de voortgang van het **eigen team op dat toestel**
- `/beheer` toont het volledige live scorebord van alle teams, achter een
  pincode (`VITE_ADMIN_PIN` in `.env`). Let op: dit is een laagdrempelige
  drempel, geen echte beveiliging — de pincode-check draait client-side en
  staat dus in de publieke JS-bundel van de site.

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
