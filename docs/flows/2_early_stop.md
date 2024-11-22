# Early stop / Break

If defined, at the end or before a step, the predicate expression will be evaluated to decide if the flow should stop early.

## Early stop for step

For each step of the flow, an early stop can be defined. The result of the step will be compared to a previously defined predicate expression, and if the condition is met, the flow will stop after that step.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    src="/videos/early_stop.mp4"
/>

<br/>

- Pick the step you want to stop after.

- Go to `Advanced`, then `Early stop/Break`.

- Toggle on "Early stop or Break if condition met".

- Write the condition you want to stop on, based on the step's results.

- Optionally, toggle on "Label flow as "skipped" if stopped". Skipped flows are just a label useful to not see them in the [runs](../core_concepts/5_monitor_past_and_future_runs/index.mdx) page.

If stop early is run within a forloop, it will just break the for-loop and have it stop at that iteration instead of stopping the whole flow.

## Early stop for flow

To stop early the flow based on the flow inputs, you can set an "Early stop" from the flow settings. If the inputs meet the predefined condition, the flow will not run.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    src="/videos/early_stop_flow.mp4"
/>