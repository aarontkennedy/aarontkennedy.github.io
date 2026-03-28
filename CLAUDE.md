# Claude Instructions for aarontkennedy.github.io

## Project

Personal portfolio site for Aaron Kennedy. React + TypeScript + Vite, deployed to GitHub Pages.

## Commands

- `npm run dev` — local dev server
- `npm run build` — TypeScript check + Vite build
- `npm run lint` — ESLint (zero warnings policy)
- `npm run deploy` — build + push to gh-pages branch (live site)

## Code Style

- Functional components only, no class components
- Named exports for components are fine; default export at the bottom of the file
- BEM-style CSS class names (e.g. `parks__legend`, `header__nav-left`)
- SCSS files co-located with the component (e.g. `Parks.scss` next to `Parks.tsx`)
- Interfaces defined in the same file as the component that owns them
- Helper/utility functions defined outside the component (above it in the file), not inside
- `useMemo` for expensive derived data (see `Parks.tsx` marker creation)
- Prefer `useState` with explicit toggle handlers over inline lambdas in JSX

## Project Structure

```
src/
  apps/          # Feature areas (portfolio, canoe, running, tools)
  components/    # Shared components (header, footer, map primitives)
  hooks/         # Custom hooks
  pages/         # Top-level route pages
  util/          # Pure utility functions
```

New tools/pages go in `src/apps/tools/pages/`. If a tool is complex enough to have its own data or subcomponents, give it a folder (like `parksTool/`).

New routes must be registered in `src/App.tsx` and added to the `menuItems` array in `src/components/header/Header.tsx`.

## Data Files

### Parks (`src/apps/tools/pages/parksTool/data/`)

All three datasets share the same shape (matches the `Park` interface in `Parks.tsx`):

```ts
{
  _id: string;
  name: string;          // used to determine marker color via name matching (e.g. "National Park", "State Park")
  location: string;      // county/parish
  state: string;
  country: string;
  address: string;
  longitudeLatitude: [number, number] | null;  // [longitude, latitude] — note: longitude first
  imageURL: string | null;
  remarks: string | null;
}
```

- `nationalParks.json` — NPS units (national parks, monuments, seashores, battlefields, etc.)
- `stateParks.json` — state parks, state forests, wildlife areas, recreation areas
- `roadsideAttractions.json` — roadside curiosities (Wall Drug, Corn Palace, etc.), IDs prefixed `so****`

### Paddling (`src/apps/canoe/data/paddleData.json`)

```ts
{
  name: string;
  tags: string[];        // e.g. ["lake"], ["river"]
  route: [number, number][];   // [lat, lng] pairs (note: lat first, opposite of parks)
  urls: {
    date: string;        // ISO date
    url: string;         // YouTube link
    notes: string;
  }[];
}
```

### Running (`src/apps/running/data/runData.json`)

```ts
{
  name: string;          // race/event name
  location: string;      // city, state/country
  latLng: [number, number];   // [lat, lng]
  url: string;
  tags: string[];
  notes: string;
  results: {
    date: string;        // ISO date
    distanceMiles: number;
    time: string;        // "HH:MM:SS" or freeform note
  }[];
}
```

## Preferences

- Don't add comments unless the logic is genuinely non-obvious
- Don't add extra error handling for cases that can't happen in practice
- Don't over-abstract — three similar lines is fine, a premature utility is not
- Keep components focused; extract a subcomponent only when it's reused or too long to read comfortably
- Use relative imports (not aliases like `@/`)
- Use SCSS files (not CSS modules)

## Testing

**Framework:** Vitest + React Testing Library. Run with `npm test`.

**Test file location:** Co-located next to the source file (e.g., `Parks.test.tsx` next to `Parks.tsx`).

**Mocking strategy for leaflet-heavy pages:** Every page that imports `leaflet`, `react-leaflet`, `react-leaflet/MapContainer`, `react-leaflet/hooks`, `react-leaflet-cluster`, or `leaflet-geosearch` must mock those modules with `vi.mock` at the top of the test file. See existing test files for the standard mock pattern.

**Image and video imports:** Mock them with `vi.mock('path/to/file', () => ({ default: 'filename.ext' }))`.

**Pages that use `react-router-dom` (`Link`, `useNavigate`, etc.):** Wrap the component in `<MemoryRouter>` from `react-router-dom` when rendering in tests.
