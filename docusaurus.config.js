// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Windmill',
	url: 'https://www.windmill.dev',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	trailingSlash: false,
	favicon: 'img/docs_logo.svg',
	organizationName: 'windmill', // Usually your GitHub org/user name.
	projectName: 'windmill',

	customFields: {
		inkeepCredentials: {
			apiKey: '8ce4bf9ddc2ef8bc9ec53f133fd864292678e2d2e41872a0',
			integrationId: 'clnxmt23j0001s6015xw7mzmo',
			organizationId: 'org_eifr1ohM9oAxET8B'
		}
	},

	plugins: [
		async function myPlugin(context, options) {
			return {
				name: 'docusaurus-tailwindcss',
				configurePostCss(postcssOptions) {
					postcssOptions.plugins.push(require('tailwindcss'));
					postcssOptions.plugins.push(require('autoprefixer'));
					return postcssOptions;
				}
			};
		},
		[
			'@docusaurus/plugin-client-redirects',
			{
				redirects: [
					{
						to: '/docs/intro',
						from: '/docs/'
					}
				]
			}
		],
		['docusaurus-plugin-image-zoom', {}]
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
					// 	showReadingTime: true
					blogSidebarCount: 0,
					postsPerPage: 9
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css')
				},
				sitemap: {
					changefreq: 'weekly',
					priority: 0.5,
					ignorePatterns: ['/tags/**'],
					filename: 'sitemap.xml'
				}
			})
		]
	],
	scripts: [
		{ src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'windmill.dev' }
	],
	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			zoom: {
				selector: '.markdown :not(em) > img',
				config: {
					// options you can specify via https://github.com/francoischalifour/medium-zoom#usage
					background: {
						light: 'rgb(255, 255, 255)',
						dark: 'rgb(50, 50, 50)'
					}
				}
			},
			navbar: {
				title: 'Windmill',
				logo: {
					alt: 'Windmill logo',
					src: 'img/windmill.svg',
					href: '/'
				},
				items: [
					{
						href: '/pricing',
						position: 'left',
						label: 'Pricing'
					},
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Docs'
					},
					{
						to: 'https://app.windmill.dev',
						position: 'left',
						label: 'Cloud App'
					},
					{
						to: 'https://hub.windmill.dev',
						position: 'left',
						label: 'Hub'
					},
					{
						to: 'https://app.windmill.dev/openapi.html',
						position: 'left',
						label: 'OpenAPI'
					},
					{
						href: '/blog',
						position: 'left',
						label: 'Blog'
					},
					// {
					// 	href: '/hiring',
					// 	position: 'right',
					// 	label: 'Join us'
					// },
					// { to: '/blog', label: 'Blog', position: 'left' },
					{
						href: 'https://discord.com/invite/V7PM2YHsPB',
						className: 'header-discord-link',
						'aria-label': 'Discord',
						position: 'right'
					},
					{
						href: 'https://github.com/windmill-labs/windmill',
						className: 'header-github-link',
						'aria-label': 'GitHub repository',
						position: 'right'
					},
					{
						className: 'header-stars-link',
						'aria-label': 'GitHub repository',
						href: 'https://github.com/windmill-labs/windmill',
						position: 'right'
					}
				]
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
				additionalLanguages: ['powershell']
			},
			colorMode: {
				defaultMode: 'dark',
				disableSwitch: false,
				respectPrefersColorScheme: true
			},
			algolia: {
				// The application ID provided by Algolia
				appId: '3Q3AONZ2W8',

				// Public API key: it is safe to commit it
				apiKey: '22ac914215bd02f11fcafa7ef9a9d1bf',

				indexName: 'windmill',

				// Optional: see doc section below
				contextualSearch: true,

				// Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
				externalUrlRegex: 'windmill\\.dev|www.windmill\\.dev',

				// // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
				// replaceSearchResultPathname: {
				// 	from: '/docs/', // or as RegExp: /\/docs\//
				// 	to: '/'
				// },

				// Optional: Algolia search parameters
				searchParameters: {},

				// Optional: path for search page that enabled by default (`false` to disable it)
				searchPagePath: 'search'

				//... other Algolia params
			}
		})
};

module.exports = config;
