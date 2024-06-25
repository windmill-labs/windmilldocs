// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// @ts-ignore
import { themes } from 'prism-react-renderer';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

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

	stylesheets: [
		{
			href: './src/css/custom.css',
			type: 'text/css'
		}
	],

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
		['docusaurus-plugin-image-zoom', {}],
		[
			'@docusaurus/plugin-content-blog',
			{
				id: 'changelog',
				routeBasePath: 'changelog',
				path: './changelog',
				blogSidebarCount: 0,
				postsPerPage: 'ALL'
			}
		]
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
	headTags: [
		{
			tagName: 'script',
			attributes: {
				type: 'text/javascript'
			},
			innerHTML:
				'window.__positional_config = { customerId: "9e217c49-0a4b-4513-8a9e-0c79ce3eb787" };'
		}
	],
	scripts: [
		{ src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'windmill.dev' },
		{
			src: 'https://assets.positional-bucket.com/positional.min.js',
			defer: true
		}
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
						label: 'Cloud'
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
					{
						href: '/changelog',
						position: 'left',
						label: 'Changelog'
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
			/*
			announcementBar: {
				id: 'airplane_migration',
				content:
					'<a style="height:20px;" href="/docs/misc/guides/airplane">Migration from Airplane to Windmill made easy, see docs</a>',
				backgroundColor: '#2563eb',
				textColor: '#fff',
				isCloseable: true
			},
			*/
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
				additionalLanguages: ['powershell']
			},
			colorMode: {
				defaultMode: 'dark',
				disableSwitch: false,
				respectPrefersColorScheme: true
			}
		})
};

module.exports = config;
