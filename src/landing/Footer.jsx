import React from 'react';
import { useLocation } from '@docusaurus/router';
import { SiDiscord, SiX, SiLinkedin, SiYoutube } from 'react-icons/si';
import '../css/custom.css';

const navigation = [
	{
		title: 'Product',
		items: [
			{ name: 'Pricing', href: '/pricing' },
			{ name: 'Cloud', href: 'https://app.windmill.dev' },
			{ name: 'Hub', href: 'https://hub.windmill.dev' },
			{ name: 'Case studies', href: '/case-studies' }
		]
	},
	{
		items: [
			{ name: 'Windmill AI', href: '/windmill_ai' },
			{ name: 'GitHub', href: '/integrations/github' },
			{ name: 'S3', href: '/integrations/s3' },
			{ name: 'Supabase', href: '/integrations/supabase' },
			{ name: 'Slack', href: '/integrations/slack' },
			{ name: 'More integrations', href: '/integrations/' }
		],
		title: 'Integrations'
	},
	{
		items: [
			{ name: 'Blog', href: '/blog' },
			{ name: 'Documentation', href: '/docs/intro' },
			{ name: 'Changelog', href: '/changelog' },
{ name: 'Roadmap', href: '/roadmap' },
			{ name: 'Examples', href: '/examples' }
		],
		title: 'Resources'
	},
	{
		items: [
			{ name: 'Jobs', href: '/careers' },
			{ name: 'Brand', href: '/brand' },
			{ name: 'Partners', href: '/partners' }
		],
		title: 'Company'
	},
	{
		items: [
			{ name: 'OpenAPI', href: 'https://app.windmill.dev/openapi.html#/' },
			{ name: 'GitHub Issues', href: 'https://github.com/windmill-labs/windmill/issues' },
			{ name: 'Discord', href: 'https://discord.gg/aT3NhuxSK4' },
			{ name: 'Questions', href: 'https://questions.windmill.dev/' }
		],
		title: 'Help & Support'
	},
	{
		items: [
			{ name: 'Privacy Policy', href: '/privacy_policy' },
			{ name: 'Terms of Service', href: '/terms_of_service' },
			{ name: 'License Terms', href: '/terms' }
		],
		title: 'Legal'
	}
];

export default function Footer() {
	const location = useLocation();
	const isHomePage = location.pathname === '/';

	return (
		<footer aria-labelledby="footer-heading" className="bg-gray-50/50 dark:bg-gray-900/50">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>

			<div className="mx-auto max-w-7xl px-6  pt-16 sm:pt-24 lg:px-8 lg:pt-32 flex flex-col gap-16 pb-16">
				{isHomePage && (
					<div className="flex items-center justify-center gap-6 flex-wrap text-slate-400 dark:text-slate-500 font-medium">
						<span>Backed by</span>
						<a
							href="https://www.ycombinator.com/companies/windmill"
							target="_blank"
							rel="noopener noreferrer"
							title="Y-Combinator"
							className="hover:opacity-80 transition-opacity"
						>
							<img
								src="/images/brands/yc_grey.svg"
								alt="Y Combinator logo"
								width="137"
								height="32"
								className="logo"
							/>
						</a>
						<a
							href="https://www.gradient.com/"
							target="_blank"
							rel="noopener noreferrer"
							title="Gradient Ventures"
							className="hover:opacity-80 transition-opacity"
						>
							<img
								src="/images/brands/gradient.svg"
								alt="Gradient Ventures logo"
								width="160"
								height="40"
								className="logo"
							/>
						</a>
						<a
							href="https://www.bvp.com/"
							target="_blank"
							rel="noopener noreferrer"
							title="Bessemer Venture Partners"
							className="hover:opacity-80 transition-opacity"
						>
							<img
								src="/images/brands/bessemer.png"
								alt="Bessemer Venture Partners logo"
								width="90"
								height="27"
								className="logo"
								style={{ filter: 'grayscale(100%) brightness(2)' }}
							/>
						</a>
					</div>
				)}
				<div className="grid grid-cols-2 md:grid-cols-6 gap-8">
					{navigation.map((section) => (
						<div className="">
							<div className=" font-medium leading-6 text-gray-900 dark:text-gray-100">
								{section.title}
							</div>
							{section.items.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="block mt-4 !leading-tight !tracking-normal transition-colors duration-300 md:text-[16px] text-black  
									dark:text-white text-opacity-60 hover:text-opacity-100"
								>
									{item.name}
								</a>
							))}
						</div>
					))}
				</div>
				<div className="h-[1px] bg-gray-100 dark:bg-gray-800"></div>
				<div className="flex justify-between items-center flex-col md:flex-row gap-8">
					<div className="flex items-center">
						<img className="h-16 mr-3" src="/img/windmill.svg" alt="Windmill Labs" />
						<p className="text-xs leading-2 text-gray-800 dark:text-gray-200 text-opacity-60">
							Made with passion in <br />
							San Francisco and Paris.
						</p>
					</div>
					<div className="flex justify-center items-center">
						<a
							href="https://trust.windmill.dev"
							alt="Trust center"
							class="flex justify-center items-center"
						>
							<img
								className="h-10"
								src="/img/soc.png.webp"
								alt="SOC Compliance badge"
								loading="lazy"
							/>
							<p className="text-xs text-left leading-6 text-gray-800 dark:text-gray-200 text-opacity-60 ml-2">
								Windmill Labs is SOC 2 Type II compliant.
							</p>
						</a>
					</div>
					<div className="social-icons flex justify-center space-x-4 mt-1 mb-1">
						<a
							href="https://discord.com/invite/V7PM2YHsPB"
							className="rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-400 p-2"
							title="Join our Discord community!"
						>
							<SiDiscord className="h-5 w-5 dark:text-white text-gray-800" />
						</a>
						<a
							href="https://www.linkedin.com/company/windmill-dev/"
							className="rounded-full hover:bg-blue-200 dark:hover:bg-blue-400 p-2"
							title="Follow us on LinkedIn!"
						>
							<SiLinkedin className="h-5 w-5 dark:text-white text-gray-800" />
						</a>
						<a
							href="https://twitter.com/WindmillDev"
							className="rounded-full hover:bg-blue-200 dark:hover:bg-blue-400 p-2"
							title="Follow us on X!"
						>
							<SiX className="h-5 w-5 dark:text-white text-gray-800" />
						</a>
						<a
							href="https://www.youtube.com/channel/UChD8Xc-wCGk46HDhRNwWmZA"
							className="rounded-full hover:bg-blue-200 dark:hover:bg-blue-400 p-2"
							title="Subscribe to our YouTube channel!"
						>
							<SiYoutube className="h-5 w-5 dark:text-white text-gray-800" />
						</a>
					</div>
				</div>
				<p className="text-left text-xs leading-4 tracking-tight text-gray-800 dark:text-gray-200 text-opacity-60 hover:text-opacity-100">
					&copy; 2026 Windmill Labs, Inc. All rights reserved. 1111B S Governors Ave STE 6013, Dover, DE
					19904, USA
				</p>
			</div>
		</footer>
	);
}
