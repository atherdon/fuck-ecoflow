# Інструкція зі встановлення та налаштування скиду FPV-DS3 від «Steel Hornets»

## 1. Підключення BEC та живлення

Скид має вбудований BEC 6s - 5V. Коричневий та червоний проводи паяються напряму до входу батареї на ESC:
- **Коричневий провід** → `-` (мінус)
- **Червоний провід** → `+` (плюс)

> **Порада:** В ідеалі, якщо не є потужного паяльника, паяйте до виводів конденсатора на вході.

## 2. Підключення сигнального проводу

Жовтий сигнальний провід паяється до виходу ПК (польотного контролеру) з таймером процесора.

**Рекомендовані виводи (в порядку переваги):**
1. **MOTOR 5 - MOTOR 8** (в ідеалі)
2. **SERIAL_TX X** (які не задіяні для обміну з RC Rx, Video Tx, GPS або іншими пристроями)
3. **PWM вихід приймача Crossfire** (крайній випадок)

> **⚠️ ВАЖЛИВО:** Не підключайте скид до виходу **LED_STRIP X**! У деяких прошивках цей вихід керується не тільки по команді з AUX, але й за внутрішніми алгоритмами, що може вивести скид з ладу.

## 3. Налаштування в польотному контролері

Налаштування виконуються за принципом, показаним у відео:
📺 [Посилання на відео налаштування](https://www.youtube.com/watch?v=jiD6aC0l1VQ)

## 4. Налаштування тумблера на пульті

Тумблер потрібно налаштувати з такою логікою:

| Положення | PWM | Стан |
|-----------|-----|------|
| Центральне | 1500 µs | Обидві БЧ закриті |
| Мінімум | 1000 µs | Відкриття замку першої БЧ |
| Максимум | 2000 µs | Відкриття замку другої БЧ |

## 5. Діапазон PWM

> **⚠️ ВАЖЛИВО (!!!)** Скид розрахований на стандартний за замовчуванням діапазон PWM **1000-2000 µs** (-100% - +100%).

Якщо у вас в налаштуваннях апаратури буде менше -100% або більше +100%, ви можете вивести серво-привід та скид з ладу!

## 6. Процес заряджання скиду

1. Рукою зсунути важіль для кожної БЧ по черзі до краю
2. Вставити кронштейн з БЧ
3. Відпустити важіль — він має повністю закритися до кінця
4. Замок кронштейну повинен замкнутися, що буде свідчити про готовність

> **Порада:** Якщо замок повністю не закривається, допускається дозачинення замку вручну приклавши незначне зусилля.

### Підготовка кронштейнів

> **⚠️ ВАЖЛИВО (!!!)** 
> - Кожен кронштейн для БЧ потрібно перевірити на наявність облою після 3D друку і видалити його за необхідності
> - Кронштейни мають замикатися пружиною скиду до кінця ходу ручки заряджання
> - Замикання кронштейнів потрібно перевірити вручну

### Механізм утримання

> **⚠️ ВАЖЛИВО (!!!!)** 
> Скид **НЕ ЗАТИСКАЄ** кронштейн БЧ, а **ПІДХОПЛЮЄ** його за T-образний профіль зверху кронштейну БЧ.

## 7. Безпека при підключенні/відключенні

> **⚠️ ВАЖЛИВО (!!!)** 
> Не можна підключати/відключати скид до/від дрону (або сервотестеру чи іншому пристрою, який видає сигнал PWM) **під час його живлення**.
>
> Можна використовувати роз'єми між скидом та дроном. Порушення цієї вимоги може призвести до виходу з ладу як скиду, так і польотного контролеру чи іншого пристрою.

## 8. Конденсатор на ESC

> **⚠️ ВАЖЛИВО (!!!)** 
> Рекомендую переконатися, що у вас на ESC стоїть **lowESR конденсатор** з мінімальною довжиною ніжок.
>
> Багато виробників останнім часом економлять як на конденсаторах, так і на операції по обкусуванню їх ніжок. Це може вивести з ладу плату BEC всередині скиду.

## 9. Монтаж на дрон

Монтаж виконується за допомогою **пропрієтарного алюмінієвого кронштейну** (під кожен тип рами):
- **Кількість вісків:** 4 шт. М4×8
- **Матеріал вісків:** Включені в комплект

---

**Версія документації:** 1.0  
**Дата останнього оновлення:** 2026-06-21


-----


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
