import React, { useState } from 'react';
import LandingSection from './LandingSection';
import '../css/custom.css';
import { useColorMode } from '@docusaurus/theme-common';

const testimonials = [
	{
		body: (
			<span>
				<strong>
					<span className="text-blue-500">@windmilldev</span>
				</strong>{' '}
				-- super powerful tool, built by @rubenfiszel, it's just insane how good it is. You can
				build reusable scripts with Go, Deno, Python, wire them up in a workflow, run them on a
				cron, build an internal tool, and a lot more, all in one place :D
			</span>
		),
		author: {
			handle: 'x',
			name: '@fr3fou on X',
			date: 'June 19th 2023',
			backlink: 'https://x.com/fr3fou/status/1670866672448569361'
		}
	},
	{
		body: (
			<span>
				We've been using windmill for our internal tooling and dashboards and its been great!{' '}
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>{' '}
				made running and tracking these things (like the ATS system) accessible to my
				"low"-technical co-founder, who regularly will hop in and run the job or browse through
				error logs of previous runs.
			</span>
		),
		author: {
			handle: 'hn',
			backlink: 'https://news.ycombinator.com/item?id=37001413',
			date: 'August 4th 2023',
			name: 'bluecoconut on HackerNews'
		}
	},
	{
		body: (
			<span>
				Hey filter bubble, why keep{' '}
				<strong>
					<span className="text-blue-500">@windmilldev</span>
				</strong>{' '}
				a secret? Immersed in data, I was fixated on Nifi, Pulsar, Dagster, etc., trying to build a
				serverless function orchestrator on such until I stumbled upon windmill. I'm amazed by what
				I'm able to achieve in a brief time playing with it.
			</span>
		),
		author: {
			handle: 'x',
			backlink: 'https://x.com/muskirac/status/1689325443420131328',
			name: '@muskirac on X',
			date: 'August 9th 2023'
		}
	},
	{
		body: (
			<span>
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>{' '}
				is amazing. This is the “just get the thing done” tool my brain has needed for my entire
				career. I can see it becoming a hub for all kinds of logic in my system. I’m so pleased.
				Thanks for making such a wonderful platform, and thanks for keeping it open source. the one
				time I hit a snag, you helped me out within a minute. I got a lot done tonight without even
				expecting to, and that’s a really cool feeling.
			</span>
		),
		author: {
			handle: 'discord',
			name: 'Steve A on Discord',
			date: 'August 5th 2023',
			backlink:
				'https://discord.com/channels/930051556043276338/930051949888405524/1137307730105868348'
		}
	},

	{
		body: (
			<span>
				The best part about{' '}
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>{' '}
				is the team behind it, join the discord server to see how fast they fix issues and add
				features.
			</span>
		),
		author: {
			handle: 'hn',
			backlink: 'https://news.ycombinator.com/item?id=35921601',
			name: 'thawab on HackerNews',
			date: 'May 12th 2023'
		}
	},
	{
		body: (
			<span>
				Love{' '}
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>{' '}
				so much. It's blazing fast, super easier to try it out locally with docker-compose, and
				Ruben and his team are shipping new features / fixing bugs every day, and the product only
				gets better.
			</span>
		),
		author: {
			handle: 'hn',
			backlink: 'https://news.ycombinator.com/item?id=37001402',
			name: 'slig on HackerNews',
			date: 'August 4th 2023'
		}
	},
	{
		body: (
			<span>
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>{' '}
				is amazing, incredibly powerful and easy to run anywhere. Thank you so much for making it
				open source and building in public. I wish you a LOT of success!
			</span>
		),
		author: {
			name: 'js4ever on HackerNews',
			handle: 'hn',
			backlink: 'https://news.ycombinator.com/item?id=37002360',
			date: 'August 4th 2023'
		}
	}
];

const clientTestimonials = [
	{
		author: {
			name: 'Eliot Andres',
			company: 'Photoroom',
			position: 'Co-Founder & CTO',
			dark: '/images/brands/logo-original-dark-transparent.png',
			light: '/images/brands/logo-original-light-transparent.png',
			anchor: 'photoroom'
		},
		company_url: 'https://photoroom.com',
		linkedIn: 'https://www.linkedin.com/in/eliotandres/',
		text: `Windmill quickly became crucial at Photoroom. We self-hosted Windmill Enterprise Edition to run a large number of internal scripts and business-critical automations. Windmill made chatops and iterations over scripts incredibly easy. It proved very reliable for running and monitoring workloads at scale. On top of that, their support is incredibly fast.`
	},
	{
		author: {
			name: 'Sindre Svendby',
			company: 'Motimate - a Kahoot company',
			position: 'Software Engineer',
			dark: '/images/brands/Kahoot_Logo-dark.svg',
			light: '/images/brands/Kahoot_Logo.svg',
			anchor: 'kahoot'
		},
		company_url: 'https://motimateapp.com',
		linkedIn: 'https://www.linkedin.com/in/sindresvendby/',
		text: `Currently, we employ 9 apps, 20 flows, and 63 scripts in our daily operations. They all serve as the foundation for essential tasks, allowing users to independently manage their activities according to their specific needs.`
	},
	{
		author: {
			name: 'Mike Esler',
			company: 'Bloom Credit',
			position: 'Chief Technology Officer',
			dark: '/images/brands/Bloomcredit-Dark.svg',
			light: '/images/brands/Bloomcredit-Light.svg',
			anchor: 'bloomcredit'
		},
		text: `Bloom Credit uses Windmill to automate back office and support tasks, and orchestrate their ELT process. It is rapidly becoming a foundational technology in our SaaS control plane. The Windmill team have been great partners; they are responsive to support inquiries and new feature requests and are truly invested in our success with the platform.`,
		company_url: 'https://bloomcredit.io',
		linkedIn: 'https://www.linkedin.com/in/mikeesler/'
	},

	{
		author: {
			name: 'Romaric Philogène',
			company: 'Qovery',
			position: 'Co-Founder & CEO',
			dark: '/images/brands/Qovery-dark.png',
			light: '/images/brands/Qovery-light.svg',
			anchor: 'qovery'
		},
		company_url: 'https://www.qovery.com',
		linkedIn: 'https://www.linkedin.com/in/romaricphilogene/',
		text: `Windmill has been able to cover all of our needs in terms of ETL & workflow orchestration and observability. We use Windmill to manage entirely our playground and complex billing engine. They made it simple to build, schedule, and monitor script & flows. The platform offers a clear DX for code editing, permission management and error handling.`
	},
	{
		author: {
			name: 'Jim Hudson',
			company: 'Deluxebase',
			position: 'IT Coordinator',
			dark: '/images/brands/Deluxebase.png',
			light: '/images/brands/Deluxebase.png',
			anchor: 'deluxebase'
		},
		company_url: 'https://www.deluxebase.com',
		text: `At Deluxebase, we use Windmill to automate and streamline business processes, analyse figures, and synchronise data between our ERP and external services. Having everything in one place has greatly improved the efficiency of our team. The Windmill team are incredibly responsive, providing excellent support, feature request implementations, and almost instant bug fixes for the few we’ve come across!`
	}
];

export default function Example() {
	const [showAll, setShowAll] = useState(false);
	const { colorMode } = useColorMode();

	const toggleTestimonials = () => {
		setShowAll(!showAll);
	};

	return (
		<LandingSection bgClass="">
			<div>
				<div className="mx-auto text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
						Testimonials
					</h1>
					<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"></p>
					<span className="text-lg text-gray-600 max-w-3xl dark:text-gray-200">
						Entreprise software that developers love.
					</span>
				</div>
				<div className="mx-auto mt-8 lg:mx-0 lg:max-w-none">
					<div className="columns-1 sm:columns-2 gap-8 flow-root mb-8">
						{clientTestimonials.map((testimonial) => (
							<div
								key={testimonial.author.name}
								className="sm:inline-block sm:w-full mb-8 testimonials scroll-m-64"
								id={testimonial.author.anchor}
							>
								<a
									className="block rounded-2xl dark:bg-gray-1000 border dark:border-0 text-sm leading-6 hover:bg-gray-50 hover:no-underline shadow-sm"
									target="_blank"
								>
									<div className="dark:text-gray-50 text-gray-900 p-8 text-md leading-6">
										<p>{testimonial.text}</p>
									</div>
									<div className="flex items-center border-t dark:border-gray-800 px-6 py-4 gap-4 ">
										<a className="w-full" href={testimonial.linkedIn} target="_blank">
											<p className="text-sm font-bold dark:text-gray-50 text-gray-900 ">
												{testimonial.author.name}
											</p>
											<div className="text-sm dark:text-gray-50 text-gray-500">
												{[testimonial.author.position, testimonial.author.company]
													.filter(Boolean)
													.join(' @ ')}
											</div>
										</a>
										<a
											className="flex-shrink-0 cursor-pointer"
											href={testimonial.company_url}
											target="_blank"
										>
											<img
												width={100}
												height={32}
												src={
													colorMode === 'dark' ? testimonial.author.dark : testimonial.author.light
												}
												alt=""
											/>
										</a>
									</div>
								</a>
							</div>
						))}
					</div>

					<div className="flex flex-row gap-2 items-center mb-4 h-8">
						<div className="text-lg text-gray-600 max-w-3xl dark:text-gray-200">Community</div>
						<button
							onClick={toggleTestimonials}
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-100 px-4 py-1 text-xs font-medium text-blue-600 shadow-sm hover:bg-blue-200 hover:text-blue-800 !no-underline transition-all"
						>
							{showAll ? 'Show Less' : 'Show All'}
						</button>
					</div>

					<div className="columns-1 sm:columns-2 md:columns-3 gap-4 flow-root">
						{testimonials.slice(0, showAll ? testimonials.length : 2).map((testimonial) => (
							<div
								key={testimonial.author.handle}
								className="sm:inline-block sm:w-full mb-4 testimonials"
							>
								<a
									href={testimonial.author.backlink}
									className="block rounded-2xl dark:bg-gray-1000 border dark:border-0 p-6 text-sm leading-6 hover:bg-gray-50 hover:no-underline"
									target="_blank"
								>
									<div className="dark:text-gray-50 text-gray-900">
										<p>{testimonial.body}</p>
									</div>
									<div
										className={`font-semibold dark:text-gray-50 text-gray-900 mt-2 ${testimonial.author.handle}-name`}
									>
										{testimonial.author.name}
									</div>
									<div className="text-xs text-gray-400 mt-1">{testimonial.author.date}</div>
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</LandingSection>
	);
}
