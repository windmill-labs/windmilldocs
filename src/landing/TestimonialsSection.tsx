import React, { useState } from 'react';
import LandingSection from './LandingSection';
import { useColorMode } from '@docusaurus/theme-common';



const clientTestimonials = [
	{
		author: {
			name: 'Eliot Andres',
			company: 'Photoroom',
			position: 'Co-Founder & CTO',
			dark: '/images/brands/logo-original-dark-transparent.png',
			light: '/images/brands/logo-original-light-transparent.png',
			anchor: 'photoroom',
			profile_picture: '/contributors/eliot_andres.jpeg',
		},
		company_url: 'https://photoroom.com',
		linkedIn: 'https://www.linkedin.com/in/eliotandres/',
		text: `Windmill quickly became crucial at Photoroom. We self-hosted Windmill Enterprise Edition to run a large number of internal scripts and business-critical automations. Windmill made chatops and iterations over scripts incredibly easy. It proved very reliable for running and monitoring workloads at scale. On top of that, their support is incredibly fast.`
	},
	{
		author: {
			name: 'Lewis Ellis',
			company: 'Pave',
			position: 'Staff Platform Engineer',
			dark: '/images/brands/pave-dark.svg',
			light: '/images/brands/pave.svg',
			anchor: 'pave',
			profile_picture: '/contributors/lewis_ellis.jpeg',
		},
		company_url: 'https://www.pave.com/',
		linkedIn: 'https://www.linkedin.com/in/lewisjellis/',
		text: `At Pave, we self-host Windmill Enterprise Edition to run 100+ scripts and 15+ crons. Our Windmill deployment interacts with half a dozen data stores to power all kinds of business-critical tasks and automations across several teams. It enables our engineering org to move quickly while keeping things secure and avoiding infrastructure sprawl. `
	},
	{
		author: {
			name: 'Mike Esler',
			company: 'Bloom Credit',
			position: 'Chief Technology Officer',
			dark: '/images/brands/Bloomcredit-Dark.svg',
			light: '/images/brands/Bloomcredit-Light.svg',
			anchor: 'bloomcredit',
			profile_picture: '/contributors/mike_esler.jpeg'
		},
		text: `Bloom Credit uses Windmill to automate back office and support tasks, and orchestrate their ELT process. It is rapidly becoming a foundational technology in our SaaS control plane. The Windmill team have been great partners; they are responsive to support inquiries and new feature requests and are truly invested in our success with the platform.`,
		company_url: 'https://bloomcredit.io',
		linkedIn: 'https://www.linkedin.com/in/mikeesler/'
	},
	{
		author: {
			name: 'Yonathan Adest',
			company: 'Investing.com',
			position: 'Chief Technology Officer',
			dark: '/images/brands/Investing-Dark.svg',
			light: '/images/brands/Investing-Light.svg',
			anchor: 'investing',
			profile_picture: '/contributors/yonathan_adest.jpeg'
		},
		company_url: 'https://www.investing.com',
		linkedIn: 'https://www.linkedin.com/in/yonatan-adest/',
		text: `At Investing.com, we use Windmill to orchestrate our AI workflows. The quick setup through Docker Compose and intuitive UI allowed us to get started immediately. We leverage Windmill for various automation tasks including content processing pipelines, automated stock analysis report generation, and ETL processes.`
	},
	{
		author: {
			name: 'Romaric Philogène',
			company: 'Qovery',
			position: 'Co-Founder & CEO',
			dark: '/images/brands/Qovery-dark.svg',
			light: '/images/brands/Qovery-light.svg',
			anchor: 'qovery',
			profile_picture: '/contributors/romaric_philogene.webp'
		},
		company_url: 'https://www.qovery.com',
		linkedIn: '/blog/qovery-case-study',
		text: `Windmill has been able to cover all of our needs in terms of ETL & workflow orchestration and observability. We use Windmill to manage entirely our playground and complex billing engine. The platform offers a clear DX for code editing, permission management and error handling.`
	},
	{
		author: {
			name: 'Sindre Svendby',
			company: 'Motimate - a Kahoot! company',
			position: 'Software Engineer',
			dark: '/images/brands/Kahoot_Logo-dark.svg',
			light: '/images/brands/Kahoot_Logo.svg',
			anchor: 'kahoot',
			profile_picture: '/contributors/sindre_svendby.jpeg'
		},
		company_url: 'https://motimateapp.com',
		linkedIn: '/blog/kahoot-case-study',
		text: `Currently, we employ 9 apps, 20 flows, and 63 scripts in our daily operations. They all serve as the foundation for essential tasks, allowing users to independently manage their activities according to their specific needs.`
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
    {clientTestimonials.map((testimonial, index) => (
      <div
        key={testimonial.author.name + index}
        className="testimonials scroll-m-64 flex flex-col"
        id={testimonial.author.anchor}
      >
        <div className="flex flex-col h-full rounded-md bg-gray-50 dark:bg-gray-900 text-sm leading-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm">
		<div className="dark:text-gray-50 text-gray-900 p-6 text-md leading-6 flex-grow overflow-hidden">
			<div className="max-h-44 overflow-hidden">
				<p dangerouslySetInnerHTML={{ __html: testimonial.text }} />
			</div>
		</div>
          <div className="flex items-center border-t dark:border-gray-800 border-gray-200 px-6 py-4 gap-4 mt-auto">
            {testimonial.author.profile_picture ? (
              <a href={testimonial.linkedIn ? testimonial.linkedIn : "#"} target="_blank" rel="noopener noreferrer">
                <img
                  src={testimonial.author.profile_picture}
                  alt={testimonial.author.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 flex-shrink-0 object-cover"
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
				style={{
					height: '42px',
					width: 'auto',
					maxWidth: '100px',
					...((colorMode === 'dark' ? testimonial.author.dark : testimonial.author.light).endsWith('.png') && {
						height: 'auto',
						width: '100px',
						maxHeight: '42px'
					})
				}}
				src={colorMode === 'dark' ? testimonial.author.dark : testimonial.author.light}
				alt={testimonial.author.company}
				/>
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</LandingSection>
	);
}