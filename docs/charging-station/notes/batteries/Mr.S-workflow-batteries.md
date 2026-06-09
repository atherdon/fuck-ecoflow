# Сьорд воркфлоу batteries

Created: July 16, 2025 5:31 PM

I am learning more about testing used 18650 cells

My workflow for batteries above +/- 2 volt

1. charge and write voltage on battery
2. discharge and write capacity on battery
3. charge
4. Let cells rest for a couple of days.
5. If voltage is dropped by more than 0.1 volt throw away cell

My workflow for batteries below +/- 2 volt

1. add energy by connecting to another cell in parallel for 20 seconds
2. charge at 0.1 Ah for 2 hours
3. charge at 0.5 Ah for 2 hours
4. charge and write voltage on battery
5. discharge and write capacity on battery
6. charge
7. Let cells rest for a couple of days.
8. If voltage is dropped by more than 0.1 volt throw away cell

I checked the workflows with [https://t.me/print_power_team](https://t.me/print_power_team). They did one minor tweak.