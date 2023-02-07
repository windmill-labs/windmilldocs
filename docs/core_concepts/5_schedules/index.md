---
id: schedule
title: Schedules
---

# Run on a schedule

Windmill allows you to define schedules for Scripts and Flows. Once a schedule
is defined, it will automatically run the script at the set frequency. Think of
it as an easy-to-use cron scheduler that you can share with other users.

A schedule consists of a Script/Flow, its script arguments, and a CRON
expression that controls the execution frequency (if you're confused with CRON
syntax make sure to use https://crontab.guru)

![Schedule](./schedule.png)

Once a schedule is defined, the next occurrence of the script will be listed on
the Runs page:

![Schedule](./schedule_next.png)

Schedules can be disabled from the Schedules page. Once disabled, the schedule
will not run the script anymore and will clear any upcoming run:

![Disable schedule](./schedule_disable.png)
