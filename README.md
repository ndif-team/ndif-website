# ndif-website

The website for the [National Deep Inference Fabric](https://ndif.us/) ([ndif.us](https://ndif.us/)).

A Next.js 14 app lives in `src/`; the **built static site is committed to `public/`**,
and anything in `public/` on `main` is automatically served — same contract as the
previous Python-built site.

## Development

```bash
cd src
bun install     # or: npm install
bun run dev     # http://localhost:3000
```

## Build & deploy

```bash
make all        # builds src/ and replaces public/ with the static export
```

Then commit everything (including `public/`) and push to `main`. The server
serves `public/` as-is — no Node required at runtime.

## Data

The research/code catalog (`src/public/data/*.json`, `src/public/images/`) is
published by the [ndif-citations](https://github.com/ndif-team/ndif-citations)
pipeline. After publishing new data, run `make all` and commit so the live site
picks it up.

## Looped Lens Challenge page

`src/public/looped-lens-challenge/` is a standalone static page (plain HTML and
CSS, no build step), served at `https://ndif.us/looped-lens-challenge/`. It does
not use the app's layout, header or styles. Edit its files directly; the banner
in `src/components/Header.tsx` links to it.

## GitHub Pages preview

`src/next.config.production.js` is an alternate config (basePath `/ndif-website`)
for previewing at `https://ndif-team.github.io/ndif-website/` — not used for ndif.us.
