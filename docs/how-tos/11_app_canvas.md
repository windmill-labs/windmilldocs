# App Canvas

The app canvas is the main area of the app editor. It displays the app components and allows you to configure them.
You can move and resize components and lock them to prevent them from being moved or resized by another component.

The apps are defined by two layouts: `Mobile` and `Desktop`. The layout can be toggled from the toolbar. Layouts are independent and can be configured separately.

## Header

The header has the following elements:

- A reload button to reload the app.
- A schedule button to schedule the app.
- On behalf of: The user on behalf of which the app is running.

## Canvas

### Positioning

Components can be positioned by dragging and dropping them on the canvas. You can also move components by clicking on the move handler on the top-right corner of the component.

![App moving](../assets/how_to/11_app_canvas/app-canvas-moving.mp4)

### Resizing

Components can be resized by dragging the resize handler on the bottom-right corner of the component.

### Component locking

A locked component can't be moved or resized by another component. It can still be moved or resized by the user.

:::info
Moving or moving a component will move all unlocked components on its way.
:::

### Component selection

Components can be selected by clicking on them. The selected component will be highlighted with a blue border.
