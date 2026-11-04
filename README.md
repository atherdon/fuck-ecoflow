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

Node.js **>= 20**. See [AGENTS.md](./AGENTS.md) once added.

### Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm run check:media` | Media guardrails |
| `npm run check:naming` | Naming conventions |
| `npm run optimize:media` | Optimize doc media (sharp) |

## Git LFS

Many images and videos are stored with **Git LFS**. Without `git lfs pull`, files may be tiny pointer stubs and the site will show broken media (build may still succeed with warnings).

```bash
git lfs install
git lfs pull
```

If LFS objects 404, ask a maintainer to restore the binaries — do not invent replacements in PRs.
