Done one step: I created a new branch named format/dmytro-docs on the repository. I did not commit changes yet — below is a cleaned-up, Markdown-formatted version of docs/outsourcing-engineering/Dmytro.md prepared and ready to be committed into that branch. If you confirm, I'll commit it to format/dmytro-docs with a clear commit message.

Proposed file (ready-to-commit)

# Outsourcing & Engineering — Dmytro's Notes

Summary
- Collection of ideas, tasks and requirements for building/repairing charging stations, small power devices, and basic electronics work for field drone posts.
- Goal: organize production/repair of charging boxes and accessories, create a supporting network (both volunteers and veterans), and distribute units to posts and personnel.

## Tasks / Requests
1. Simple soldering tasks (wires / small devices — parts provided).
2. Repair items I cannot fix quickly myself.
3. Build charging-station boxes for drone posts.

Notes:
- Example: I have charging stations for large "vampire" batteries; they have very short power cables [...details omitted from original].
- If we make extension cables, ordering from multiple stores and waiting for deliveries is required; logistics complexity noted.
- I can pick up ~12 extension cables and balance leads now.
- Possible scale: make 20 units and distribute leftovers to other subunits that also have FPV batteries.

---

## Repair & Maintenance
- Basic repair of devices that failed or have exhausted battery resources.
  1. There was a power box for REBA; something failed — it stopped working. We disassembled it during movement [...].
  2. There is a person who repairs eco-flows; sometimes it's expensive because battery cells are dead — they buy for parts [...].

## "Physicist" Box (Ящик Физика)
- This idea has been around ~1 year: lots of information and materials, little progress.
- Components / rough BOM:
  - Mavic 3T case
  - 3–4 FPV batteries inside
  - Control / charging board
  - Laptop-style power brick
  - GaN HOTA USB hub with XT60
  - Cooler
  - Power switch

Why?
- Volunteers from Germany collect funds to buy EcoFlows (cost ~649 EUR each). Some posts need such charging stations but procurement is limited.
- Scale: our UAV unit has 9 posts now; my platoon already has 2 posts. To saturate posts we need ~10 boxes.
- Alternative distribution: hand out boxes to soldiers' homes as large powerbanks.

## Volunteers, Logistics & Procurement
- We have various volunteers. Recently they ordered ~500 EUR worth of boards and wires for us.
- Communication can be in Slack or Signal; volunteers are from different countries.
- Idea: instead of sending EcoFlows from Germany -> Netherlands -> Ukraine, buy bulk wiring, boards and cases, ship them directly to Ukraine and distribute/build locally.

## Motivation / Why / How / What was done
- There is a need to solder/assemble small devices (e.g., powerbanks for infantry). In the Netherlands there are many electronics volunteers who can help.
- Example: nightly deliveries include powerbanks in each parcel for infantry.
- What was done so far:
  - Idea collected
  - FPV batteries available
  - 2 built charging stations (v0)
  - HOTA GaN charging hub
  - Mavic cases

## Problems / Risks
- Batteries are the most expensive part; FPV battery availability depends on nearby subunits.
- Charging many batteries at once caused voltage fluctuations in a house and destroyed one cell.
- Many batteries are damaged and require disassembly, cleaning contacts, and testing.
- There may be large batches of drones bought by brigades; some were captured/damaged — potential source of spare parts.

## Team / People
- Pan Fyzik — PhD in physics, chief engineer of the FPV unit. Injured (legs), limited mobility.
- Pan Filyn — my navigator — lost an arm after an FPV strike on my vehicle.
- Pan Lesnyk — my engineer and sapper. Mental state impacted after Filyn’s injury.
- Three wounded comrades who I want to involve and find work in this project.

If this box project succeeds, I will try to build a veteran-run business where profit supports my subunit’s needs.

## Objectives
- Build a strong network of people in safe locations (peacetime-like conditions) who can do production/assembly.
- Create repeatable items: "Жабка", Powerbanks, USB-to-XT60 cables, "Павук" (spider) — (names from original notes).

## Inventory (what we have now)
- Idea and documentation
- FPV batteries
- 2 prototype charging stations (v0)
- HOTA GaN charging hub
- Mavic cases

## Next steps / To do
- Create a clear BOM per box (parts, cables, connectors, fans, switch, enclosure).
- Test and document the charging procedure and safety checks (prevent current spikes).
- Disassemble unusable batteries for salvageable parts / cells and document workflow.
- Start small production run (e.g., 10 boxes) and pilot at 2 posts.
- Set up communications channel (Slack / Signal) for volunteers and coordinators.
- Train 2–3 volunteers (or hire wounded veterans) to do consistent builds/repairs.

## Links / References
- Link to Vadim’s charger (original note referenced a link) — include when available.

## Contact
- (Add emails / Signal / Slack handles here for coordination)


- Created branch: format/dmytro-docs.
- Prepared a formatted Markdown version of Dmytro.md and showed it above.
- Waiting for your confirmation to commit the file into that branch.
