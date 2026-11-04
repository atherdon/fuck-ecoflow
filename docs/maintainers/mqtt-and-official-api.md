---
sidebar_position: 95
title: MQTT and official API (research)
---

# MQTT and official API (research)

EcoFlow exposes both an official developer API and device MQTT topics used by community tools.

## Starting points (attribution)

- [EcoFlow Developer Platform](https://developer.ecoflow.com/) — official REST / MQTT credentials
- [vwt12eh8/hassio-ecoflow](https://github.com/vwt12eh8/hassio-ecoflow) — portable station MQTT/API patterns
- [TarasKhust/ecoflow-api-mqtt](https://github.com/TarasKhust/ecoflow-api-mqtt) — API + MQTT bridge notes
- [tess1o/go-ecoflow](https://github.com/tess1o/go-ecoflow) — Go client covering REST/MQTT

## Guidance for this repo

1. Store keys only in local `.env` (see `.env.example`); never commit them.
2. Document topic names and payload shapes observed in the lab with redaction.
3. Prefer linking to upstream exporters/integrations rather than copying large trees.

See also [EcoFlow API credentials](./ecoflow-api-credentials.md) and [Related EcoFlow projects](./related-ecoflow-projects.md).
