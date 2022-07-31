// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Windmill',
	url: 'https://windmill.dev',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/logo.svg',
	organizationName: 'windmill', // Usually your GitHub org/user name.
	projectName: 'windmill',
	themes: [
		[
			require.resolve("@easyops-cn/docusaurus-search-local"),
			{
				hashed: true,
				docsDir: 'docs',
				docsRouteBasePath: '/docs',
				indexDocs: true,
				indexBlog: false,
				indexPages: false,
				highlightSearchTermsOnTargetPage: false
			},
		],
	],
	plugins: [
		async function myPlugin(context, options)
		{
			return {
				name: "docusaurus-tailwindcss",
				configurePostCss(postcssOptions)
				{
					postcssOptions.plugins.push(require("tailwindcss"));
					postcssOptions.plugins.push(require("autoprefixer"));
					return postcssOptions;
				},
			};
		},
	],
	presets: [
		[
			'classic',
			// ... other options
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
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
				title: 'Windmill',
				logo: {
					alt: 'Windmill logo',
					src: 'img/windmill.svg'
				},
				items: [
					{
						to: 'https://app.windmill.dev',
						position: 'left',
						label: 'Cloud'
					},
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Docs'
					},
					{
						to: 'https://hub.windmill.dev',
						position: 'left',
						label: 'WindmillHub'
					},
					{
						href: '/hiring',
						position: 'right',
						label: 'Join us'
					},
					// { to: '/blog', label: 'Blog', position: 'left' },
					{
						href: 'https://github.com/windmill-labs/windmill',
						className: 'header-github-link',
						'aria-label': 'GitHub repository',
						position: 'right'
					}
				]
			},
			footer: {
				style: 'dark',
				links: [
					{
						label: 'Privacy Policy',
						to: '/privacy_policy',
					},
					{
						label: 'Terms of Service',
						to: '/terms_of_service',
					},
				],
				copyright: `&copy; 2022 Windmill Labs, Inc'
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme
			},
			colorMode: {
				defaultMode: 'light',
				disableSwitch: true,
				respectPrefersColorScheme: false,
			},
		})
};

module.exports = config;
