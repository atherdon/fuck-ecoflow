---
title: AI is stupid
sidebar_label: AI is stupid
sidebar_position: 2
slug: /charging-station/overview/ai-is-stupid
description: Design-spec note for a portable FPV / LiFePO4 charging station.
---

# AI is stupid

This page is a design-spec style note for the project "Portable Charging Station — FPV / LiFePO4 battery charger". A suggested file name in the original note was `docs/charging-station/design-spec.md`.

## Contents

- [1. Summary](#summary)
- [2. Goals and success criteria](#goals-and-success-criteria)
- [3. Constraints and assumptions](#constraints-and-assumptions)
- [4. Open technical questions](#open-technical-questions)
- [5. High-level architecture options](#high-level-architecture-options)
- [6. Technical approach and design notes](#technical-approach-and-design-notes)
- [7. Cost and sizing](#cost-and-sizing)
- [8. Prototype and development roadmap](#prototype-and-development-roadmap)
- [9. Testing and validation plan](#testing-and-validation-plan)
- [10. Repository structure suggestion](#repository-structure-suggestion)
- [11. Concrete contributor tasks](#concrete-contributor-tasks)
- [12. Short-term next actions](#short-term-next-actions)
- [13. References](#references)
- [14. Suggested README blurb](#suggested-readme-blurb)
- [15. Questions](#questions)

## 1. Summary {#summary}

- Build a low-cost, rugged charging station to charge FPV / LiFePO4 packs from a generator (220 VAC) or from an internal powerpack.
- Goal: simple, reliable, in-case installation (waterproof case), cheap to produce (target ~1/5 cost of commercial [RC toolkits](https://www.aliexpress.com/item/1005006294893307.html)), scalable (multiple product tiers).
- Initial strategy: prototype separate PCB per battery (1 PCB = 1 battery channel) for the first 5–10 cases, then consolidate into multi-channel designs.

## 2. Goals and success criteria {#goals-and-success-criteria}

- Functional: charge n batteries simultaneously while keeping cell balancing and correct charge parameters (no overcharge).
- Cost: target < $20 per unit for single-channel PCBs at 100+ qty (early estimate) OR multi-channel cost ~2–3× per 8-channel board vs single.
- Reliability: survive being mounted inside waterproof cases; tolerate vibration and rough handling.
- Ergonomics: compact, lightweight, easy to use (plug-in, push-button or simple indicator LEDs).
- Safety: avoid feeding grid; reasonably safe for field use (lab certification optional but not required initially).

## 3. Constraints and assumptions {#constraints-and-assumptions}

From [chat](../wb-vs-ecoflow/chat-with-great-and-smart-people.md):

- Input: 220 VAC from gasoline inverter/generator (primary); possible internal DC battery pack in later versions.
- Batteries: initially salvaged FPV batteries (LiPo) and LiFePO4 options discussed — must clarify chemistry and cell counts.
- Enclosures: ammo/tool boxes (metal or plastic). Metal helps passive cooling; plastic requires fans. Examples: [case examples on AliExpress](https://www.aliexpress.com/item/1005007922241712.html).
- Production: low budget, expect ~100+ units eventually; first prototypes cheap and easy to build.

## 4. Open technical questions {#open-technical-questions}

Must resolve before detailed design:

- Battery chemistry and cell counts for target packs (FPV LiPo: voltage & cell count? LiFePO4: nominal cell voltage and counts?)
- Maximum number of batteries per case (pick a cap, e.g., 8–10).
- Maximum peak charging current per battery and total input power available (generator capacity, e.g., 2 kW).
- Acceptable charging profile per battery type (CC/CV parameters, balancing method).
- Desired feature set: display? per-channel current limiting? data/logging? remote monitoring?
- CE / regulatory requirements (do we pursue formal certification or treat as donor-crafted gear for field use only?)
- Cooling policy: passive only vs forced airflow.

## 5. High-level architecture options {#high-level-architecture-options}

| Option | Notes | Pros | Cons |
| --- | --- | --- | --- |
| Option A — One PCB per battery (initial plan) | | modular, easy to test/replace, simpler thermal per board. | more parts, more connectors, potentially higher assembly cost. |
| Option B — Multi-channel PCB (e.g., 8 channels) | | cheaper per channel at scale, compact. | higher complexity, more complex thermal design and failure modes. |
| Option C — Single DC bus + per-channel DC-DC converters | Use front-end AC→DC (or DC converter) to a DC bus and distribute to per-channel converters/balancers. | — | — |

Recommendation: prototype with Option A for first builds (5–10 cases). After field testing, design consolidated multi-channel boards for production.

## 6. Technical approach and design notes {#technical-approach-and-design-notes}

- Input stage: AC mains (220 VAC) → isolated AC/DC converter or switch-mode PSU sized for max expected input power. Optionally external laptop-style chargers can be used.
- Distribution: DC bus sized to feed up to N channels; include inrush and current limiting.
- Per-channel converter: high-efficiency DC-DC buck/CC-CV converter with balancing/monitoring and a charge termination algorithm appropriate to the battery chemistry.
- Inductor modeling and selection: perform simulation to pick inductor geometry and core to match switching frequency and power.
- Monitoring: per-channel voltage, current, temperature sensors. LED status per channel; logging optional.
- Protection: over-voltage, under-voltage, over-current, temperature cutoff, reverse polarity, short circuit protection.
- Thermal: use case as radiator (metal) or include heatsinks + fan (plastic case).

## 7. Cost and sizing {#cost-and-sizing}

Ballpark from [chat](../wb-vs-ecoflow/chat-with-great-and-smart-people.md):

- Single-channel prototype board: hopeful target less than $20 each at qty 100 (component costs not yet finalized).
- Multi-channel (8-ch) board: estimated 2×–3× cost to build vs one board (per chat) — need exact BOM to refine.
- Enclosure: toolboxes or ammo boxes (donations possible). Source examples were shared in chat: [RC toolkit (AliExpress)](https://www.aliexpress.com/item/1005006294893307.html), [case examples (AliExpress)](https://www.aliexpress.com/item/1005007922241712.html).

## 8. Prototype and development roadmap {#prototype-and-development-roadmap}

Milestones and acceptance criteria:

| Milestone | Time | Deliverable | Acceptance |
| --- | --- | --- | --- |
| M0 — Confirm specs | 1 week | spec doc listing battery chemistries, cell counts, max channels per case, maximum generator input, required features. | all open technical questions answered; owners assigned for missing info. |
| M1 — Single-channel prototype design & simulation | 2–3 weeks | schematic, SPICE/switching simulation results for inductor, BOM draft. | simulation shows required current & efficiency targets; BOM cost estimate. |
| M2 — PCB prototype build | 2–4 weeks | 5–10 single-channel PCBs assembled and bench-tested. | can charge target battery safely, logs pass basic tests, thermal acceptable. |
| M3 — Case integration & field test | 2–6 weeks | assembled case(s) with boards, cooling solution, connectors and wiring. | field test run charging X batteries concurrently from generator for N cycles without failure. |
| M4 — Consolidated multi-channel design & pilot run | 4–8 weeks | multi-channel PCB + 10 pilot units, BOM optimization for volume manufacture. | pilot units meet cost, size and reliability goals. |
| M5 — Documentation, BOM, assembly instructions, deployment | ongoing | final documentation, build guide, test scripts, photos. | |

## 9. Testing and validation plan {#testing-and-validation-plan}

- Bench tests: verify CC/CV behavior, current limits, balancing, thermal profile, efficiency.
- Environmental test: vibration, drop test, humidity (as appropriate for field use).
- Safety checks: short-circuit protection, reverse polarity test, over-temp shutdown.
- Field test: charging cycles in realistic usage; check durability over multiple cycles.
- Optional: EMC and CE testing if certification becomes a hard requirement.

## 10. Repository structure suggestion {#repository-structure-suggestion}

Create these files:

- `docs/charging-station/design-spec.md` (this document)
- `docs/charging-station/requirements.md` (filled from M0)
- `schematics/` (KiCad/Altium files)
- `pcb/` (Gerbers)
- `bom/` (BOM.csv)
- `firmware/` (if any MCU code for monitoring / balancing)
- `tests/` (test procedures, logs)
- `photos/` (integration photos)
- `README.md` (high level)
- ISSUES: create issues for each M0-M5 task and for missing decisions

## 11. Concrete contributor tasks {#concrete-contributor-tasks}

Convert to GitHub issues:

| Task | Owner | Due |
| --- | --- | --- |
| Task 1: Confirm battery chemistry and typical cell counts used in field | @someone | 3 days |
| Task 2: Define max number of batteries per case and target case models | @someone | 3 days |
| Task 3: Measure available generator power & worst-case input capability at field sites | @someone | 1 week |
| Task 4: Produce schematic draft for single-channel CC/CV module and simulation of inductor | electronics engineer | 2 weeks |
| Task 5: Draft BOM estimate and cost-per-unit at qty 100 | purchasing | 2 weeks |
| Task 6: Source candidate plastic and metal enclosures and list dimensions | logistics | 1 week |
| Task 7: Create a GitHub repo skeleton and add this design-spec.md | @atherdon or repo admin | now |

## 12. Short-term next actions {#short-term-next-actions}

Do these now:

- Confirm answers for the [Open technical questions](#open-technical-questions) section (post in [chat](../wb-vs-ecoflow/chat-with-great-and-smart-people.md) or GitHub issue).
- Create `docs/charging-station/design-spec.md` with this content.
- Open GitHub issues for Task 1, Task 2, Task 3 and assign owners.
- Mark “prototype one-board-per-battery” as the current plan and order parts for a single-channel prototype once specs confirmed.

## 13. References {#references}

From [chat](../wb-vs-ecoflow/chat-with-great-and-smart-people.md):

- [RC toolkit example (AliExpress)](https://www.aliexpress.com/item/1005006294893307.html)
- [Case examples (AliExpress)](https://www.aliexpress.com/item/1005007922241712.html)
- Repo inspiration and case images:
  - [Number Three](../Y-completed-cases/03-number-three/number-three.md) (originally cited as `docs/charging-station/03-number-three/Number Three 3752d71d806980068346fc6cad4f6dde.md`)
  - [Antey Energy Charging Station](../inspiration/antey-energy/Antey%20Energy%20Charging%20Station.md)
- [Google doc shared in chat](https://docs.google.com/document/d/1UMfly0OfGN5JFdITxgCq4EVsNlpK3LJ0mGq1wbi26cs/edit?usp=drivesdk)

## 14. Suggested README blurb {#suggested-readme-blurb}

One-liner to add to repo:

- "This project designs a low-cost, rugged charging station for FPV and LiFePO4 batteries for field use. The initial plan is to prototype per-battery PCBs for modular charging, integrate those into waterproof cases, then consolidate into production multi-channel units."

## 15. Questions {#questions}

Choose answers to continue:

- Which battery chemistries and nominal voltages are we targeting first: FPV LiPo (specify cell counts) or LiFePO4 (specify cell counts)?
- Target number of batteries per case (recommended starting cap: 8 or 10)?
- Do we want to accept direct 220 VAC input on-board, or supply an external AC→DC adapter first?
- Do you want me to add this document to the repo at docs/charging-station/design-spec.md and open the starter GitHub issues automatically (I can do that if you confirm repo/branch and want me to run the calls)?
