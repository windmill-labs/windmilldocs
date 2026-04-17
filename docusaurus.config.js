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
	favicon: 'img/favicon.ico',
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
					},
					{
						to: '/docs/core_concepts/webhooks#custom-response-code',
						from: '/docs/script_editor/custom_response_code'
					},
					{
						to: '/terms/2025-12-01',
						from: '/terms'
					},
					{
						to: '/platform/script-editor',
						from: '/product/script-editor'
					},
					{
						to: '/platform/flow-editor',
						from: '/product/flow-editor'
					},
					{
						to: '/platform/app-builder',
						from: '/product/app-builder'
					},
					{
						to: '/platform/triggers',
						from: '/product/triggers'
					},
					{
						to: '/platform/datatables',
						from: '/product/datatables'
					},
					{
						to: '/platform/deployment-versioning',
						from: '/product/deployment-versioning'
					},
					{
						to: '/platform/local-dev',
						from: '/product/local-dev'
					},
					{
						to: '/platform/workers',
						from: '/product/workers'
					},
					{
						to: '/platform/sandboxes',
						from: '/product/sandboxes'
					},
					{
						to: '/platform/observability',
						from: '/product/observability'
					},
					{
						to: '/platform/rbac',
						from: '/product/rbac'
					},
					{
						to: '/platform/self-host',
						from: '/product/self-host'
          },
          {
						to: '/docs/advanced/cli/environment-specific-items',
						from: '/docs/advanced/cli/branch-specific-items'
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
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'brand-guidelines',
				path: 'brand_guidelines',
				routeBasePath: 'brand-guidelines',
				sidebarPath: require.resolve('./brandGuidelinesSidebars.js')
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
					id: 'default',
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
					ignorePatterns: ['/tags/**', '/brand-guidelines/**', '/case-studies/*-content', '/use-cases/*-content'],
					filename: 'sitemap.xml'
				}
			})
		]
	],
	scripts: [
		{ src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'windmill.dev' },
		{ src: 'https://ingest.promptwatch.com/js/client.min.js', defer: true, 'data-project-id': '08b5d834-0ad7-4371-a250-26fb54b4cfba' }
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
					},
					margin: 60
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
						type: 'dropdown',
						label: 'Platform',
						position: 'left',
						items: [
							{ label: 'Script editor', href: '/platform/script-editor' },
							{ label: 'Flow editor', href: '/platform/flow-editor' },
							{ label: 'App builder', href: '/platform/app-builder' },
							{ label: 'Triggers', href: '/platform/triggers' },
							{ label: 'Data tables', href: '/platform/datatables' },
							{ label: 'Deployment & versioning', href: '/platform/deployment-versioning' },
							{ label: 'Local dev', href: '/platform/local-dev' },
							{ label: 'Workers', href: '/platform/workers' },
							{ label: 'AI sandboxes', href: '/platform/sandboxes' },
							{ label: 'Observability', href: '/platform/observability' },
							{ label: 'RBAC', href: '/platform/rbac' },
							{ label: 'No-ops self-host', href: '/platform/self-host' },
						]
					},
					{
						href: '/pricing',
						position: 'left',
						label: 'Pricing'
					},
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Docs',
						docsPluginId: 'default'
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
					{
						href: '/roadmap',
						position: 'left',
						label: 'Roadmap'
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
				additionalLanguages: ['powershell', 'bash']
			},
			colorMode: {
				defaultMode: 'dark',
				disableSwitch: false,
				respectPrefersColorScheme: true
			}
		})
};

module.exports = config;
