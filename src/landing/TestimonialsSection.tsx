import React, { useState } from 'react';
import LandingSection from './LandingSection';
import { useColorMode } from '@docusaurus/theme-common';
import { ArrowRight } from 'lucide-react';

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
		caseStudyHref: '',
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
		caseStudyHref: '',
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
		linkedIn: 'https://www.linkedin.com/in/mikeesler/',
		caseStudyHref: ''
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
		caseStudyHref: '',
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
		linkedIn: 'https://www.linkedin.com/in/romaricphilogene/',
		caseStudyHref: '/blog/qovery-case-study',
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
		linkedIn: 'https://www.linkedin.com/in/sindresvendby/',
		caseStudyHref: '/blog/kahoot-case-study',
		text: `Currently, we employ 9 apps, 20 flows, and 63 scripts in our daily operations. They all serve as the foundation for essential tasks, allowing users to independently manage their activities according to their specific needs.`
	},
	/*{
		author: {
			name: 'Ben Packer',
			company: 'United Auto Workers',
			position: 'Software Engineer',
			dark: '/images/brands/uaw_dark.svg',
			light: '/images/brands/uaw.svg',
			anchor: 'united-auto-workers',
			profile_picture: '/contributors/ben_packer.jpeg'
		},
		company_url: 'https://uaw.org/',
		linkedIn: 'https://www.linkedin.com/in/benpaulryanpacker/',
		caseStudyHref: '',
		text: `I've used Retool, Argo, Airflow, etc., and nothing comes close to Windmill. It's coherent and expertly designed for developers to interface with non-technical staff. It lets our small team move super fast and cover a huge surface area in a way that's maintainable, observable, and debuggable.`
	},
	/*{
		author: {
			name: 'Rudo Kemper',
			company: 'Conservation Metrics',
			position: 'Director, Indigenous Guardianship Program',
			dark: '/images/brands/logo-conservation-metrics.png',
			light: '/images/brands/logo-conservation-metrics.png',
				profile_picture: '/contributors/rudo_kemper.jpeg'
		},
		company_url: 'https://conservationmetrics.com/',
		linkedIn: '/blog/conservation-metrics-case-study',
		caseStudyHref: '/blog/conservation-metrics-case-study',
		text: `Windmill is invaluable for our end users, the indigenous communities. As simple as it is to deploy and scale, it saves them hours of work and provides near-instantaneous data access that previously took months of manual work.`
	}*/
];

export default function Example() {
	const { colorMode } = useColorMode();

	return (
		<LandingSection bgClass="pb-8">
			<div>
				<div className="mx-auto text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
						Testimonials
					</h1>
					<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"></p>
					<div className="flex justify-between items-center">
						<span className="text-lg text-gray-600 dark:text-gray-200">
							Entreprise software that developers love.
						</span>
						<a
							href="/case-studies"
							className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
						>
							Read our case studies
							<ArrowRight size={16} />
						</a>
					</div>
				</div>
				<div className="mx-auto mt-8 lg:mx-0 lg:max-w-none">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {clientTestimonials.map((testimonial, index) => (
      <div
        key={testimonial.author.name + index}
        className="testimonials scroll-m-64 flex flex-col"
        id={testimonial.author.anchor}
      >
        <div className="flex flex-col md:h-full rounded-md bg-gray-50 dark:bg-gray-900 text-sm leading-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm">
		<div className="dark:text-gray-50 text-gray-900 p-6 text-md leading-6 flex-grow overflow-hidden relative pb-20">
			<div className="md:max-h-44 md:overflow-hidden">
				<p dangerouslySetInnerHTML={{ __html: testimonial.text }} />
			</div>
			{testimonial.caseStudyHref && testimonial.caseStudyHref !== '' && (
				<div className="absolute bottom-6 right-6">
					<a
						href={testimonial.caseStudyHref}
						className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
					>
						Case study
						<ArrowRight size={16} />
					</a>
				</div>
			)}
		</div>
          <div className="flex items-center border-t dark:border-gray-800 border-gray-200 px-6 py-4 gap-4 mt-auto">
            {testimonial.author.profile_picture ? (
              <a href={testimonial.linkedIn ? testimonial.linkedIn : "#"} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden aspect-square">
                  <img
                    src={testimonial.author.profile_picture}
                    alt={testimonial.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            ) : null}
            {testimonial.linkedIn ? (
              <a className="flex-grow" href={testimonial.linkedIn} target="_blank" rel="noopener noreferrer">
                <p className="text-sm font-bold dark:text-gray-50 text-gray-900">
                  {testimonial.author.name}
                </p>
                <div className="text-sm dark:text-gray-50 text-gray-500">
                  {testimonial.author.position}
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