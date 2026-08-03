# Eddie Vo Company — Sanity Studio

Local editor for blog posts (and future content types).

## Develop locally

```bash
cd studio
pnpm install
pnpm dev
```

Open the URL printed in the terminal (usually http://localhost:3333).

## Deploy hosted Studio

```bash
cd studio
pnpm install
pnpm dlx sanity@latest login   # once
pnpm deploy
```

This publishes to a `*.sanity.studio` URL you can use from any browser.
