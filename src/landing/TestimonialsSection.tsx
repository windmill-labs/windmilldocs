import React from 'react';
import LandingSection from './LandingSection';

const testimonials = [
	{
		body: '@windmilldev -- super powerful tool, built by @rubenfiszel, it\'s just insane how good it is. You can build reusable scripts with Go, Deno, Python, wire them up in a workflow, run them on a cron, build an internal tool, and a lot more, all in one place :D',
		author: {
			handle: 'simo',
			name: '@fr3fou',
			backlink: 'https://twitter.com/fr3fou/status/1670866672448569361'
		}
	},
	{
		body: 'We\'ve been using windmill for our internal tooling and dashboards and its been great! Windmill made running and tracking these things (like the ATS system) accessible to my "low"-technical co-founder, who regularly will hop in and run the job or browse through error logs of previous runs.',
		author: {
			handle: 'thawab',
			backlink: 'https://news.ycombinator.com/item?id=37001413',
			name: 'bluecoconut from HackerNews'
		}
	},
	{
		body: 'Hey filter bubble, why keep @windmilldev a secret? Immersed in data, I was fixated on Nifi, Pulsar, Dagster, etc., trying to build a serverless function orchestrator on such until I stumbled upon windmill. I\'m amazed by what I\'m able to achieve in a brief time playing with it.',
		author: {
			handle: 'lesliealexander',
			backlink: 'https://twitter.com/muskirac/status/1689325443420131328',
			name: '@muskirac'
		}
	},
	{
		body: 'Windmill is amazing. This is the “just get the thing done” tool my brain has needed for my entire career. I can see it becoming a hub for all kinds of logic in my system. I’m so pleased. Thanks for making such a wonderful platform, and thanks for keeping it open source. the one time I hit a snag, you helped me out within a minute. I got a lot done tonight without even expecting to, and that’s a really cool feeling.',
		author: {
			handle: 'stevea',
			name: 'Steve A from Discord',
			backlink: 'https://discord.com/channels/930051556043276338/930051949888405524/1137307730105868348'
		}
	},
	{
		body: 'As clients, we are very satisfied with Windmill. We align with Windmill\'s mindset of using the littlest code as possible. Everything is well-structured and things do not break.',
		author: {
			handle: 'zegoverno',
			name: 'José Governo - Responsible for Quantitative Strategies and Data Engineering at Tera Capital',
			backlink: '/blog/teracapital-case-study'
		}
	},
	{
		body: 'The best part about Windmill is the team behind it, join the discord server to see how fast they fix issues and add features.',
		author: {
			handle: 'thawab',
			backlink: 'https://news.ycombinator.com/item?id=35921601',
			name: 'thawab from HackerNews'
		}
	},
	{
		body: 'Love Windmill so much. It\'s blazing fast, super easier to try it out locally with docker-compose, and Ruben and his team are shipping new features / fixing bugs every day, and the product only gets better.',
		author: {
			handle: 'slig',
			backlink: 'https://news.ycombinator.com/item?id=37001402',
			name: 'slig from HackerNews'
		}
	},
	{
		body: 'Windmill is amazing, incredibly powerful and easy to run anywhere. Thank you so much for making it open source and building in public. I wish you a LOT of success!',
		author: {
			name: 'js4ever from HackerNews',
			handle: 'js4ever',
			backlink: 'https://news.ycombinator.com/item?id=37002360'
		}
	},
	{
		body: 'Currently with Windmill, we employ 9 apps, 20 flows, and 63 scripts in our daily operations. They all serve as the foundation for essential tasks, allowing users to independently manage their activities according to their specific needs.',
		author: {
			handle: 'sindre',
			name: 'Sindre Svendby - Software Engineer at Kahoot!',
			backlink: '/blog/kahoot-case-study'
		}
	},
];

export default function Example() {
	return (
		<LandingSection bgClass="">
			<div>
				<div className="mx-auto text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
					Testimonials
					</h1>
					<p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl"></p>
					<span className="text-lg text-gray-600 max-w-3xl dark:text-gray-200">
					We are proud to be recommended by our users and a committed community.
				</span>
				</div>
				<div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.author.handle}
								className="pt-8 sm:inline-block sm:w-full sm:px-4"
							>
								<a
									href={testimonial.author.backlink}
									className="block rounded-2xl dark:bg-gray-1000 bg-gray-50 p-8 text-sm leading-6 hover:bg-gray-100 hover:no-underline"
								>
									<blockquote className="dark:text-gray-50 text-gray-900">
										<p>{`“${testimonial.body}”`}</p>
									</blockquote>
									<figcaption className="mt-6 flex items-center gap-x-4">
										<div>
											<div className="font-semibold dark:text-gray-50 text-gray-900">
												{testimonial.author.name}
											</div>
										</div>
									</figcaption>
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</LandingSection>
	);
}