---
title: Modular Drone-Deployed Power Station
sidebar_label: Modular power station
sidebar_position: 4
slug: /charging-station/tasks/power-core/modular-drone-deployed-power-station
description: A modular charging station that can be dropped from a drone, with a power core and separate battery modules.
---

# Modular Drone-Deployed Power Station

[Back to Power Core](./Power%20Core.md)

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Concept](#concept)
- [Functional Requirements](#functional-requirements)
- [Example Deployment Scenario](#example-deployment-scenario)
- [Design Principles](#design-principles)

## Overview

The Modular Drone-Deployed Power Station is a lightweight power distribution platform designed for delivery by large logistics drones.

Instead of transporting a complete 20 kg charging station as a single unit, the system separates the infrastructure from the energy storage components.

The system consists of:

- a reusable power distribution case ("Power Core")
- removable battery modules
- charging equipment
- power conversion equipment
- field-replaceable cables and connectors

This approach allows batteries to be transported separately, reducing payload constraints and improving logistical flexibility.

---

## Problem Statement

Current field charging stations are built as monolithic systems.

These systems create several challenges:

- excessive delivery weight
- difficult transportation
- inability to replace failed batteries quickly
- poor scalability
- complicated maintenance

Large drone platforms often cannot deliver a fully assembled charging station in a single flight.

---

## Concept

The charging station is divided into two independent elements:

### Power Core

A lightweight case containing:

- power distribution bus
- power management hardware
- charging electronics
- wiring infrastructure
- connector interfaces

The Power Core contains little or no battery capacity.

### Battery Modules

Battery modules are transported separately and connected in the field.

Advantages:

- batteries can be delivered incrementally
- damaged batteries can be replaced individually
- capacity can be increased without redesigning the station
- logistics become more flexible

---

## Functional Requirements

### Weight

Power Core weight should be minimized to allow drone deployment.

Target:

- less than 5 kg without batteries

Maximum:

- compatible with Vampire drone payload limitations

---

### Battery Connectivity

The system shall support:

- 8–10 XT60 battery inputs
- hot-swappable battery replacement
- independent battery connection/disconnection

---

### Modularity

The system shall allow:

- operation with any number of connected batteries
- battery replacement without rebuilding the system
- future expansion through additional battery ports

---

### Field Serviceability

The system shall be maintainable by personnel with basic technical skills.

Components requiring replacement:

- cables
- connectors
- battery modules
- charging units

No soldering should be required for routine maintenance.

---

### Transportation

The system shall be transportable in multiple deliveries.

Example deployment:

Flight 1:

- Power Core case

Flight 2:

- Battery modules

Flight 3:

- Additional batteries or charging equipment

---

## Example Deployment Scenario

A frontline position requires a 20 kg charging station.

Instead of delivering a single 20 kg assembly:

1. A drone delivers the Power Core.
2. Batteries are delivered separately.
3. Operators connect available batteries.
4. Capacity grows as additional battery modules arrive.
5. Failed batteries are replaced individually without replacing the entire station.

---

## Design Principles

1. Modular rather than monolithic.
2. Field repairable.
3. Drone deployable.
4. Expandable capacity.
5. Replaceable battery modules.
6. Minimal assembly time.
7. Compatible with existing XT60 battery ecosystem.

---

:::note

One thing I'd add, because engineers will immediately ask it:

**What is the actual mission?**

For example:

- Charge FPV batteries?
- Power Starlink?
- Run radios?
- Run laptops?
- Operate EW equipment?
- Charge multiple systems simultaneously?

That mission statement will drive almost every engineering decision (voltage, current, cooling, connector type, wire gauge, converter selection, etc.). The clearer that section is, the better the resulting design will be.

:::

```
┌─────────────────────┐
│   AC/DC Adapter     │
│  (Laptop PSU / GaN) │
└──────────┬──────────┘
│ DC Input
▼
┌──────────────────────────────────────┐
│            POWER CORE                │
│                                      │
│  • Power Distribution PCB            │
│  • Battery Management Logic          │
│  • Charge Balancing                  │
│  • XT60 Battery Ports (8-10x)        │
│                                      │
└───────┬───────────────┬──────────────┘
│               │
│ Charge        │ Charge
▼               ▼

┌─────────────┐   ┌─────────────┐
│ FPV Battery │   │ FPV Battery │
│    #1       │   │    #2       │
└──────┬──────┘   └──────┬──────┘
│                 │
└────────┬────────┘
│
▼
```

```
  ┌──────────────────┐
  │  Energy Storage  │
  │    Battery Bank  │
  └────────┬─────────┘
           │
           ▼
```

```
┌─────────────────────────────┐
│ HOTA USB-C GaN Hub          │
│                             │
│ USB-C PD Outputs            │
│ USB-A Outputs               │
│ Fast Charging Devices       │
└───────┬─────────┬───────────┘
│         │
▼         ▼

Laptop      Radio
Tablet      Starlink
Phone       Drone Gear
```
