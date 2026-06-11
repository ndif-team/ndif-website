# ndif-website

Source for the National Deep Inference Fabric site at [ndif.us](https://ndif.us).

Next.js 14 (app router) + Tailwind CSS + Three.js.

## Development

```bash
bun install
bun run dev
```

Dev server runs at `http://localhost:3000`.

## Production build

```bash
cp next.config.production.js next.config.js
bun run build
```

Output goes to `out/`. The production config sets `basePath` / `assetPrefix` to `/ndif-website` for GitHub Pages preview at `https://ndif-team.github.io/ndif-website/`.
