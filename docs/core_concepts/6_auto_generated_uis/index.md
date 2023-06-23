# Auto-Generated UIs

Windmill automatically generates user interfaces (UIs) for scripts and flows based on their parameters.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/auto_generated_uis.mp4"
/>

<br/>

:::info Windmill App Editor

To customize UIs and interactions for your scripts and flows, explore Windmill's **[App editor](../../getting_started/7_apps_quickstart/index.md)**, providing a comprehensive solution.

:::

By analyzing the parameters of the main function, Windmill generates an input specification for the script or flow in the [JSON Schema](https://json-schema.org/) format. Windmill then renders the UI for the Script or Flow from that specification.

You don't need to directly interact with the JSON Schema associated with the Script or Flow. It is the result of the analysis of the script parameters of the main function and the optional UI customization.

In the UI customization interface, you can refine information that couldn't be inferred directly from the parameters, such as specifying string enums or restricting lists to numbers. You can also add helpful descriptions to each field.

![Customize inputs](./customize_inputs.png)

> The inputs' positions and properties can be customized

<br/>

:::tip

This feature can be directly used in the [script](../../getting_started/0_scripts_quickstart/index.md) & [flow](../../getting_started/6_flows_quickstart/index.md) editors to test your code.

<br/>

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    loop
    controls
    id="main-video"
    src="/videos/ui_from_script_editor.mp4"
/>

:::