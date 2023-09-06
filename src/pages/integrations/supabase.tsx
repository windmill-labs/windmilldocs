import React from 'react';
import Head from '@docusaurus/Head';
import LandingSection from '../../landing/LandingSection';
import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import { ArrowRight, Book, Pen } from 'lucide-react';
import LayoutProvider from '@theme/Layout/Provider';

export default function Supabase() {
	const data = {
		title: 'Build internal tools with Supabase',
		subtitle:
			'Windmill makes it easy to build internal tools with Supabase. Build admin panels, BI dashboards, workflows, and more.',
		name: 'Supabase',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					Supabase is an open source Firebase alternative. It provides a Postgres database, Auth,
					and Storage.
				</p>
				<p>Connecting Windmill to Supabase takes a few minutes and lets you build internal tools</p>
				<p>Windmill supports Postgresql queries directly in the UI.</p>
			</div>
		),
		screenshot: '/integrations/supabase.png',
		color: '#6ccc93',
		documentationLink: 'https://docs.windmillui.com/',
		hubIntegrations: [
			{
				title: 'View your data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: "View your Supabase data in Windmill's table component.",
				icon: Book
			},
			{
				title: 'BigQuery',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu lorem et ultricies. In porta lorem at dui semper porttitor. Nullam quis cursus dui. Cras tincidunt vehicula',
				link: 'https://docs.windmillui.com/',
				icon: Pen
			},
			{
				title: 'View your data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: "View your Supabase data in Windmill's table component.",
				icon: Book
			},
			{
				title: 'View your data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: "View your Supabase data in Windmill's table component.",
				icon: Book
			},
			{
				title: 'View your data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: "View your Supabase data in Windmill's table component.",
				icon: Book
			},
			{
				title: 'View your data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: "View your Supabase data in Windmill's table component.",
				icon: Book
			},
			{
				title: 'View your data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: "View your Supabase data in Windmill's table component.",
				icon: Book
			}
		]
	};

	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Team | Windmill</title>
					<meta name="title" content="Windmill Team." />
					<meta
						name="description"
						content="We are a team commited to open source, with a strong will to improve internal tools for everyone."
					/>
				</Head>
				<LandingHeader />
				<LandingSection bgClass="relative">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="py-12 md:py-20">
							<div className=" pb-12 md:pb-20">
								<h1
									className="leading-10 mb-2 !text-4xl text-gray-900 dark:text-white"
									style={{
										color: data.color
									}}
								>
									{data.title}
								</h1>
								<p className="text-md text-gray-600 dark:text-gray-400">{data.subtitle}</p>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="flex items-start flex-col justify-center gap-8">
									<div className="text-lg font-normal">{data.description}</div>
									<div className="flex flex-row gap-2">
										<button
											type="button"
											className="flex items-center gap-2 rounded-md bg-[#4285F4] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Start building with {data.name}
											<ArrowRight className="" aria-hidden="true" />
										</button>
										<button
											type="button"
											className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
										>
											Book demo
											<ArrowRight className="" aria-hidden="true" />
										</button>
									</div>
								</div>
								<div className="w-full">
									<img src={data.screenshot} className="w-full" />
								</div>
							</div>
						</div>
						<div className="py-12 md:py-20">
							<h2 className="leading-8 mb-8">
								Scripts for{' '}
								<div
									style={{
										color: data.color
									}}
								>
									{data.name}
								</div>
							</h2>
							<div className="grid grid-cols-4 gap-8 grid-rows-8">
								{data.hubIntegrations.map((integration) => (
									<div>
										<div className="bg-blue-100 text-blue-900 rounded-full p-2 w-8">
											<integration.icon size={16} />
										</div>
										<div className="font-semibold leading-6 text-sm">{integration.title}</div>
										<div className="text-sm"> {integration.description} </div>
										<a
											type="button"
											href={integration.link}
											target="_blank"
											className="rounded bg-white py-1 text-xs font-semibold text-gray-900  hover:text-blue-800 flex flex-row gap-2"
										>
											View on the Hub
											<ArrowRight size={16} className="" aria-hidden="true" />
										</a>
									</div>
								))}
							</div>
						</div>
					</div>
				</LandingSection>
				<Footer />
			</main>
		</LayoutProvider>
	);
}