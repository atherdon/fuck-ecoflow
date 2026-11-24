# Моя зброя розум. Мій дух сталевий. Мій код ПЕРЕМОГА. 

<!-- fork-status -->
> **Fork note:** This is the [LLazyEmail/fuck-ecoflow](https://github.com/LLazyEmail/fuck-ecoflow) working fork of [atherdon/fuck-ecoflow](https://github.com/atherdon/fuck-ecoflow). Prefer draft PRs against this fork's `main`. Never commit API keys.

# Я Інтелект. Я Система.
# Слава Україні!



# fuck-ecoflow


## Images from docs/images
Below are the images that live in docs/images so you can view them directly from the repository root README. Each image below is displayed as a smaller thumbnail; click it to open the full-size file.

### AI is stupid
<a href="static/img/ai-is-stupid.png"><img src="static/img/ai-is-stupid.png" width="360" alt="AI is stupid" /></a>

### Concept whiteboard
<a href="static/img/concept-whiteboard.png"><img src="static/img/concept-whiteboard.png" width="360" alt="Concept whiteboard" /></a>

### Jonny Ive be proud
<a href="static/img/jonny-ive-be-proud.png"><img src="static/img/jonny-ive-be-proud.png" width="360" alt="Jonny Ive be proud" /></a>

### Power station with images
<a href="static/img/power-station-with-images.png"><img src="static/img/power-station-with-images.png" width="360" alt="Power station with images" /></a>

### Simple schema whiteboard
<a href="static/img/simple-schema-whiteboard.png"><img src="static/img/simple-schema-whiteboard.png" width="360" alt="Simple schema whiteboard" /></a>


## Setup (docs site)

This repository is a **Docusaurus** documentation site (fork: [LLazyEmail/fuck-ecoflow](https://github.com/LLazyEmail/fuck-ecoflow)).

```bash
# Media uses Git LFS — install git-lfs before clone/pull for full images
git lfs install
npm install
npm start
npm run build
npm run serve
```

Node.js **>= 26.13.1** (`engines` in `package.json`, pinned in `.nvmrc`; CI jobs currently run Node 24). See [AGENTS.md](./AGENTS.md) for the agent/contributor guide.

### Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm run check:media` | Media guardrails |
| `npm run check:naming` | Naming conventions |
| `npm run optimize:media` | Optimize doc media (sharp) |
| `npm run check:images` | Report markdown image refs whose files are missing (report-only) |
| `npm run format:check` | Prettier check (`npm run format` to fix) |
| `npm run generate:docs-index` | Regenerate `docs/pages-index.md` (CI does this on `main`) |
| `npm run changelog` | Regenerate `CHANGELOG.md` (CI does this on `main`) |

## Git LFS

Many images and videos are stored with **Git LFS**. Without `git lfs pull`, files may be tiny pointer stubs and the site will show broken media (build may still succeed with warnings).

```bash
git lfs install
git lfs pull
```

If LFS objects 404, ask a maintainer to restore the binaries — do not invent replacements in PRs.

Every binary matching `.gitattributes` (`*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`, `*.mp4`, `*.mov`, `*.pdf`) must be committed as an LFS pointer. Files uploaded as plain blobs show up as "should have been pointers, but weren't" and break the CI jobs that commit to `main`. Check with `git lfs fsck --pointers`; fix with `git add --renormalize .`.

## CI

Workflows in `.github/workflows/` call reusable workflows from [`LLazyEmail/documentation-actions`](https://github.com/LLazyEmail/documentation-actions). Where a short-name alias exists, the caller uses it and stays pinned at `@v2`: `reusable-test-deploy`, `reusable-pages-deploy`, `reusable-image-check`, `reusable-auto-rebase`, and `reusable-npm-check`. Each alias accepts the same inputs as the long name.

| Workflow | When | What it does |
| --- | --- | --- |
| Build docs | PRs, `main` | Docusaurus build with LFS objects (`lfs: true`) |
| Test deployment | PRs to `main` | Docusaurus build |
| Build images | PRs | build with LFS objects and verify every image in the output |
| Media guardrails | PRs touching media | `npm run check:media` on added/renamed media |
| Naming conventions | PRs touching docs | `npm run check:naming` on added/renamed paths |
| Markdown lint | PRs, `main` | markdownlint |
| Link check | PRs, weekly | lychee |
| Star request comment | PR opened | one comment (`pull_request_target`) |
| Update changelog | push to `main` | regenerates and commits `CHANGELOG.md` |
| Update docs pages index | docs push to `main` | regenerates and commits `docs/pages-index.md` |
| Deploy | push to `main` | builds with LFS objects and publishes the site |
| Auto-rebase open PRs | every 6 hours | updates open PR branches that are behind `main` |

`CHANGELOG.md` and `docs/pages-index.md` are generated; don't edit them by hand.
