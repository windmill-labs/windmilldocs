# Runnables

On the bottom of the app editor, you can find the runnable editor. It allows you to create, edit or manage the scripts or flows linked to components (Runnable), and background runnables .

They are 4 types of runnables:

- **Inline scripts**: scripts that are defined on the app editor, linked to a component.
- **Workspace/Hub**: runnables (scripts; flows) linked to a component, but defined in the workspace or the Hub.
- **Background runnables**: runnables that are not linked to a component, but run in the background.
- **Frontend scripts**: script can be used to manipulate the client app state. They can either be linked to a component or be a background runnable. If they are a background runnable, they are not executed unless manually set to run when the app starts or reloads.

## Component runnable

A component can have a **Runnable** attached to it. The runnable is a script or flow that is executed when the component is clicked or loaded. For example, a button can have a runnable linked to it. When the button is clicked, the runnable is executed. For a table, the runnable is executed when the table is loaded.

### Triggered by

A component can be triggered by:

#### Events:

- **Click**: the runnable is executed when the component is clicked:
  Three components can be triggered by a click event:
  - [Buttons](./app_component_library#button)
  - [Forms](./app_component_library#form)
  - [Modal forms](./app_component_library#form-modal)
- **Start**: the runnable is executed when the component is loaded
- **Refresh**: the runnable is executed when the app is refreshed.

#### Recompute

Other component can trigger a component to recompute. For example, a button can trigger a table to recompute. When the button is clicked, the table is reloaded.
See [Recompute Others](./app-runnable#recompute-others) for more information.

#### Changes of values:

When a runnable has an input connected to an output of a component, the runnable is executed when the output value changes. See [Connections](./app_outputs#connecting-inputs) for more information.

#### Background runnable

Background runnables are triggered upon global refresh or when their input changes. The result of a background runnable can be shared among many components. They are not linked to a specific component.

You can disable the automatic execution on app start and refresh by unchecking the `Run on start and app refresh` checkbox.
You may want to disable this so that the background runnable is only triggered by changes to other values or triggered by another computation on a button (See 'Recompute Others')

Background runnables executed on the server can also disable the automatic execution when an input value changes by checking the `do NOT recompute on input changes` checkbox.

#### Frontend script

Frontend scripts are backgroud runnable executed in the browser and can manipulate the app context directly.
See [Frontend scripts](./app-runnable#frontend-scripts) for more information.

:::info Frontend scripts
Dependencies for frontend scripts are not automatically detected. You need to manually add the dependencies in the `Trigger by` section.

<br/>
It is necessary to add the dependencies manually because the frontend scripts are not executed in the same context as the app. The frontend scripts are executed in the context of the browser, and the app is executed in the context of the server.
:::

### Recompute others

`Button` and `Form` components can trigger other components to recompute. For example, a button can trigger a table to recompute. When the button is clicked, the table is reloaded.

## Policy

A viewer of the app will execute the runnables of the app on behalf of the publisher avoiding the risk that a resource or script would not be available to the viewer. To guarantee tight security, a policy is computed at time of saving of the app which only allow the scripts/flows referred to in the app to be called on behalf of. Furthermore, static parameters are not overridable. Hence, users will only be able to use the app as intended by the publisher without risk for leaking resources not used in the app.
