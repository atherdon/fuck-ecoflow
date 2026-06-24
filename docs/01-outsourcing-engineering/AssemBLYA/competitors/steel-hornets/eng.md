---
slug: /outsourcing-engineering/assemblya/competitors/steel-hornets/eng
title: Steel Hornets Installation Guide
sidebar_label: English Guide
sidebar_position: 50
---

# Installation and Setup Instructions

## FPV-DS3 Release Mechanism by Steel Hornets

### 1. Power Connection

The release mechanism has a built-in 6S-to-5V BEC.

* Solder the **brown wire** to the **negative (-)** battery input on the ESC.
* Solder the **red wire** to the **positive (+)** battery input on the ESC.
* Ideally, if you do not have a high-power soldering iron, solder directly to the terminals of the input capacitor.

---

### 2. Signal Wire Connection

The **yellow signal wire** should be connected to a flight controller (FC) output that provides a processor timer signal.

Recommended outputs:

* MOTOR 5–8

If these outputs are unavailable, connect to an unused:

* SERIAL_TX port

provided it is not already used for:

* RC Receiver (RX)
* Video Transmitter (VTX)
* GPS
* Other peripherals

**IMPORTANT!**

Be careful when connecting to an **LED_STRIP** output. Some firmware versions control this output not only through AUX commands but also through internal firmware logic. In such cases, the release mechanism must **not** be connected to the LED_STRIP output.

As a last resort, the PWM signal may be connected to a **Crossfire receiver PWM output**, if Crossfire is used on your drone.

---

### 3. Flight Controller Configuration

Configure the flight controller according to the procedure shown in the following video:

[https://www.youtube.com/watch?v=jiD6aC0l1VQ](https://www.youtube.com/watch?v=jiD6aC0l1VQ)

---

### 4. Radio Switch Setup

Configure a three-position switch on your transmitter:

* **Center position:** PWM = 1500 μs → both warheads remain locked.
* **Position 1:** PWM = 1000 μs → releases the first payload.
* **Position 2:** PWM = 2000 μs → releases the second payload.

---

### 5. PWM Range Requirements

**IMPORTANT!!!**

The release mechanism is designed for the standard PWM range:

* 1000–2000 μs
* (-100% to +100%)

If your transmitter is configured to output values below -100% or above +100%, the servo and release mechanism may be damaged.

---

### 6. Loading the Release Mechanism

To arm/load the release mechanism:

1. Manually move the lever for each payload position to its end stop.
2. Insert the payload bracket.
3. Release the lever.

The lever should fully close, indicating that the bracket lock has engaged.

If the lock does not fully close, modify the bracket as described below.

It is acceptable to assist the lock manually with slight force if necessary.

---

### 6.1 Bracket Inspection

**IMPORTANT!!!**

Inspect every payload bracket after 3D printing for flash, burrs, or excess material.

Remove any defects if present.

The brackets should fully lock under spring force before the loading lever reaches the end of its travel.

Always verify proper locking manually.

**IMPORTANT!!!!**

The release mechanism does **not clamp** the payload bracket.

Instead, it **hooks onto** the T-shaped profile located on the top of the payload bracket.

---

### 7. Connection Safety

**IMPORTANT!!!**

Never connect or disconnect the release mechanism from:

* the drone,
* a servo tester,
* or any other device generating a PWM signal

while the battery is connected.

Do not use connectors between the release mechanism and the drone.

Failure to follow these requirements may damage:

* the release mechanism,
* the flight controller,
* or other connected devices.

---

### 8. ESC Capacitor Requirements

**IMPORTANT!!!**

It is strongly recommended to verify that your ESC is equipped with a genuine **low-ESR capacitor** with the shortest possible lead length.

Recently, many manufacturers have reduced costs by:

* using lower-quality capacitors,
* leaving capacitor leads excessively long.

This may cause failure of the BEC board inside the release mechanism.

---

### Drone Mounting

Installation on the drone is performed using a proprietary aluminum mounting bracket designed for the specific frame type.

Use the included:

* **4 × M4×8 screws**

to attach the release mechanism to the drone.
