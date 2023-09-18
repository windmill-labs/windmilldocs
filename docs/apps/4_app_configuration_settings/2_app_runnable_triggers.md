# Runnable Triggers

Runnables can be triggered by components from Windmill apps.

The settings panel on the right is composed of two sections:

- Runnable configuration
- Component configuration (if the selected item is a component)

## Runnable Configuration

The runnable configuration consists of:

- Hide refresh button: Some components have a refresh button. This can be hidden by checking this box.
- Transformer: A transformer is a function that alters the output of the runnable, often used to format the output.
- List of triggers: Configure whether the script runs on app start, app refresh, or whenever an input changes.

### Transformer

A transformer is an optional frontend script executed immediately after the component's script. It's used to perform lightweight transformations in the browser. It accepts the previous computation's result as `result`.

For instance, if component has a script that returns:

```js
{
	data: {
		name: 'John',
		age: 20
	}
}
```

A transformer could be used to extract the data object:

```js
return result.data;
```

## Runnable Execution

A component can have runnables attached to it. Depending on the component type, the runnables are executed at different times:

- **Data source**: The runnable's result is used as the component's data source. It executes on app start and app refresh. For instance, if the component is a table, the runnable's result is used as the table's data source.
- **Event handler**: The runnable executes when the event is triggered. For instance, if the component is a button, the runnable executes when the button is clicked.
- **Validations**: Only the `Stepper` component has validations. The runnable executes when the step of the stepper changes.

### Configure Triggers

#### Run on Start and App Refresh

Two types of runnables can be configured to run on app start and app refresh:

- **Background runnables**: Runnables that are run in the background and aren't attached to a component.
- **Component runnables used as data sources**: Runnables attached to a component and used as the component's data source.

### Recompute on Any Input Change

Runnables can be configured to recompute whenever an input changes. This is useful for recomputing a component's runnable when an input changes.

Two types of runnables can be configured to recompute on any input change:

- **Backend background runnables**: Background runnable that are executed on the server.
- **Component runnables used as data sources**: Runnables attached to a component and used as the component's data source.

Inputs of runnables that are either connected to an output or [evaluated](../3_app-runnable-panel.mdx#evals) can trigger a recompute. These are displayed in the `Change on value` section.

### Manual Dependencies

Frontend scripts don't have any inputs. However, you can manually specify a frontend script's dependencies. This is useful when you want to recompute a frontend script when an input changes.

Manual dependencies are found in the `Change on value` section and can be removed by clicking on the `x` button.
