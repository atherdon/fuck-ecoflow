---
slug: /charging-station/tasks/power-core/power-core
---

# Power Core

Idea is simple.

- weight limitation(for dropping from a Vampire)
- from towing this case by hands
- modularity. instead of collecting batteries in my hands and building a whole box as a standalone product
- we just building an empty case with a powercore and all the wires

So imagine this - we want to have a huge charging station that weights 20 kg. But its impossible to deliver via a drone. So with one flight we can drop a case, with all wires inside and separtate deliver will be just batteries, wrapped in some packaging, for preventing them getting damaged.

Having a powercore with 8-10 xt60 ports inside the case will help us to be modular, be expandable, and be able to replace the batteries, when they die off.

---

Instead of trying to write an engineering specification directly, start by creating a **Product Vision Specification**. Engineers can later convert it into a technical design.

A structure like this usually works well:

# 1. Problem Statement

What problem does the device solve?

Example:

> Small engineering teams spend too much time searching for information, documenting work, coordinating tasks, and onboarding new members. Knowledge becomes fragmented across chats, documents, repositories, and personal notes.
> 

---

# 2. Vision

What is the ideal future?

Example:

> Build a "Smart Engineer" device that acts like an experienced engineering teammate. It continuously gathers information, maintains context, assists with design decisions, creates documentation, coordinates work, and helps engineers complete tasks faster.
> 

---

# 3. User Types

Who uses it?

| User | Description |
| --- | --- |
| Engineer | Daily technical user |
| Team Lead | Planning and oversight |
| Project Manager | Task coordination |
| New Team Member | Onboarding and learning |
| Operator | Maintains the system |

---

# 4. Core Capabilities

Describe capabilities, not implementation.

Example:

### Knowledge Capture

The system should:

- record conversations
- collect documents
- index technical information
- remember project history
- build organizational knowledge

### Engineering Assistant

The system should:

- answer technical questions
- explain existing systems
- find relevant documents
- suggest solutions
- identify risks

### Documentation

The system should:

- generate documentation automatically
- create diagrams
- update specifications
- summarize meetings

### Task Support

The system should:

- track ongoing work
- suggest next actions
- identify blockers
- monitor deadlines

---

# 5. Example Scenarios

These are incredibly valuable.

### Scenario 1

Engineer asks:

> Why was Drone Power Board V3 redesigned?
> 

System answers:

> Version V2 experienced overheating issues in MOSFET section during charging. Design review from March 2026 recommended component replacement and layout modifications.
> 

---

### Scenario 2

New engineer asks:

> Explain the FPV battery testing process.
> 

System provides:

- process description
- diagrams
- test results
- related documentation

---

# 6. Inputs

What information can enter the system?

Examples:

- voice conversations
- documents
- PDFs
- CAD files
- Git repositories
- Jira tickets
- emails
- chat logs
- sensor data
- photos
- videos

---

# 7. Outputs

What should the system produce?

Examples:

- answers
- reports
- diagrams
- technical documentation
- task recommendations
- alerts
- summaries
- engineering calculations

---

# 8. Success Metrics

How do we know it works?

Examples:

- 50% reduction in onboarding time
- 30% less engineering documentation effort
- answers returned within 10 seconds
- 90% of historical project information searchable

---

# 9. Constraints

Examples:

- works offline
- runs on local hardware
- military-grade security
- low power consumption
- multilingual support
- no cloud dependency

---

# 10. Future Vision

What does Version 5 look like?

Example:

> The Smart Engineer evolves into a persistent digital team member that participates in meetings, maintains technical memory, tracks projects, creates documentation, and proactively identifies engineering risks.
> 

---

---

![image.png](image.png)

---

An engineer looking at this sees:

- copper bus bars
- current distribution ring
- XT60 outputs
- XT30 auxiliary outputs
- wire gauge
- connector placement
- thermal considerations
- manufacturability

A manager should instead describe:

> Why does this board exist?
> 
> 
> What problem does it solve?
> 
> What requirements must it satisfy?
> 

The engineer then decides whether the answer is a copper ring, PCB, busbar assembly, laminated conductor, etc.

For example, if your vision is related to this power board, your specification should look more like:

---

# Smart Power Distribution Module

## Purpose

Provide a compact and reliable method of distributing power from a large battery pack to multiple drone subsystems.

---

## Problem

Current field solutions require manually soldered power splits.

These solutions:

- are difficult to assemble
- vary in quality
- are difficult to repair
- increase failure risk
- are not standardized

---

## Functional Requirements

### Power Input

The device shall accept power from:

- 6S–14S battery systems
- 20V–60V operating range

### Power Distribution

The device shall provide:

- 6 primary XT60 outputs
- 3 auxiliary XT30 outputs

### Current Capability

The device shall support:

- 200A continuous current
- 350A peak current for 30 seconds

### Environmental

The device shall operate:

- -20°C to +50°C
- in dusty environments
- in high vibration environments

### Serviceability

The device shall allow:

- visual inspection
- connector replacement
- field repair

---

## Success Criteria

The device is considered successful when:

- assembly time is reduced by 75%
- field failures are reduced by 50%
- average repair time is less than 10 minutes

---

---

# Modular Drone-Deployed Power Station

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

# Problem Statement

Current field charging stations are built as monolithic systems.

These systems create several challenges:

- excessive delivery weight
- difficult transportation
- inability to replace failed batteries quickly
- poor scalability
- complicated maintenance

Large drone platforms often cannot deliver a fully assembled charging station in a single flight.

---

# Concept

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

# Functional Requirements

## Weight

Power Core weight should be minimized to allow drone deployment.

Target:

- less than 5 kg without batteries

Maximum:

- compatible with Vampire drone payload limitations

---

## Battery Connectivity

The system shall support:

- 8–10 XT60 battery inputs
- hot-swappable battery replacement
- independent battery connection/disconnection

---

## Modularity

The system shall allow:

- operation with any number of connected batteries
- battery replacement without rebuilding the system
- future expansion through additional battery ports

---

## Field Serviceability

The system shall be maintainable by personnel with basic technical skills.

Components requiring replacement:

- cables
- connectors
- battery modules
- charging units

No soldering should be required for routine maintenance.

---

## Transportation

The system shall be transportable in multiple deliveries.

Example deployment:

Flight 1:

- Power Core case

Flight 2:

- Battery modules

Flight 3:

- Additional batteries or charging equipment

---

# Example Deployment Scenario

A frontline position requires a 20 kg charging station.

Instead of delivering a single 20 kg assembly:

1. A drone delivers the Power Core.
2. Batteries are delivered separately.
3. Operators connect available batteries.
4. Capacity grows as additional battery modules arrive.
5. Failed batteries are replaced individually without replacing the entire station.

---

# Design Principles

1. Modular rather than monolithic.
2. Field repairable.
3. Drone deployable.
4. Expandable capacity.
5. Replaceable battery modules.
6. Minimal assembly time.
7. Compatible with existing XT60 battery ecosystem.

---

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
  ┌──────────────────┐
  │  Energy Storage  │
  │    Battery Bank  │
  └────────┬─────────┘
           │
           ▼
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