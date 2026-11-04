---
sidebar_position: 91
title: EcoFlow API credentials (local only)
---

# EcoFlow API credentials (local only)

This docs site builds **without** EcoFlow credentials. If you add executable samples later, keep secrets out of git.

## Suggested environment variables

Inspired by public examples such as [Mark-Hicks/ecoflow-api-examples](https://github.com/Mark-Hicks/ecoflow-api-examples) and HA integrations like [tolwi/hassio-ecoflow-cloud](https://github.com/tolwi/hassio-ecoflow-cloud) (attribute those projects in PRs that port code):

```bash
export ECOFLOW_ACCESS_KEY="..."
export ECOFLOW_SECRET_KEY="..."
# Optional region / host overrides depending on API surface
export ECOFLOW_API_BASE="https://api.ecoflow.com"
```

Copy `.env.example` (when present) to `.env` locally. Never commit `.env`.

## Tests

Prefer mocks/fixtures over live API calls in CI. Document any live-test opt-in behind an explicit env flag such as `ECOFLOW_LIVE_TEST=1`.
