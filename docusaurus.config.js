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
			require.resolve('@easyops-cn/docusaurus-search-local'),
			{
				hashed: true,
				docsDir: 'docs',
				docsRouteBasePath: '/docs',
				indexDocs: true,
				// indexBlog: false,
				indexPages: false,
				highlightSearchTermsOnTargetPage: false
			}
		]
	],

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
		}
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
				// blog: {
				// 	showReadingTime: true
				// },
				theme: {
					customCss: require.resolve('./src/css/custom.css')
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
			navbar: {
				title: 'Windmill',
				logo: {
					alt: 'Windmill logo',
					src: 'img/windmill.svg'
				},
				items: [
					{
						href: '/#pricing',
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
			footer: {
				style: 'dark',
				links: [
					{
						label: 'Privacy Policy',
						to: '/privacy_policy'
					},
					{
						label: 'Terms of Service',
						to: '/terms_of_service'
					},
					{
						label: 'License Terms',
						to: '/terms'
					}
				],
				copyright: `&copy; 2022 Windmill Labs, Inc. &nbsp;&nbsp;&nbsp; <span class="px-4"></span> Made with passion in the <img class="ml-1 inline" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACC0lEQVR4nO1W30vbUBjNn9cHS98Lg6EPCRtuQx/moASZzDldZ910KhP3ImPiHPggxlqtVVatthnEihsV/FE3LbVdm3b2Z3oktyTWvHmvUBA/OJAvHHLu+b57bz6Ou487H8/bR0Jdz8Z/3hQvnnwMb7e0eGgQstn6uQfifG3Ue4qe2ThcX49MTPoT13Ir5+FLCUmXiwoRuz3FCa8kLZXXED0pYWAhQ7CgXECrARMBleQebxZWDt+3jNLMDBUUpzPBtXbPa1PBHD6v5/BWymDUr2LMr2J6K0/ycX9d3MoRPD9AGzFRTBNhw0X4oIiTdJU41POJNRVqQcOc/B9WTrt7ld3xu8X6R2fDeUg7F+RZf+eWMgjGiphcV2Hl8L1eFAYHqSA7HGekx3t/y1jZK5iu9DIfnlfwqaHHv07L8Ebri9IhDKyisrFBhSjPJ4lj+agE3+7VR79s5nCcqpgudSjx0nXh2+zxdChPnBuCw8tZBPeLpvNGzuM3PrZStzYIbx8U8edflexcPf/gy6JcreF75GpzGRzh9RKbcFuPZAoPLWUJjFxfgN5fY5c3cgT3GrR4nAq/OzrOuUeub5WnngBuis73ATZh2eE4oy0ZU6nlZgnHRDFNfS5YjlOU55O0FwHTBSI3q9SK05mgveyZfhKxZvVYaZbjiN2eoh1hmEafkM3WTzu0MQ1793Hn4xJddTBuNyCCbwAAAABJRU5ErkJggg=="> and <span><img class="inline ml-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAn0lEQVR4nGNgGAX0Av7Vmx0I4aqZ+1MWbz/tQAzeVN+ZctzZ2YEQZgiq3fkxa+qFD/hwYufev8evPf5ADD4aHff3bnr6B3z4tKfnR4bw5n0vurd/+I8PJ3Xu+/Pp1///xOATMXF/vvf3/8eHz/n7vxi1+P9oUHePJq5fo9np/2gB8me0yPw+Wkn4j1aL20dCtRg0UI09/4Fq3o4CBjoBAF0046GODfTbAAAAAElFTkSuQmCC"></span>`
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme
			},
			colorMode: {
				defaultMode: 'light',
				disableSwitch: true,
				respectPrefersColorScheme: false
			}
		})
};

module.exports = config;
