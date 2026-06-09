# May 22th Specification Only

## **Situation**

We have many devices. Packing up the position takes a lot of time. Currently, tablets, cables, and power banks are transported separately (in different backpacks, cases, etc.).

A tablet discharges completely within a day, then recharges from a power bank, which is then charged via an EcoFlow or generator. This consumes a lot of energy(maybe effort?).

---

# **Problems We Aim to Solve**

- Rapid deployment/redeployment.
- Valuable equipment protection.
- Use of a detachable 220V cable to connect the entire case to a generator or EcoFlow.
- Minimal downtime.

---

## **Overall Concept**

All future cases should follow a uniform design, which makes it easier to plan internal components (power bank, batteries, etc.).

One case = one structure.

This also reduces costs, as we will be ordering all parts in bulk.

The core idea: open the case lid — and you’re ready to work.

All power(batteries, chargers) and devices are fully integrated

---

## **Essential Components for the Case**

- BMS
- Wiring
- Battery section
- Circuits to operate the power bank
- Charging unit

---

## **Case Selection**

Choosing the case must account for:

- Availability in numbers
- Space for batteries, boards, cooling, and cables
- Space to mount the tablet and other devices
    
    <aside>
    💡
    
    Initially, a case from Mavic was considered.
    
    </aside>
    

---

## **False Lid**

A false lid is needed to cover the lower layer (with boards and batteries) and to organize USB ports.

A uniform 3D model of false lid per the case is planned.

Also required:

- Universal mounts for a 10-inch tablet. (I don’t want to buy standard mounts. There are various reasons. For example, we likely won’t find the ideal option, so we’ll end up buying something and modifying it for our needs.)
- Cable mounts (pocket, clip, or other)

---

**Action Plan**

1. Purchase the case. (Already done)
2. Prepare the boards and determine the mounting method.
3. Plan out the layout of the batteries and the charger.
4. Create 3D models (or use existing ones) for:
    - Battery holders
    - Tablet mounts
    - False lid

---

**Technical Specifications**

Battery: 12V BMC, 12.6V, Li-Ion, 60Ah

Battery format: cells

Sealant: silicone; it's necessary to consider how wiring and connections will be routed (not critical for now since we have the case)

Battery holders: thin textolite or 3D-printed

Note: Holders will most likely be custom printed in Luxembourg

---

**Charging**

Charger: for 12.6V battery

Power output (similar to a computer PSU)

We’ll use a Type-C output with a rubber-sealed cap.

For now, we’re using a cheap standard board. Yes, it’ll be more of a hassle, but we’re aware of that!

---

**Cooling (of what?)**

Cooling is a complex issue:

A direct air outlet from the case is undesirable due to transport conditions.

Proposed solution: design a false lid with air channels, USB cutouts, and intake/exhaust vents.

Fans are needed (preferably quiet ones).

Temperature control or a physical button on the false lid may be used.

Problem: the button might not be used unless automation is implemented.

Note: “Physik” may opt for passive cooling (aluminum heat sinks).

---

**Output Ports**

- At least one car charger socket
- Optionally, an XT-90 connector
- Opening for a power cable (similar to a PC power supply socket)
    
    [link]
    
- Type-C port with a rubber cap

---

**Tablets & Storage**

Note: all of this is still under discussion. This is just the first revision. Everything should be simple and inexpensive.

Mount for a single tablet (on the lid) — fixed, non-rotating, but removable

Two other tablets will be transported in the main compartment, without dedicated mounts (padding can be used)

Additional space should be reserved for extra needs

**Potential**

According to Arthur’s idea, a commercial prospect exists - mass production of cases for sale