# Caching

Caching is used to cache the results of a script, flow, flow step or app inline scripts for a specified number of seconds, thereby reducing the need for redundant computations when re-running the same step with identical input.

When you configure caching, Windmill stores the result in a cache for the duration you specify. If the same runnable is re-triggered with the same input within this duration, Windmill instantly retrieves the cached result instead of re-computing it.

This feature can significantly improve the performance of your scripts & flows, especially for steps that are computationally demanding or dependent on external resources, such as APIs or databases.

## Cache scripts

Caching a script means caching the results of that script for a certain duration. If the script is triggered with the same inputs during the given duration, it will return the cached result.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    src="/videos/caching_script.mp4"
/>

<br/>

You can enable caching for a script directly in the script Settings. Here's how you can do it:

1. **Settings**: From the Script editor, pick the "Settings" menu an scroll to "Cache".

2. **Enable Caching**: To enable caching, toggle on "Cache the results for each possible inputs" and specify the desired duration for caching results (in seconds.)

In the above example, the result of step the script will be cached for 180 seconds (4 minutes). If `u/henri/slow_function___base_11` is re-triggered with the same input within this period, Windmill will immediately return the cached result.

## Cache flows

Caching a flow means caching the results of that flow for a certain duration. If the flow is triggered with the same flow inputs during the given duration, it will return the cached result.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    src="/videos/caching_flow.mp4"
/>

<br/>

You can enable caching for a flow directly in the flow settings. Here's how you can do it:

1. **Settings**: From the Flow editor, go to the "Settings" menu and pick the `Cache` tab.
2. **Enable Caching**: To enable caching, toggle on "Cache the results for each possible inputs" and specify the desired duration for caching results (in seconds.)

In the above example, the result of step the flow will be cached for 60 seconds. If `u/henri/example_flow_quickstart_no_slack` is re-triggered with the same input within this period, Windmill will immediately return the cached result.

## Cache flow steps

Caching a flow step means caching the results of that step for a certain duration. If the step is triggered with the same inputs during the given duration, it will return the cached result.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    src="/videos/cache_for_steps.mp4"
/>

<br/>

You can enable caching for a step directly in the step configuration. Here's how you can do it:

1. **Select a step**: From the Flow editor, select the step for which you want to cache the results.

2. **Enable Caching**: To enable caching, navigate to the `Advanced` menu and select `Cache`. Toggle it on and specify the desired duration for caching results (in seconds.)

![Caching result example](../../assets/flows/cache_steps.gif)

In the above example, the result of step `a` will be cached for 86400 seconds (1 day). If `a` is re-triggered with the same input within this period, Windmill will immediately return the cached result.

:::tip Step mocking / Pin result

[Step mocking / Pin result](../../flows/5_step_mocking.md) allows faster iteration. When a step is mocked, it will immediately return the mocked value without performing any computation.

:::

## Cache app inline scripts

Caching an app inline script means caching the results of that script for a certain duration. If the script is triggered with the same inputs during the given duration, it will return the cached result.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    src="/videos/caching_app.mp4"
/>

<br/>

You can enable caching for an app inline script directly its editor settings. Here's how you can do it:

1. **Settings**: From the Code editor, go to the top bar and pick the `Cache` tab.
2. **Enable Caching**: To enable caching, toggle on "Cache the results for each possible inputs" and specify the desired duration for caching results (in seconds.)

In the above example, the result of step the script will be cached for 5 minutes. If `Inline Script 0` is re-triggered with the same input within this period, Windmill will immediately return the cached result.