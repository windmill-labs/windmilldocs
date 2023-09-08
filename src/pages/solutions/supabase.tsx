import React from 'react';
import LandingSection from '../../landing/LandingSection';
import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import { ArrowRight, UploadIcon, EyeIcon, LogInIcon, RefreshCcwIcon, DeleteIcon, FolderOutputIcon } from 'lucide-react';
import LayoutProvider from '@theme/Layout/Provider';
import { Helmet } from 'react-helmet-async';
import { useColorMode } from '@docusaurus/theme-common';


function Screenshot({darkScreenshot, lightScreenshot}) {
	const { colorMode } = useColorMode();
	const screenshot = colorMode === 'dark' ? darkScreenshot :lightScreenshot

	return (
		<img
			src={screenshot}
			className="w-full rounded-lg"
		/>
	)
}

export default function Content() {
	const color = '#6ccc93';
	const name = "Supabase"
	const website = "https://supabase.com/"
	const windmill_color = '#4E80EE';

	const data = {
		title: `Build internal tools with ${name}`,
		subtitle: `Windmill unlocks your creation of internal tools with ${name}. From scripts, build admin panels, BI dashboards, workflows, and more.`,
		description: (
		<div className="flex flex-col gap-4">
			<p>
				<a href={website} target="_blank">
					<strong><span style={{ color }}>{name}</span></strong>
				</a> is an open source Firebase alternative. It provides a Postgres database, Auth, and Storage.
			</p>
			<p>Connecting Windmill to <span> {name}</span> takes a few seconds and lets you build internal tools from it and integrate with any other platform.</p>
			<p>From scripts supported in multiple languages, build UIs and flows that you can monitor and trigger on demand, by schedule or webhooks.</p>
			<p>Windmill supports PostgreSQL queries directly in the UI.</p>
		</div>
		),
		darkScreenshot: '/integrations/solutions_dark.png',
		lightScreenshot: '/integrations/solutions_light.png',
		documentationLink: 'https://docs.windmillui.com/',
		message_postgres: (
			<div className="flex flex-col gap-4">
				<p>Windmill also supports <a href="/docs/getting_started/scripts_quickstart/sql" target="_blank">
					<strong><span style={{ windmill_color }}>PostgreSQL</span></strong>
				</a> as a language. For
					<span> { name}</span>, this means you can connect your database via the Postgres protocol and execute any SQL query from your internal tools.
				</p>
			</div>
			),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from WindmillHub community library.`,
		hubIntegrations: [
			{
				title: 'Fetch data',
				link: 'https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase',
				description: "Retrieve data from Supabase and use it in scripts or display it in a table.",
				icon: FolderOutputIcon
			},
			{
				title: 'Insert data',
				description: "Add new data to Supabase either manually or from external datasets.",
				link: 'https://hub.windmill.dev/scripts/supabase/1513/insert-data-supabase',
				icon: UploadIcon
			},
			{
				title: 'Preview event',
				link: 'https://hub.windmill.dev/scripts/supabase/1455/preview-supabase-event-supabase',
				description: "Return a Supabase event.",
				icon: EyeIcon
			},
			{
				title: 'Authenticate',
				link: 'https://hub.windmill.dev/scripts/supabase/1540/authenticate-with-email-and-password-supabase',
				description: "Authentificate to Supabase with e-mail and password.",
				icon: LogInIcon
			},
			{
				title: 'Update data',
				link: 'https://hub.windmill.dev/scripts/supabase/1514/update-data-supabase',
				description: "Update Supabase data after it was dealt with a script of flow.",
				icon: RefreshCcwIcon
			},
			{
				title: 'Delete data',
				link: 'https://hub.windmill.dev/scripts/supabase/1515/delete-data-supabase',
				description: "Delete data on Supabase from Windmill.",
				icon: DeleteIcon
			},
		]
	};

	return (
		<LayoutProvider>
			<main>
				<Helmet>
					<title>{name} | Windmill</title>
					<meta name={data.title} content={data.subtitle} />
					<meta name={data.title} content={data.subtitle} />
				</Helmet>
				<LandingHeader />
				<LandingSection bgClass="relative">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="py-12 md:py-20">
							<div className=" pb-12 md:pb-20">
								<h1
									className="leading-10 mb-2 !text-4xl text-gray-900 dark:text-white"
									style={{
										color: color
									}}
								>
									{data.title}
								</h1>
								<p className="text-md text-gray-600 dark:text-gray-400">{data.subtitle}</p>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="flex items-start flex-col justify-center gap-6">
									<div className="text-lg font-normal text-gray-800 dark:text-gray-200">{data.description}</div>
									<div className="flex flex-row gap-2">
										<a
											type="button"
											tag="no_follow"
											href="https://app.windmill.dev/user/login"
											target="_blank"
											className="flex items-center gap-2 rounded-md bg-[#4285F4] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Start building with {name}
											<ArrowRight className="" aria-hidden="true" />
										</a>
										<a
											type="button"
											href={`/docs/integrations/${name}`}
											target="_blank"
											className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
										>
											Documentation
											<ArrowRight className="" aria-hidden="true" />
										</a>
									</div>
								</div>
								<div className="w-full">
									<Screenshot lightScreenshot={data.lightScreenshot} darkScreenshot={data.darkScreenshot}/>
								</div>
							</div>
						</div>
						
						
						<div className="py-12 md:py-20">
							<h2 className="leading-8 mb-8">
								<p> Scripts for
									<span style={{color}}> { name}</span>
								</p>
								<p className="text-base font-normal text-gray-500 dark:text-gray-400">{data.integrations_sub_title}</p>
							</h2>
							<div className="grid grid-cols-3 gap-8 grid-rows-8">
								{data.hubIntegrations.map((integration) => (
									<div>
										<div className="bg-blue-100 text-blue-900 rounded-full p-2 w-8">
											<integration.icon size={16} />
										</div>
										<div className="font-semibold leading-6 text-sm text-gray-700 dark:text-white">{integration.title}</div>
										<div className="text-sm text-gray-700 dark:text-white"> {integration.description} </div>
										<a
											type="button"
											href={integration.link}
											target="_blank"
											className="rounded py-1 text-xs font-semibold text-gray-400  hover:text-blue-800 flex flex-row gap-2 dark:text-gray-400"
										>
											View on the Hub
											<ArrowRight size={16} className="" aria-hidden="true" />
										</a>
									</div>
								))}
							</div>
							<p className="text-base font-normal text-gray-500 dark:text-gray-400 mt-12">{data.message_postgres}</p>
							<div className="flex items-center gap-2">
									<a
										type="button"
										href="/docs/getting_started/scripts_quickstart/sql"
										target="_blank"
										className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-8"
									>
										Documentation
										<ArrowRight className="" aria-hidden="true" />
									</a>
							</div>
						</div>
					</div>
				</LandingSection>
				<Footer />
			</main>
		</LayoutProvider>
	);
}