# Cache for Steps

Cache for steps allows you to cache the results of a step for a specified number of seconds, thereby reducing the need for redundant computations when re-running the same step with identical input.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    controls
    id="main-video"
    src="/videos/cache_for_steps.mp4"
/>

## How It Works

When you configure a step to use caching, Windmill stores the result of that step in a cache for the duration you specify (by default, 2 days). If the same step is re-triggered with the same input within this duration, Windmill instantly retrieves the cached result instead of re-computing it.

This feature can significantly improve the performance of your workflows, especially for steps that are computationally demanding or dependent on external resources, such as APIs or databases.

## Enabling Caching for Steps

You can enable caching for a step directly in the step configuration. Here's how you can do it:

1. **Select a step**: From the Flow Editor, select the step for which you want to cache the results.

2. **Enable Caching**: To enable caching, navigate to the `Advanced` menu and select `Cache`. Toggle it on and specify the desired duration for caching results (in seconds.)

![Caching result example](../assets/flows/cache_steps.gif)

In the above example, the result of step `a` will be cached for 86400 seconds (1 day). If `a` is re-triggered with the same input within this period, Windmill will immediately return the cached result.

## Conclusion

Caching is a powerful tool that can optimize your workflows in Windmill. By caching the results of steps, you can eliminate unnecessary computation and accelerate your workflows.

However, it's essential to use caching judiciously: while it can greatly enhance efficiency, overusing the cache or using it for unsuitable steps can result in outdated results or unwarranted memory usage. Always consider the nature of your step and the data it processes when deciding whether to enable caching.

:::tip Step Mocking

[Step mocking](./5_step_mocking.md) allows faster iteration. When a step is mocked, it will immediately return the mocked value without performing any computation.

:::