# Overview

Windmill's App editor allows you to build internal applications. Windmill's App editor has the following major components:

- [Toolbar](./app_toolbar): configure app settings, toggle preview (desktop/mobile) and debug runs.
- [Outputs](./app_outputs): view all components outputs and context.
- [Canvas](./app_canvas): drag, drop and resize components on the canvas.
- [Component Library](./app_component_library): insert any component or modify the property or styling.
- [Runnable editor](./app-runnable): create, edit or manage the scripts or flows linked to components (Runnable), and background runnables.
- [Settings](./app_settings): configure the components settings.
- [Styling](./8_app_styling.md): set a custom style on a component and app-level.

![App Editor](../assets/apps/0_app_editor/plain-app-editor.png)

## App

An app is a collection of components. An app can be used to build a dashboard, a workflow, a form, a CRM, etc. An app is made of:

- **Components**: the components are the building blocks of an app. They can be used to display data, to perform actions, to create forms, etc. The components are displayed on a grid and can be nested in containers.
- **Runnables**: the runnables are the scripts or flows that are linked to components, or ran in the background. They are used to perform actions when a component is clicked, to fetch data, etc
