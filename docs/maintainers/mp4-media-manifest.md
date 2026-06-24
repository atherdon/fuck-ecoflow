---
sidebar_position: 2
slug: /maintainers/mp4-media-manifest
---

# MP4 media manifest

This manifest tracks local MP4 files that should move out of Git and into Dropbox or another external video store.

Do not delete local MP4 files until each file has a reviewed external URL and any related docs point to that URL.

## Local MP4 files

| Local file | Size | Current docs reference | Dropbox URL |
| --- | ---: | --- | --- |
| `docs/01-outsourcing-engineering/AssemBLYA/2026-06-21.mp4` | ~0.0 MiB | No Markdown link found | Needed |
| `docs/01-outsourcing-engineering/powerbank/signal-2026-06-14-113056_002.mp4` | ~2.9 MiB | No Markdown link found | Needed |
| `docs/charging-station/01-2/1000235681.mp4` | ~22.7 MiB | No Markdown link found | Needed |
| `docs/charging-station/13c82aa9-971d-40a/signal-2025-05-23-10-54-15-840.mp4` | ~7.2 MiB | Filename note in Case 0 duplicate docs | Needed |
| `docs/charging-station/Y-completed-cases/00/1000235681.mp4` | ~22.7 MiB | No Markdown link found | Needed |
| `docs/charging-station/Y-completed-cases/01/signal-2026-06-13-015234_016.mp4` | ~12.7 MiB | No Markdown link found | Needed |
| `docs/charging-station/Y-completed-cases/01-2-3/1000235681.mp4` | ~22.7 MiB | No Markdown link found | Needed |
| `docs/charging-station/Y-completed-cases/01-2-3/signal-2025-05-23-10-54-15-840.mp4` | ~7.2 MiB | Filename note in Case 0 canonical docs | Needed |
| `signal-2026-06-14-173350_006.mp4` | ~4.9 MiB | No Markdown link found | Needed |

## Existing external MP4 links

These docs already point to Dropbox and do not require local video storage:

- `docs/01-outsourcing-engineering/charging-station/physicist.md`
- `docs/01-outsourcing-engineering/charging-station/physicist-ua.md`
- `docs/01-outsourcing-engineering/AssemBLYA/GarryHudini/readme.md`

## Migration checklist

For each local MP4:

1. Upload the video to Dropbox.
2. Add the public Dropbox URL to this manifest.
3. Replace any Markdown filename note or local link with the Dropbox URL.
4. Delete the local MP4 in a separate PR.
5. Run `npm run build`.
