# Paralox Media website (React + Vite)

React site for paraloxmedia.com with clean URLs (`/about`, `/ai`, `/pulse/<article>`, …). The production build writes a separate HTML file for every route, including its title, description, Open Graph image and Twitter card, so link previews work on static hosting without JavaScript or a Node server.

## Run

```bash
npm install
npm run dev          # local dev server
npm run build        # production build → dist/  (upload this folder to any static host)
npm run preview      # preview the production build
npm run build:single # everything inlined into one file → dist-single/index.html
npm run reviews      # refresh Google reviews only (also runs before every build)
```

## Where things live

| What | File |
| --- | --- |
| All copy: contact details, socials, services, FAQ, posts, team | `src/data/content.js` |
| **Google reviews** (fetched at build time) | `src/data/reviews.json`, `scripts/fetch-reviews.mjs` |
| Pages | `src/pages/` (Home, Pillar, About, Pulse, Article, Contact) |
| Home page sections | `src/sections/` |
| Shared components (nav, footer, loader, glass icons, map) | `src/components/` |
| Styles | `src/styles/global.css`, `src/styles/loader.css` |
| Fonts and images | `src/assets/` |

### Google reviews

Reviews come from the Google Places API when you build. `npm run build` first runs `scripts/fetch-reviews.mjs`, which saves them to `src/data/reviews.json`.

1. In Google Cloud, enable **Places API (New)**, turn on billing, and create an API key. Restrict it to that API.
2. Copy `.env.example` to `.env` and set `GOOGLE_MAPS_API_KEY`. On Netlify, Vercel or Cloudflare, add it as an environment variable instead.
3. Run `npm run reviews`. The first run prints the place ID it found; put that in `GOOGLE_PLACE_ID` to skip the name lookup.

Google returns at most 5 reviews (its "most relevant" ones). Reviews only update when the site is rebuilt. Without a key, or if the request fails, the build keeps the last saved `reviews.json`. The key is used only at build time and never goes into the site.

While `reviews.json` is empty, the home page shows a "Read our reviews on Google" card instead of the scrolling review columns.

### Hosting notes

- Netlify, Vercel, Cloudflare Pages, GitHub Pages or plain cPanel hosting all work. Set the build command to `npm run build` and the output directory to `dist`.
- Serve real files and directory indexes before the SPA fallback. For example, `/pulse/<article>` must resolve to `dist/pulse/<article>/index.html`. Deploy the entire `dist` folder, not just its root index.
- The normal build uses absolute `/assets/` URLs and is intended for the domain root.
- The optional Node service runs `node server.cjs` and shares the same metadata renderer as the static build.
- After building, run `npm run check:previews` to verify all generated page previews and their image files. Previously shared URLs may retain an older preview in a messaging platform's cache until that platform fetches them again.
