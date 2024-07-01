import React, { useState } from 'react';
import LandingSection from './LandingSection';
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
				A little late but after reading this thread I moved a airflow instance to windmill and I
				much much prefer{' '}
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>
				{', '}
				airflow was clunky and heavy for my simple workflow that consists of running a few python
				script. Also is auto ui is great to play with the arguments in, the cron ui and next start
				date... Also is it written in rust so much more low usage than airflow that consistently cpu
				picked while doing nothing.
			</span>
		),
		author: {
			handle: 'hn',
			backlink: 'https://news.ycombinator.com/item?id=38432912',
			name: 'hokkos on HackerNews',
			date: 'November 27th 2023'
		}
	},
	{
		body: (
			<span>
				I migrated to{' '}
				<strong>
					<span className="text-blue-500">windmill.dev</span>
				</strong>{' '}
				a couple of weeks ago and couldn't be happier. Honestly the product is simply better than
				Airplane. I looked at Windmill.dev a 18 months ago when I adopted Airplane, and it was less
				mature - but it was open source and I wish I'd given that more weight.
			</span>
		),
		author: {
			handle: 'hn',
			backlink: 'https://news.ycombinator.com/item?id=39623203',
			name: 'jeremyjh on HackerNews',
			date: 'March 6th 2024'
		}
	},
	{
		body: (
			<span>
				played with{' '}
				<strong>
					<span className="text-blue-500">windmill.dev</span>
				</strong>{' '}
				over the weekend, and it's really hitting a sweet spot for me between no-code/low-code, a
				fancy UI but still being powerful enough to actually replace significant amounts of code.
			</span>
		),
		author: {
			handle: 'x',
			backlink: 'https://twitter.com/moritzhaarmann/status/1731580514136469659',
			name: 'Moritz Haarmann, former Director of Engineering at Adidas',
			date: 'December 4th 2023'
		}
	},
	{
		body: (
			<span>
				I had the same thought when it popped up on my radar a year ago. Now that I’ve been using it
				for a few weeks, it’s difficult to go back to the exact tools you’re naming. I didn’t
				realize how large of an impediment it is to move back and forth all of them.
				<strong>
					<span className="text-blue-500">Windmill</span>
				</strong>{' '}
				is the thing I never knew I needed. It’s changed how I think about delivering data
				products/solutions.
			</span>
		),
		author: {
			name: '	knowsuchagency on HackerNews',
			handle: 'hn',
			backlink: 'https://news.ycombinator.com/item?id=38385712',
			date: 'November 22nd 2023'
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
			anchor: 'photoroom',
			profile_picture: 'https://media.licdn.com/dms/image/D4E03AQEgFugU1CsFxA/profile-displayphoto-shrink_200_200/0/1709041891469?e=2147483647&v=beta&t=uH8qfqTTK2YmNCedLtJ7rURtXbtKegLF1QLtaOQKEDM',
		},
		company_url: 'https://photoroom.com',
		linkedIn: 'https://www.linkedin.com/in/eliotandres/',
		text: `Windmill quickly became crucial at Photoroom. We self-hosted Windmill Enterprise Edition to run a large number of internal scripts and business-critical automations. Windmill made chatops and iterations over scripts incredibly easy. It proved very reliable for running and monitoring workloads at scale. On top of that, their support is incredibly fast.`
	},
	{
		author: {
			name: 'Sindre Svendby',
			company: 'Motimate - a Kahoot! company',
			position: 'Software Engineer',
			dark: '/images/brands/Kahoot_Logo-dark.svg',
			light: '/images/brands/Kahoot_Logo.svg',
			anchor: 'kahoot',
			profile_picture: 'https://avatars.githubusercontent.com/u/1047421?v=4'
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
			anchor: 'bloomcredit',
			profile_picture: 'https://bloomcredit.io/wp-content/uploads/2023/01/person-c.png'
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
			anchor: 'qovery',
			profile_picture: 'https://media.licdn.com/dms/image/D4E03AQFlNTUW60HFbQ/profile-displayphoto-shrink_400_400/0/1693895615653?e=2147483647&v=beta&t=nxGuC4K8eXsJ2YAq1wqG-m8mEkhj8gugGqhccdckJZc'
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
	const { colorMode } = useColorMode();

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
    {clientTestimonials.map((testimonial, index) => (
      <div
        key={testimonial.author.name + index}
        className="sm:inline-block sm:w-full mb-8 testimonials scroll-m-64"
        id={testimonial.author.anchor}
      >
        <div className="block rounded-2xl dark:bg-gray-1000 border dark:border-0 text-sm leading-6 hover:bg-gray-50 hover:no-underline shadow-sm">
          <div className="dark:text-gray-50 text-gray-900 p-8 text-md leading-6">
            <p>{testimonial.text}</p>
          </div>
          <div className="flex items-center border-t dark:border-gray-800 px-6 py-4 gap-4">
            {testimonial.author.profile_picture ? (
              <a href={testimonial.linkedIn ? testimonial.linkedIn : "#"} target="_blank" rel="noopener noreferrer">
                <img
                  src={testimonial.author.profile_picture}
                  alt={testimonial.author.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 flex-shrink-0"
                />
              </a>
            ) : null}
            {testimonial.linkedIn ? (
              <a className="flex-grow" href={testimonial.linkedIn} target="_blank" rel="noopener noreferrer">
                <p className="text-sm font-bold dark:text-gray-50 text-gray-900">
                  {testimonial.author.name}
                </p>
                <div className="text-sm dark:text-gray-50 text-gray-500">
                  {[testimonial.author.position, testimonial.author.company]
                    .filter(Boolean)
                    .join(' @ ')}
                </div>
              </a>
            ) : (
              <>
                <p className="text-sm font-bold dark:text-gray-50 text-gray-900 w-full">
                  {testimonial.author.name}
                </p>
                <div className="text-sm dark:text-gray-50 text-gray-500">
                  {[testimonial.author.position, testimonial.author.company]
                    .filter(Boolean)
                    .join(' @ ')}
                </div>
              </>
            )}

            <a
              className="flex-shrink-0 cursor-pointer"
              href={testimonial.company_url}
              target="_blank"
              title={testimonial.author.company}
              rel="noopener noreferrer"
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
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-row gap-2 items-center mb-4 h-8">
						<div className="text-lg text-gray-600 max-w-3xl dark:text-gray-200">Community</div>
					</div>

					<div className="columns-1 sm:columns-2 md:columns-3 gap-4 flow-root">
					{testimonials.map((testimonial, index) => (
						<div
						key={testimonial.author.handle + index}
						className="sm:inline-block sm:w-full mb-4 testimonials"
						>
						<a
							href={testimonial.linkedIn}
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
