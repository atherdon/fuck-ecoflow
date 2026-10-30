# Contributing

Work happens on the **LLazyEmail/fuck-ecoflow** fork.

1. Branch from `main`.
2. Keep PRs small and draft until CI is green.
3. Do not open routine PRs against upstream.
4. Extend docs; do not delete historical notes.
5. Media is Git LFS — install `git-lfs` before expecting images.

```bash
npm ci
npm run build
npm run check:media
npm run check:naming
```

Commit trailer:

```
Co-authored-by: petroved <arthur.tkachenko.netweight@gmail.com>
```
