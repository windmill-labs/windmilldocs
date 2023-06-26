# Error Handling in Flows

There are three ways to handle errors in Windmill flows: [retries](../../flows/14_retries.md), [error handlers](../../flows/7_flow_error_handler.md), and [early stop/break](../../flows/2_early_stop.md).

## Retries

Steps within a flow can be retried a specified number of times and at a defined frequency in case of an error.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/retries_example.mp4"
/>

<br/>

> Example of a flow step giving error if random number = 0 and re-trying 5 times

<br/>

:::info

For more details on retries, please refer to our dedicated [Retries documentation](../../flows/14_retries.md).

:::

## Error Handler

The Error Handler is a special flow step that is executed when an error occurs within a flow.

If defined, the error handler will take as input, the result of the step that errored (which has its error in the 'error field').

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/error_handler.mp4"
/>

<br/>

:::info

For more details on error handlers, please refer to our dedicated [Error Handlers documentation](../../flows/7_flow_error_handler.md).

:::

## Early Stop / Break

The Early Stop/Break feature allows you to define a predicate expression that determines whether the flow should stop early at the end of a step.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/early_stop.mp4"
/>

<br/>

:::info

For more details on early stop/break, please refer to our dedicated [Early Stop / Break documentation](../../flows/2_early_stop.md).

:::
