# Trigger

Triggers are special actions that run periodically given a schedule.
By default, adding a trigger will set the schedule to 15 minutes.

:::tip

Check an example on how to schedule flows [here](../getting_started/8_scheduling_scripts_flows/index.md).

:::

Used as a first step most commonly with a state and a schedule to watch for
changes on an external system, compute the diff since last time, set the new
state. The diffs are then treated one by one with a for-loop.