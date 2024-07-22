# For Loops

For Loops is a special type of steps that allows you to iterate over a list of items, given by an iterator expression.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/flow-loop.mp4"
/>

<br/>

## Configuration options

Clicking on the `For loop` step on the mini-map, it will open the `For loop` step editor.
There are 4 configuration options:

### Iterator expression

The [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators) that will be evaluated to get the list of items to iterate over. You can also [connect with a previous result](./16_architecture.mdx) that contain several items, it will iterate over all of them.

It can be pre-filled automatically by [Windmill AI](../core_concepts/22_ai_generation/index.mdx) from flow context:

<video
className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
controls
src="/videos/iterator_prefill.mp4"
/>

### Skip failure

If set to `true`, the loop will continue to the next item even if the current item failed.

### Run in parallel

Iif set to `true`, all iterations will be run in parallel.

### Parallelism

Assign a maximum number of branches run in parallel to control huge for-loops.

![For loop step](../assets/flows/flow_for_loop.png.webp "For loop step")

## Iterate on Steps

Steps within the flow can use both the iteration index and value. For example with iterator expression `["Paris", "Lausanne", "Lille"]`, for iteration index "1", "Lausanne" is the value.

![Iter value & index](../assets/flows/iter_value_index.png.webp "Iter value & index")

When a flow has been run or tested, you can inspect the details (arguments, logs, results) of each iteration directly from the graph. The forloop detail page lists every iteration status, even if you have a thousand one without having to load them all.

<video
className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
controls
src="/videos/inspect_iteration.mp4"
/>