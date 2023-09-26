import React from 'react';
const navigation = {
	support: [
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'Documentation', href: '/docs/intro' },
		{ name: 'Github', href: 'https://github.com/windmill-labs/windmill' },
		{ name: 'OpenAPI', href: 'https://app.windmill.dev/openapi.html#/' },
		{ name: 'Discord', href: 'https://discord.gg/aT3NhuxSK4' }
	],
	company: [
		{ name: 'About', href: '/about' },
		{ name: 'Blog', href: '/blog' }
	],
	legal: [
		{ name: 'Privacy Policy', href: '/privacy_policy' },
		{ name: 'Terms of Service', href: '/terms_of_service' },
		{ name: 'License Terms', href: '/terms' }
	],
	social: [
		{
			name: 'GitHub',
			href: '#',
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						clipRule="evenodd"
					/>
				</svg>
			)
		}
	],
	solutions: [
		{ name: 'Supabase', href: '/solutions/supabase' },
		{ name: 'Hubspot', href: '/solutions/hubspot' },
		{ name: 'Airtable', href: '/solutions/airtable' }
	]
};

export default function Footer() {
	return (
		<footer aria-labelledby="footer-heading">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
				<div className="flex flex-row-reverse flex-wrap justify-between gap-8 lg:gap-20">
					<div></div>

					<div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-20">
						<div className="">
							<h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
								Support
							</h3>
							<ul role="list" className="mt-6 space-y-4">
								{navigation.support.map((item) => (
									<li key={item.name}>
										<a
											href={item.href}
											className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-200"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="">
							<h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
								Solutions
							</h3>
							<ul role="list" className="mt-6 space-y-4">
								{navigation.solutions.map((item) => (
									<li key={item.name}>
										<a
											href={item.href}
											className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-200"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
								Company
							</h3>
							<ul role="list" className="mt-6 space-y-4">
								{navigation.company.map((item) => (
									<li key={item.name}>
										<a
											href={item.href}
											className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-200"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="">
							<h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
								Legal
							</h3>
							<ul role="list" className="mt-6 space-y-4">
								{navigation.legal.map((item) => (
									<li key={item.name}>
										<a
											href={item.href}
											className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-200"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="space-y-8 text-left mx-auto">
						<div className="flex items-center">
							<img className="h-16 mr-3" src="/img/windmill.svg" alt="Windmill Labs" />
							<p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
								Made with passion in <br />
								San Francisco and Paris.
							</p>
						</div>
						<div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
							<p className="text-center text-xs leading-5 text-gray-500">
								&copy; 2023 Windmill Labs, Inc. All rights reserved. <br />
								1111B S Governors Ave, Dover, DE 19904, USA
							</p>
							<div className="flex justify-center items-center mt-4">
								<img className="h-10" src="/img/soc.png" alt="SOC Compliance badge" />
								<p className="text-xs text-left leading-6 text-gray-500 ml-2">
									Windmill Labs is SOC 2 Type II compliant
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
