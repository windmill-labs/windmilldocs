# Import Custom React Components

Windmill already provides over [sixty components](./4_app_configuration_settings/1_app_component_library.mdx) for its users, accessible with a simple drag-and-drop. For more control and standardization with your existing stack, you might want to import your own components in React.

:::info React & Windmill

If you're looking for a way to:

- Import whole react apps to Windmill, see [React App Import](../react_vue_svelte_apps/react.md).
- Integrate Windmill applications into React-based project, see [Windmill React SDK](../misc/15_react_sdk/index.md).

:::

Importing Custom React Components is a [Cloud and Self-Hosted-Enterprise-Only](/pricing) feature

Once imported to Windmill, custom React components will be able to interact with the rest of the app.

There are 3 main benefits of using your own components:

1. Reusing react components you've already written in other codebases.
2. Controlling fully the component including theming, inputs and outputs allowing for more complex components and interactions.
3. Embedding very complex components such as a code editor.

If that's not sufficient you can even [build your own app in React](../react_vue_svelte_apps/react.md).

## How to import react components to App Editor

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/LO83BKAe6zg?vq=hd1080"
	title="YouTube video player"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-xl object-cover w-full dark:border-gray-800"
></iframe>

<br/>

1. Clone the [template project](https://github.com/windmill-labs/windmill-custom-component-template).
2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to see the live result.

5. Start editing the `src/Component.tsx` file to start building your component.

6. Edit COMPONENT_NAME in `vite.config.ts` to match your component name. It will
   be useful later.

7. Build the IIFE using:

```bash
npm run build
```

8. Upload the `dist/cc.iife.js` to Windmill and name the component as it has been named in `vite.config.ts`.

![Custom component example](../../blog/2023-11-23-1-react-components/custom_example.png 'Custom component example')
