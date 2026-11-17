# Publish from VoSuite

The website renders articles from this directory at build time. It keeps the
public URLs at `https://eddievo.co/blog/<slug>`. Each published article is a
JSON file named `<slug>.json`. The two existing posts show the format.

Required fields are `slug`, `title`, `excerpt` (the SEO description), `author`,
`publishedAt` (ISO timestamp in UTC ending in Z), `tags` (an array of strings),
and `body` (Markdown starting at heading level 2). Cite source links in the body.
Optional `coverImage` has `src` (for example `/blog/<slug>.webp`) and descriptive
`alt` text. Use a cover encoded in the format named by `src`.

Once a draft passes VoSuite's editorial checks and reaches its publish slot,
run this command in a current EVOCO checkout:

```sh
node scripts/import-vosuite-post.mjs /path/to/article.json /path/to/cover.webp
```

The importer writes the article and optional image to the repository, checks
the format, and refuses to replace different content at an existing slug.
Identical imports can be retried. To edit an existing article, update its existing
file explicitly and preserve its URL. Only content intended for publication
belongs in this public repository.

Run `corepack pnpm build` and check the article output. Commit the article and
image together. A push to the production branch starts the Cloudflare Pages
deployment. Keep the VoSuite job in Deploying until the build succeeds and the
public article URL serves the expected page.
