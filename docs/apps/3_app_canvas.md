# Canvas

The app canvas is the main area of the app editor. It displays the app components and allows you to configure them.
You can move and resize components and lock them to prevent them from being moved or resized by another component.

The apps are defined by two layouts: `Mobile` and `Desktop`. The layout can be toggled from the toolbar. Layouts are independent and can be configured separately.

## Header

The header has the following elements:

- a reload button to reload the app
- a schedule button to schedule the app
- on behalf of: the user on behalf of which the app is running

## Canvas

### Positioning

Components can be positioned by dragging and dropping them on the canvas. You can also move components by clicking on the move handler on the top-right corner of the component.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/component-moving.mp4"
/>

### Resizing

Components can be resized by dragging the resize handler on the top-right corner of the component.

### Component locking

A locked component can't be moved or resized by another component. It can still be moved or resized by the user.

:::info
Moving or moving a component will move all unlocked components on its way.
:::

### Component selection

Components can be selected by clicking on them. The selected component will be highlighted with a indigo border.
When hovering a component, a blue border will be displayed around the component.

### Expand a component

Components can be expanded by clicking on the expand button on the top-right corner of the component. It will try to expand the component to take as much width as possible and at most 12 columns of height, taking into account the other components on the canvas.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/component-expand.mp4"
/>
