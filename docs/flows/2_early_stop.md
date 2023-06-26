# Early Stop / Break

If defined, at the end of the step, the predicate expression will be evaluated to decide if the flow should stop early.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/early_stop.mp4"
/>

<br/>

If stop early is run within a forloop, it will just break the for-loop and have it stop at that iteration instead of stopping the whole flow.

## Add Early Stop

- Pick the step you want to stop after.

- Go to `Advanced`, then `Early stop/Break`.

- Toggle on "Early stop or Break if condition met".

- Write the condition you want to stop on, based on the step's results.

- Optionally, toggle on "Label flow as "skipped" if stopped". Skipped flows are just a label useful to not see them in the [runs](../core_concepts/5_monitor_past_and_future_runs/index.md) page.
