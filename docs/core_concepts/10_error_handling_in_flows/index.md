# Error Handling in Flows

Error in flows can be handled with two features.

## Retries

Steps within a flow can be re-tried in case of error for a given number of attempts and frequency.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/retries_example.mp4"
/>

<br/>


:::info

More details on our pages dedicated to [Retries](../../flows/14_retries.md).

:::

## Error Handler

The Error Handler is a special flow step that is executed when an error occurs in a flow.

If defined, the error handler will take as input, the result of the step that errored (which has its error in the 'error field').

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/error_handler.mp4"
/>

<br/>

:::info

More details on our pages dedicated to [Error Handlers](../../flows/7_flow_error_handler.md).

:::