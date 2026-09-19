# RealPlay Registration App

A React app that keeps marketing attribution intact from a user's first visit through to a successful sign-up.

- **URL-driven modals:** `?welcome=1`, `?promo=<code>` and `?invite=<friendId>` open modals on any page, on cold load, back/forward and in-app navigation. Guests are redirected to `/register` and land back on the modal after signing up.
- **Attribution:** `utm_*`, `ref`, `gclid` and `fbclid` are captured and persisted. First touch wins for 30 days; after that, new params overwrite it and the clock resets. Once registered, nothing new is captured.
- **Registration:** the `/register` form posts to a mocked `POST /api/register` with the stored attribution, then clears it and shows a toast.

**Stack:** React 18, TypeScript, Vite, Tailwind, React Query, React Router, MSW, Vitest.

## Getting started

Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open http://localhost:5173. The API is mocked by MSW in dev mode only, so there's no backend to run.

Try it: open `/?promo=SAVE10&utm_source=fb`, register, and the promo modal opens. The browser console logs the payload sent to `/api/register`. Use `taken@example.com` to see the error path.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm test` | Run the tests once (`npm run test:watch` to watch) |
| `npm run lint` | Lint |
| `npm run build` | Type-check and build for production |

## Project structure

```
src/
  app/         App shell: providers, router, layout
  pages/       Route components
  features/    attribution, auth, registration, url-modals
    <feature>/
      api/ components/ context/ hooks/ lib/
      types.ts constants.ts index.ts   # index.ts is the public API
  components/  Shared UI (shadcn primitives in ui/)
  mocks/       MSW handlers
```

Outside a feature, import only from its `index.ts` (`@/features/auth`), never from files inside it.

## Open question

The spec says `?signup=1` opens a Registration modal, but also that modals are only shown to signed-in users. Until Product decides, guests with `?signup=1` are redirected to `/register` and signed-in users see nothing.
