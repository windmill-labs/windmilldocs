# Windmill React SDK

The Windmill React SDK provides a suite of tools and components to integrate Windmill applications into React-based projects.

## Installation

Add the following to your project:

```js
'windmill-react-sdk': 'file:windmill-react-sdk-X.XXX.X.tgz'
```

:::tip Downloading the SDK

The SDK is not available on NPM. The SDK with be provided as a `.tgz` file.

:::

## Configuration

As Windmill is built with Svelte, you will need to add the Svelte compiler to your project.

### Using Vite

Add the following to your `vite.config.js`:

```js
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte(), react()]
});
```

An example is provided directly in the `windmill-react-sdk` repository.s

### Using Webpack 5 (Next.js)

You need to install `svelte-loader` and add the following to your `next.config.js`:

```js
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(svelte)$/,
			use: [
				{
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			]
		});

		return config;
	}
};

module.exports = nextConfig;
```

## Usage

### Authentication

```js
import { UserService } from 'windmill-client';

UserService.login({
	requestBody: { email: YOUR_EMAIL, password: YOUR_PASSWORD }
})
	.then(() => {
		// Handle successful login
	})
	.catch((error) => {
		// Handle login errors
	});
```

Replace YOUR_EMAIL and YOUR_PASSWORD with the corresponding values.

### App Preview

```jsx
import { AppPreview } from 'windmill-react-sdk';

function MyApp() {
	return <AppPreview workspace={YOUR_WORKSPACE} appPath={YOUR_APP_PATH} />;
}
```

Replace YOUR_WORKSPACE and YOUR_APP_PATH with the corresponding values.

### Example

We have a private repository with a Next.js example. [Contact us](../6_getting_help/index.mdx) for access.