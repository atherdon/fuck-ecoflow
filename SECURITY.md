# Security

## Docs site

This repository primarily hosts documentation. Report typos or unsafe credential examples in docs via GitHub issues/PRs on **LLazyEmail/fuck-ecoflow**.

## Secrets

- Never commit EcoFlow API keys, MQTT passwords, or account cookies.
- Prefer environment variables (`ECOFLOW_ACCESS_KEY`, `ECOFLOW_SECRET_KEY`) and mocks in any future executable samples.
- Rotate credentials if they appear in git history.

## Dependencies

Keep Docusaurus/npm dependencies updated via Renovate (weekly) and review `npm audit` findings in dedicated PRs.
