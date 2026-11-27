---
title: Product Vision Specification
sidebar_label: Product vision
sidebar_position: 2
slug: /charging-station/tasks/power-core/power-core-product-vision
description: Product vision notes collected with the Power Core, including a Smart Engineer example.
---

# Product Vision Specification

[Back to Power Core](./Power%20Core.md)

Instead of trying to write an engineering specification directly, start by creating a **Product Vision Specification**. Engineers can later convert it into a technical design.

A structure like this usually works well:

- [1. Problem Statement](#1-problem-statement)
- [2. Vision](#2-vision)
- [3. User Types](#3-user-types)
- [4. Core Capabilities](#4-core-capabilities)
- [5. Example Scenarios](#5-example-scenarios)
- [6. Inputs](#6-inputs)
- [7. Outputs](#7-outputs)
- [8. Success Metrics](#8-success-metrics)
- [9. Constraints](#9-constraints)
- [10. Future Vision](#10-future-vision)

## 1. Problem Statement {#1-problem-statement}

What problem does the device solve?

Example:

> Small engineering teams spend too much time searching for information, documenting work, coordinating tasks, and onboarding new members. Knowledge becomes fragmented across chats, documents, repositories, and personal notes.
> 

---

## 2. Vision {#2-vision}

What is the ideal future?

Example:

> Build a "Smart Engineer" device that acts like an experienced engineering teammate. It continuously gathers information, maintains context, assists with design decisions, creates documentation, coordinates work, and helps engineers complete tasks faster.
> 

---

## 3. User Types {#3-user-types}

Who uses it?

| User | Description |
| --- | --- |
| Engineer | Daily technical user |
| Team Lead | Planning and oversight |
| Project Manager | Task coordination |
| New Team Member | Onboarding and learning |
| Operator | Maintains the system |

---

## 4. Core Capabilities {#4-core-capabilities}

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

## 5. Example Scenarios {#5-example-scenarios}

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

## 6. Inputs {#6-inputs}

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

## 7. Outputs {#7-outputs}

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

## 8. Success Metrics {#8-success-metrics}

How do we know it works?

Examples:

- 50% reduction in onboarding time
- 30% less engineering documentation effort
- answers returned within 10 seconds
- 90% of historical project information searchable

---

## 9. Constraints {#9-constraints}

Examples:

- works offline
- runs on local hardware
- military-grade security
- low power consumption
- multilingual support
- no cloud dependency

---

## 10. Future Vision {#10-future-vision}

What does Version 5 look like?

Example:

> The Smart Engineer evolves into a persistent digital team member that participates in meetings, maintains technical memory, tracks projects, creates documentation, and proactively identifies engineering risks.
>
