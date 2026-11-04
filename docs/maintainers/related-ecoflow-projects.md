---
sidebar_position: 90
title: Related EcoFlow projects
---

# Related EcoFlow projects

Curated starting points from public GitHub research. Use these when documenting integrations, exporters, or reverse-engineering notes. **Attribute** the upstream project in any PR that ports an idea.

> This page is documentation only — it does not vendor code or credentials.

## Home Assistant

| Project | Stars (approx.) | Notes |
| --- | --- | --- |
| [tolwi/hassio-ecoflow-cloud](https://github.com/tolwi/hassio-ecoflow-cloud) | 900+ | Official-cloud HA integration |
| [vwt12eh8/hassio-ecoflow](https://github.com/vwt12eh8/hassio-ecoflow) | 300+ | Portable power station HA |
| [rabits/ha-ef-ble](https://github.com/rabits/ha-ef-ble) | 400+ | Unofficial BLE HA |
| [TarasKhust/ecoflow-api-mqtt](https://github.com/TarasKhust/ecoflow-api-mqtt) | 70+ | Developer API + MQTT |
| [shuette42/ecoflow-energy-ha](https://github.com/shuette42/ecoflow-energy-ha) | 50+ | PowerOcean / Stream family |

## Metrics / exporters

| Project | Notes |
| --- | --- |
| [berezhinskiy/ecoflow_exporter](https://github.com/berezhinskiy/ecoflow_exporter) | Prometheus exporter |
| [tess1o/go-ecoflow-exporter](https://github.com/tess1o/go-ecoflow-exporter) | Go exporter (REST or MQTT) |

## MQTT / clients / examples

| Project | Notes |
| --- | --- |
| [foxthefox/ioBroker.ecoflow-mqtt](https://github.com/foxthefox/ioBroker.ecoflow-mqtt) | Broad device coverage via MQTT |
| [Mark-Hicks/ecoflow-api-examples](https://github.com/Mark-Hicks/ecoflow-api-examples) | Public API sample code |
| [tess1o/go-ecoflow](https://github.com/tess1o/go-ecoflow) | Go library |

## Reverse engineering / local control

| Project | Notes |
| --- | --- |
| [nielsole/ecoflow-bt-reverse-engineering](https://github.com/nielsole/ecoflow-bt-reverse-engineering) | Bluetooth RE |
| [rabits/ef-ble-reverse](https://github.com/rabits/ef-ble-reverse) | BLE protocol V2 notes |
| [bulldog5046/EcoFlow-CanBus-Reverse-Engineering](https://github.com/bulldog5046/EcoFlow-CanBus-Reverse-Engineering) | CAN bus |
| [v1ckxy/ecoflow-withoutflow](https://github.com/v1ckxy/ecoflow-withoutflow) | Offline communication research |
| [tomvd/local-powerstream](https://github.com/tomvd/local-powerstream) | Local PowerStream control hub |
| [MaxGrmm/EF-PowerOcean-TcpModbus](https://github.com/MaxGrmm/EF-PowerOcean-TcpModbus) | Local Modbus TCP for PowerOcean |

## How to use this list here

1. Prefer documenting APIs/protocols with citations over copying code.
2. If a snippet is adapted, name the source repo + license in the PR body.
3. Never commit EcoFlow account secrets; use env vars / mocks.
