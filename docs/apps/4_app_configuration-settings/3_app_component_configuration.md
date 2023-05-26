import DocCard from '@site/src/components/DocCard';

# Component configuration

## Inputs

Windmill supports multiple types of inputs. Inputs are used to configure the components and runnables.
We supports the following input types, as well as the corresponding array types:

- **Text**: a simple text input.
- **Text area**: a multi-line text input.
- **Number**: a number input.
- **Boolean**: a checkbox.
- **Date**: a date picker. The date format is `DD.MM.YYYY`.
- **Template**
- **Object**: a JSON editor.
- **Select**: a dropdown list.
- **Color**: a color picker. The color format is `#RRGGBB`.
- **Icon select**: a dropdown list with icons. The icons come from [Lucide](https://lucide.dev/).
- **Labeled resource**: a dropdown list with resources.

## Component with data source

Most of our componente need a data source to work. The data source can be a static value, connected to an output or the result of a attached runnable.

### Static data source

![Static data source](../../assets/apps/inputs/static-data-source.png)

Depending of the type of the data source, the input will be different. For example, if the type of the data source is `string`, the input will be a text input.

#### Learn more

<div class="grid grid-cols-2 gap-2 my-4">
	<DocCard
		title="Component Library"
		description="Find out the type of the data source of a component in the component library."
		href="/docs/apps/app_configuration-settings/app_component_library"
	/>
</div>

### Connected data source

The data source can be connected to any outputs.

![Disconnected data source](../../assets/apps/inputs/disconnected-data-source.png)
![Connected data source](../../assets/apps/inputs/connected-data-source.png)

#### Learn more

<div class="grid grid-cols-2 gap-2 my-4">
	<DocCard
		title="How to connect inputs to outputs"
		description="Learn how to connect inputs to outputs."
		href="/docs/apps/app_configuration-settings/app_component_library"
	/>
</div>

### Runnable data source

We can also use the result of a runnable as a data source.

![Runnable data source](../../assets/apps/inputs/undefined-runnable-data-source.png)
![Runnable data source](../../assets/apps/inputs/defined-runnable-data-source.png)

#### Learn more

<div class="grid grid-cols-2 gap-2 my-4">
	<DocCard
		title="Runnable triggers"
		description="Learn how to configure the triggers of the runnable."
		href="/docs/apps/app_configuration-settings/app_runnable_triggers"
	/>
</div>

### Template data source

We have a special type of input called template. A template is a special type of input where we can use variables. For example, if we have a variable `username` the context, we can use it in the template like this: `Hello ${ctx.username}}`.

The `Text` component has a template data source, and it replaces the static data source.

## Runnable inputs

If a runnable is attached to a component, the component will have a new section called `Runnable inputs`. This section contains all the inputs of the runnable.

In the same way as the component inputs, the runnable inputs can be static, connected to an output or the result of an evaluated template.

The type of the inputs are automatically inferred from the scripts. For example, for this TS script:

```ts
export async function main(mode: 'editor' | 'preview', name: string) {
	return mode;
}
```

The type of the input will be `select` with the values `editor` and `preview`, and the type of the input `name` will be `string`.

![Runnable inputs](../../assets/apps/inputs/static-runnable-input.png)
![Runnable inputs](../../assets/apps/inputs/connected-runnable-input.png)
![Runnable inputs](../../assets/apps/inputs/eval-runnable-input.png)

## Component configuration

Each component has a configuration section. This section contains all the configuration of the component.

![Component configuration](../../assets/apps/inputs/component-configuration.png)

#### Learn more

<div class="grid grid-cols-2 gap-2 my-4">
	<DocCard
		title="Component Library"
		description="Find out the configuration of each component in the component library."
		href="/docs/apps/app_configuration-settings/app_component_library"
	/>
</div>
