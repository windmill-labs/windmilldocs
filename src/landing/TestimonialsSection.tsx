import React from 'react';
import LandingSection from './LandingSection';
import '../css/custom.css';

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
				As clients, we are very satisfied with{' '}
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>
				{''}. We align with Windmill's mindset of using the littlest code as possible. Everything is
				well-structured and things do not break.
			</span>
		),
		author: {
			handle: 'wm',
			name: 'José Governo - Responsible for Quantitative Strategies and Data Engineering at Tera Capital',
			backlink: '/blog/teracapital-case-study',
			date: 'September 5th 2023'
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
	},
	{
		body: (
			<span>
				Currently with{' '}
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>
				{''}, we employ 9 apps, 20 flows, and 63 scripts in our daily operations. They all serve as
				the foundation for essential tasks, allowing users to independently manage their activities
				according to their specific needs.
			</span>
		),
		author: {
			handle: 'wm',
			name: 'Sindre Svendby - Software Engineer at Kahoot!',
			backlink: '/blog/kahoot-case-study',
			date: 'September 4th 2023'
		}
	}
];

export default function Example() {
	return (
		<LandingSection bgClass="">
			<div>
				<div className="mx-auto text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
						Testimonials
					</h1>
					<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"></p>
					<span className="text-lg text-gray-600 max-w-3xl dark:text-gray-200">
						Entreprise software that developers love
					</span>
				</div>
				<div className="mx-auto mt-8 lg:mx-0 lg:max-w-none">
					<div className="columns-1 sm:columns-2 md:columns-3 gap-4 flow-root">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.author.handle}
								className="sm:inline-block sm:w-full mb-4 testimonials"
							>
								<a
									href={testimonial.author.backlink}
									className="block rounded-2xl dark:bg-gray-1000 border dark:border-0 p-8 text-sm leading-6 hover:bg-gray-50 hover:no-underline"
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
