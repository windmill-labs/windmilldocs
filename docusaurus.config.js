// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'windmill.dev',
	tagline: 'Quickly turn scripts into internal apps',
	url: 'https://windmill.dev',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/logo.svg',
	organizationName: 'windmill', // Usually your GitHub org/user name.
	projectName: 'windmill',
	plugins: ['docusaurus-tailwindcss'],
	presets: [
		[
			'docusaurus-preset-openapi',
			// ... other options
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				api: {
					path: 'openapi.yaml',
					routeBasePath: 'openapi'
				},
				docs: {
					sidebarPath: require.resolve('./sidebars.js')
				},
				blog: {
					showReadingTime: true
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css')
				}
			})
		]
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'windmill.dev',
				logo: {
					alt: 'windmill.dev logo',
					src: 'img/windmill.svg'
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Docs'
					},
					{
						href: '/openapi',
						position: 'left',
						label: 'OpenAPI'
					},
					{
						href: '/python',
						position: 'left',
						label: 'Python Client'
					}
					// { to: '/blog', label: 'Blog', position: 'left' },
					// {
					// 	href: 'https://github.com/windmill-labs/windmill',
					// 	label: 'GitHub',
					// 	position: 'right'
					// }
				]
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Community',
						items: [
							{
								label: 'Join us on discord',
								href: 'https://discord.gg/PAchGJxsbX'
							}
						]
					}
				],
				copyright: `Copyright © ${new Date().getFullYear()} Windmill Labs. By @rubenfiszel`
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme
			}
		})
};

module.exports = config;
