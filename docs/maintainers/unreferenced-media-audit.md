---
sidebar_position: 3
slug: /maintainers/unreferenced-media-audit
---

# Unreferenced media audit

This report identifies media files that are likely not referenced by any Markdown document in `docs/`.

It is an audit only. Do not delete files from this report without a follow-up review PR.

## Method

The scan checked media files under `docs/` with these extensions:

- `.avif`
- `.gif`
- `.jpeg`
- `.jpg`
- `.mov`
- `.mp4`
- `.png`
- `.svg`
- `.webp`

It compared those files against Markdown references using:

- Markdown image syntax: `![alt](file.jpg)`
- Markdown link syntax: `[label](file.mp4)`
- HTML media syntax: `<img src="...">`, `<video src="...">`, `<source src="...">`

The result is conservative but not perfect:

- A file can be listed as unreferenced even if it is used by custom code outside Markdown.
- A file can be listed as unreferenced if it is intended as raw/archive material.
- Dropbox and other external URLs are ignored because they are already outside the repository.

## Summary

Current scan results:

| Metric | Count / size |
| --- | ---: |
| Total docs media files scanned | 648 |
| Total docs media size scanned | ~143.4 MiB |
| Likely unreferenced media files | 210 |
| Likely unreferenced media size | ~115.4 MiB |

## Likely unreferenced media by type

| Type | Count | Size |
| --- | ---: | ---: |
| `.mp4` | 8 | ~97.9 MiB |
| `.jpg` | 160 | ~15.5 MiB |
| `.jpeg` | 27 | ~1.6 MiB |
| `.webp` | 4 | ~0.3 MiB |
| `.png` | 11 | ~0.1 MiB |

## Likely unreferenced media by top-level docs folder

| Folder | Count | Size |
| --- | ---: | ---: |
| `docs/charging-station/` | 52 | ~110.6 MiB |
| `docs/01-outsourcing-engineering/` | 135 | ~3.7 MiB |
| `docs/team/` | 16 | ~1.0 MiB |
| `docs/images/` | 6 | ~0.2 MiB |
| `docs/00-Problem/` | 1 | ~0.0 MiB |

## Highest-impact cleanup batches

### 1. Move local MP4 files to Dropbox

These files are the largest likely unreferenced set and should be handled through the MP4 migration manifest before deletion:

| File | Size |
| --- | ---: |
| `docs/charging-station/01-2/1000235681.mp4` | ~22.7 MiB |
| `docs/charging-station/Y-completed-cases/00/1000235681.mp4` | ~22.7 MiB |
| `docs/charging-station/Y-completed-cases/01-2-3/1000235681.mp4` | ~22.7 MiB |
| `docs/charging-station/Y-completed-cases/01/signal-2026-06-13-015234_016.mp4` | ~12.7 MiB |
| `docs/charging-station/13c82aa9-971d-40a/signal-2025-05-23-10-54-15-840.mp4` | ~7.2 MiB |
| `docs/charging-station/Y-completed-cases/01-2-3/signal-2025-05-23-10-54-15-840.mp4` | ~7.2 MiB |
| `docs/01-outsourcing-engineering/powerbank/signal-2026-06-14-113056_002.mp4` | ~2.9 MiB |

Recommended PR sequence:

1. Add Dropbox URLs to `docs/maintainers/mp4-media-manifest.md`.
2. Replace any local filename notes with Dropbox links.
3. Delete local MP4 files in a separate PR.

### 2. Review completed-case duplicate media

The largest image-heavy candidates are in completed-case folders:

| Folder | Likely unreferenced count | Size |
| --- | ---: | ---: |
| `docs/charging-station/Y-completed-cases/01-2-3/` | 8 | ~35.9 MiB |
| `docs/charging-station/Y-completed-cases/00/` | 2 | ~24.0 MiB |
| `docs/charging-station/Y-completed-cases/01/` | 25 | ~19.2 MiB |

Recommended PR sequence:

1. Compare each candidate file with the canonical completed-case pages.
2. Keep only media referenced by the canonical case docs.
3. Delete duplicates or archive raw extras outside the published docs tree.

### 3. Review small gallery/archive folders

These are lower-risk batches after the MP4 and completed-case work:

| Folder | Likely unreferenced count | Size |
| --- | ---: | ---: |
| `docs/01-outsourcing-engineering/powerbank/` | 10 | ~2.9 MiB |
| `docs/team/our-lab/` | 16 | ~1.0 MiB |
| `docs/01-outsourcing-engineering/big-powerpunk/` | 4 | ~0.8 MiB |
| `docs/charging-station/inspiration/FLMan/` | 3 | ~0.4 MiB |
| `docs/charging-station/inspiration/bumblebee-booster/` | 5 | ~0.4 MiB |
| `docs/images/` | 6 | ~0.2 MiB |

## Largest likely unreferenced files

| File | Size |
| --- | ---: |
| `docs/charging-station/01-2/1000235681.mp4` | ~22.7 MiB |
| `docs/charging-station/Y-completed-cases/00/1000235681.mp4` | ~22.7 MiB |
| `docs/charging-station/Y-completed-cases/01-2-3/1000235681.mp4` | ~22.7 MiB |
| `docs/charging-station/Y-completed-cases/01/signal-2026-06-13-015234_016.mp4` | ~12.7 MiB |
| `docs/charging-station/13c82aa9-971d-40a/signal-2025-05-23-10-54-15-840.mp4` | ~7.2 MiB |
| `docs/charging-station/Y-completed-cases/01-2-3/signal-2025-05-23-10-54-15-840.mp4` | ~7.2 MiB |
| `docs/01-outsourcing-engineering/powerbank/signal-2026-06-14-113056_002.mp4` | ~2.9 MiB |
| `docs/charging-station/Y-completed-cases/01/1000235657.jpg` | ~2.7 MiB |
| `docs/charging-station/Y-completed-cases/01-2-3/1000235657.jpg` | ~2.7 MiB |
| `docs/charging-station/Y-completed-cases/01/1000235560.jpg` | ~2.0 MiB |
| `docs/charging-station/Y-completed-cases/01-2-3/1000235560.jpg` | ~2.0 MiB |
| `docs/charging-station/Y-completed-cases/00/0b05-1_all_12078.jpg` | ~1.4 MiB |
| `docs/charging-station/Y-completed-cases/01/1000235580.jpg` | ~1.4 MiB |
| `docs/charging-station/Y-completed-cases/01-2-3/1000235580.jpg` | ~1.4 MiB |

## Proposed next PRs

1. **MP4 URL PR**: add Dropbox URLs to the MP4 manifest.
2. **MP4 removal PR**: delete local MP4 files after URL review.
3. **Completed-case media cleanup PR**: remove unreferenced duplicate case media.
4. **Team/lab media cleanup PR**: review `docs/team/our-lab/`.
5. **Archive folder cleanup PR**: review small unreferenced galleries under `01-outsourcing-engineering` and `charging-station/inspiration`.
