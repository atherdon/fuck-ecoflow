# AGENTS.md — guide for AI coding agents

This repository is the **LLazyEmail** fork of `fuck-ecoflow` — a Docusaurus documentation site about EcoFlow-related engineering, charging-station work, and outsourcing notes.

## Goals

1. Keep `npm run build` green.
2. Never delete existing docs content; annotate or extend.
3. Prefer small single-purpose draft PRs on this fork's `main` (not upstream).
4. Media is Git LFS — many historical pointers are incomplete; do not invent binaries.

## Setup

```bash
git lfs install
npm install
npm start
npm run build
npm run check:media
npm run check:naming
```

Node.js **>= 20** (CI uses 24).

## Layout

| Path | Purpose |
| --- | --- |
| `docs/` | Documentation (Ukrainian/English mixed content) |
| `scripts/` | Media + naming guardrails |
| `static/` | Static assets |
| `.github/workflows/` | CI — prefer `LLazyEmail/documentation-actions` `@v1` |

## Related ecosystem (research starting points)

When porting ideas, attribute upstream projects in PR bodies:

- [tolwi/hassio-ecoflow-cloud](https://github.com/tolwi/hassio-ecoflow-cloud) — HA cloud integration
- [rabits/ha-ef-ble](https://github.com/rabits/ha-ef-ble) — BLE HA integration
- [berezhinskiy/ecoflow_exporter](https://github.com/berezhinskiy/ecoflow_exporter) — Prometheus exporter
- [foxthefox/ioBroker.ecoflow-mqtt](https://github.com/foxthefox/ioBroker.ecoflow-mqtt) — MQTT / ioBroker
- [Mark-Hicks/ecoflow-api-examples](https://github.com/Mark-Hicks/ecoflow-api-examples) — public API examples
- [tess1o/go-ecoflow](https://github.com/tess1o/go-ecoflow) — Go client

## Secrets

No EcoFlow cloud credentials are required for the **docs site** build. If demo scripts are added later that call EcoFlow APIs, use mocks in tests and list required env vars for humans (`ECOFLOW_ACCESS_KEY`, `ECOFLOW_SECRET_KEY`, etc.) — never commit secrets.

## CI

Adopt reusable workflows from `LLazyEmail/documentation-actions` pinned `@v1`. Pages deploy callers may need `permissions.contents: write` until documentation-actions#33.

## Commits

```
Co-authored-by: petroved <arthur.tkachenko.netweight@gmail.com>
```
