# CSS Editor

The Global CSS Editor is designed to give styling and theming across your entire app. This functionality offers a centralized location for defining, managing, and applying CSS rules. It's useful for ensuring consistent styling and for creating reusable themes.

The Global CSS Editor is a feature exclusive to [Enterprise Edition](../7_plans_details/index.mdx). However, users on the Community Edition can still access and experiment with this tool directly in the editor for evaluation purposes, although these changes will not be reflected in the app preview.

<video
  className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
  autoPlay
  controls
  src="/videos/global-css.mp4"
/>

## Class Identifiers

For a more granular control, specific classes have been added to each component. These class identifiers make it easier to target and globally style individual components across your app. Here are examples of classes, and are listed in the [Helper Block](#class-identifiers-helpers) as well:

- `wm-container`
- `wm-list`
- `wm-list-pagination`
- `wm-list-pagination-buttons`
- `wm-drawer`
- `wm-drawer-button`
- `wm-drawer-button-container`
- `wm-button`
- `wm-button-wrapper`
- `wm-button-container`

## Class identifiers helpers

In addition to the core features of the Global CSS Editor, the Helper Block is designed to assist you in the styling process. This searchable list of components provides quick access to all the class identifiers and CSS variables associated with each component. It also includes a convenient "Insert" button for each item, allowing you to quickly insert the class or variable into your CSS code.

<video
  className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
  controls
  src="/videos/css-helper-box.mp4"
/>

## How to Use the Helper Block

1. Search for Components: Use the search bar to quickly find the component you are interested in styling.
2. View Class Identifiers and Variables: Once you select a component, a list of its specific classes and modifiable CSS variables will be displayed.
3. Insert to Code: Next to each class and variable, there is an "Insert" button. Clicking this will automatically insert the relevant item into the code editor.

![Use helper](./use_helper.png 'Use helper')

## Migrating Component-Level Styles to Global CSS

In the Enterprise Edition of the Global CSS Editor, you can migrate component-level styles to the global level, streamlining the process of achieving consistent design across your application. This feature allows for two types of component-level styles to be migrated:

1. Navigate to the component whose styles you wish to migrate. Select the option to 'Move to CSS editor', which will open a modal window.

2. In the modal, you will see a list of all the CSS rules that can be moved to the global level. These are the styles you've previously set either for a specific component or for every component of a particular kind.

3. You can preview the css rules that will be migrated. If the class already exists in the global CSS, the rule will be appended to the existing class. If the class does not exist, it will be created.

4. Once you are satisfied with the changes, click the 'Migrate' button. This will move the styles to the global level and remove them from the component-level.

<video
  className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
  controls
  src="/videos/css-migration.mp4"
/>
