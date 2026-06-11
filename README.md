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

## GitHub Pages preview

`src/next.config.production.js` is an alternate config (basePath `/ndif-website`)
for previewing at `https://ndif-team.github.io/ndif-website/` — not used for ndif.us.
