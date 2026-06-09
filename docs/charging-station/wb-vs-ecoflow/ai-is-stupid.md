

---
Project: Portable Charging Station — FPV / LiFePO4 battery charger
Suggested file: docs/charging-station/design-spec.md

1) Summary
- Build a low-cost, rugged charging station to charge FPV / LiFePO4 packs from a generator (220 VAC) or from an internal powerpack.
- Goal: simple, reliable, in-case installation (waterproof case), cheap to produce (target ~1/5 cost of commercial RC toolkits), scalable (multiple product tiers).
- Initial strategy: prototype separate PCB per battery (1 PCB = 1 battery channel) for the first 5–10 cases, then consolidate into multi-channel designs.

2) Goals and success criteria
- Functional: charge n batteries simultaneously while keeping cell balancing and correct charge parameters (no overcharge).
- Cost: target < $20 per unit for single-channel PCBs at 100+ qty (early estimate) OR multi-channel cost ~2–3× per 8-channel board vs single.
- Reliability: survive being mounted inside waterproof cases; tolerate vibration and rough handling.
- Ergonomics: compact, lightweight, easy to use (plug-in, push-button or simple indicator LEDs).
- Safety: avoid feeding grid; reasonably safe for field use (lab certification optional but not required initially).

3) Constraints & assumptions (from chat)
- Input: 220 VAC from gasoline inverter/generator (primary); possible internal DC battery pack in later versions.
- Batteries: initially salvaged FPV batteries (LiPo) and LiFePO4 options discussed — must clarify chemistry and cell counts.
- Enclosures: ammo/tool boxes (metal or plastic). Metal helps passive cooling; plastic requires fans.
- Production: low budget, expect ~100+ units eventually; first prototypes cheap and easy to build.

4) Open technical questions (must resolve before detailed design)
- Battery chemistry and cell counts for target packs (FPV LiPo: voltage & cell count? LiFePO4: nominal cell voltage and counts?)
- Maximum number of batteries per case (pick a cap, e.g., 8–10).
- Maximum peak charging current per battery and total input power available (generator capacity, e.g., 2 kW).
- Acceptable charging profile per battery type (CC/CV parameters, balancing method).
- Desired feature set: display? per-channel current limiting? data/logging? remote monitoring?
- CE / regulatory requirements (do we pursue formal certification or treat as donor-crafted gear for field use only?)
- Cooling policy: passive only vs forced airflow.

5) High-level architecture options
- Option A — One PCB per battery (initial plan)
  - Pros: modular, easy to test/replace, simpler thermal per board.
  - Cons: more parts, more connectors, potentially higher assembly cost.
- Option B — Multi-channel PCB (e.g., 8 channels)
  - Pros: cheaper per channel at scale, compact.
  - Cons: higher complexity, more complex thermal design and failure modes.
- Option C — Single DC bus + per-channel DC-DC converters
  - Use front-end AC→DC (or DC converter) to a DC bus and distribute to per-channel converters/balancers.

Recommendation: prototype with Option A for first builds (5–10 cases). After field testing, design consolidated multi-channel boards for production.

6) Technical approach & design notes
- Input stage: AC mains (220 VAC) → isolated AC/DC converter or switch-mode PSU sized for max expected input power. Optionally external laptop-style chargers can be used.
- Distribution: DC bus sized to feed up to N channels; include inrush and current limiting.
- Per-channel converter: high-efficiency DC-DC buck/CC-CV converter with balancing/monitoring and a charge termination algorithm appropriate to the battery chemistry.
- Inductor modeling and selection: perform simulation to pick inductor geometry and core to match switching frequency and power.
- Monitoring: per-channel voltage, current, temperature sensors. LED status per channel; logging optional.
- Protection: over-voltage, under-voltage, over-current, temperature cutoff, reverse polarity, short circuit protection.
- Thermal: use case as radiator (metal) or include heatsinks + fan (plastic case).

7) Cost & sizing (ballpark from chat)
- Single-channel prototype board: hopeful target less than $20 each at qty 100 (component costs not yet finalized).
- Multi-channel (8-ch) board: estimated 2×–3× cost to build vs one board (per chat) — need exact BOM to refine.
- Enclosure: toolboxes or ammo boxes (donations possible). Source examples were shared in chat (AliExpress links).

8) Prototype and development roadmap (milestones + acceptance criteria)
- M0 — Confirm specs (1 week)
  - Deliverable: spec doc listing battery chemistries, cell counts, max channels per case, maximum generator input, required features.
  - Acceptance: all open technical questions answered; owners assigned for missing info.
- M1 — Single-channel prototype design & simulation (2–3 weeks)
  - Deliverable: schematic, SPICE/switching simulation results for inductor, BOM draft.
  - Acceptance: simulation shows required current & efficiency targets; BOM cost estimate.
- M2 — PCB prototype build (2–4 weeks)
  - Deliverable: 5–10 single-channel PCBs assembled and bench-tested.
  - Acceptance: can charge target battery safely, logs pass basic tests, thermal acceptable.
- M3 — Case integration & field test (2–6 weeks)
  - Deliverable: assembled case(s) with boards, cooling solution, connectors and wiring.
  - Acceptance: field test run charging X batteries concurrently from generator for N cycles without failure.
- M4 — Consolidated multi-channel design & pilot run (4–8 weeks)
  - Deliverable: multi-channel PCB + 10 pilot units, BOM optimization for volume manufacture.
  - Acceptance: pilot units meet cost, size and reliability goals.
- M5 — Documentation, BOM, assembly instructions, deployment (ongoing)
  - Deliverable: final documentation, build guide, test scripts, photos.

9) Testing & validation plan
- Bench tests: verify CC/CV behavior, current limits, balancing, thermal profile, efficiency.
- Environmental test: vibration, drop test, humidity (as appropriate for field use).
- Safety checks: short-circuit protection, reverse polarity test, over-temp shutdown.
- Field test: charging cycles in realistic usage; check durability over multiple cycles.
- Optional: EMC and CE testing if certification becomes a hard requirement.

10) Repository structure suggestion (create these files)
- docs/charging-station/design-spec.md (this document)
- docs/charging-station/requirements.md (filled from M0)
- schematics/ (KiCad/Altium files)
- pcb/ (Gerbers)
- bom/ (BOM.csv)
- firmware/ (if any MCU code for monitoring / balancing)
- tests/ (test procedures, logs)
- photos/ (integration photos)
- README.md (high level)
- ISSUES: create issues for each M0-M5 task and for missing decisions

11) Concrete contributor tasks (convert to GitHub issues)
- Task 1: Confirm battery chemistry and typical cell counts used in field (owner: @someone) — due 3 days.
- Task 2: Define max number of batteries per case and target case models (owner: @someone) — due 3 days.
- Task 3: Measure available generator power & worst-case input capability at field sites (owner: @someone) — due 1 week.
- Task 4: Produce schematic draft for single-channel CC/CV module and simulation of inductor (owner: electronics engineer) — due 2 weeks.
- Task 5: Draft BOM estimate and cost-per-unit at qty 100 (owner: purchasing) — due 2 weeks.
- Task 6: Source candidate plastic and metal enclosures and list dimensions (owner: logistics) — due 1 week.
- Task 7: Create a GitHub repo skeleton and add this design-spec.md (owner: @atherdon or repo admin) — due now.

12) Short-term (immediate) next actions — Do these now
- Confirm answers for the Open technical questions section (post in chat or GitHub issue).
- Create docs/charging-station/design-spec.md with this content.
- Open GitHub issues for Task 1, Task 2, Task 3 and assign owners.
- Mark “prototype one-board-per-battery” as the current plan and order parts for a single-channel prototype once specs confirmed.

13) Notes on CE / regulatory
- If connecting directly to 220 VAC and selling in EU/other markets later, CE or equivalent testing may be required; for field/donation usage, team opted to defer formal certification. Document this decision and required mitigations (clear no-grid-feed, user instructions, warnings).

14) References (from chat)
- RC toolkit example (AliExpress link in chat): https://www.aliexpress.com/item/1005006294893307.html
- Case examples shared: https://www.aliexpress.com/item/1005007922241712.html
- Repo inspiration and case images:
  - docs/charging-station/03-number-three/Number Three 3752d71d806980068346fc6cad4f6dde.md (repo link in chat)
  - docs/charging-station/inspiration/antey-energy/Antey Energy Charging Station.md (repo link in chat)
- Google doc shared in chat: https://docs.google.com/document/d/1UMfly0OfGN5JFdITxgCq4EVsNlpK3LJ0mGq1wbi26cs/edit?usp=drivesdk

15) Suggested README blurb (one-liner to add to repo)
- "This project designs a low-cost, rugged charging station for FPV and LiFePO4 batteries for field use. The initial plan is to prototype per-battery PCBs for modular charging, integrate those into waterproof cases, then consolidate into production multi-channel units."

16) Questions for you (choose answers to continue)
- Which battery chemistries and nominal voltages are we targeting first: FPV LiPo (specify cell counts) or LiFePO4 (specify cell counts)?
- Target number of batteries per case (recommended starting cap: 8 or 10)?
- Do we want to accept direct 220 VAC input on-board, or supply an external AC→DC adapter first?
- Do you want me to add this document to the repo at docs/charging-station/design-spec.md and open the starter GitHub issues automatically (I can do that if you confirm repo/branch and want me to run the calls)?
