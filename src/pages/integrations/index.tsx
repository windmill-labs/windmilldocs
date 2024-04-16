import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingSection from '../../landing/LandingSection';
import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';

const files = [
    {
        title: 'Airtable',
        source:
        '/third_party_logos/airtable.svg',
        url: '/integrations/airtable',
    },
    {
        title: 'Discord',
        source:
        '/third_party_logos/discord.svg',
        url: '/integrations/discord',
        maxWidth: '30%',
    },
    {
        title: 'Google Sheets',
        source:
        '/third_party_logos/gsheets.svg',
        url: '/integrations/gsheets',
    },
    {
        title: 'Hubspot',
        source:
        '/third_party_logos/hubspot.svg',
        url: '/integrations/hubspot',
    },{
        title: 'Notion',
        source:
        '/third_party_logos/notion.svg',
        url: '/integrations/notion',
    },
    {
        title: 'OpenAI',
        source:
        '/third_party_logos/openai.svg',
        url: '/integrations/openai',
        maxWidth: '30%',
    },
    {
        title: 'Slack',
        source:
        '/third_party_logos/slack.svg',
        url: '/integrations/slack',
    },
    {
        title: 'Stripe',
        source:
        '/third_party_logos/stripe.svg',
        maxWidth: '60%',
        url: '/integrations/stripe',
    },
    {
        title: 'Supabase',
        source:
        '/third_party_logos/supabase.svg',
        url: '/integrations/supabase',
        maxWidth: '30%',
    },
    {
        title: 'S3',
        source:
        '/third_party_logos/s3.svg',
        url: '/integrations/s3',
        maxWidth: '30%',
    }
  ]

export default function About() {
	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Integrations | Windmill</title>
					<meta name="title" content="Windmill Team." />
					<meta
						name="description"
						content="Windmill can connect to anything with an API. Then use these integrations to build scripts, flows, apps."
					/>
                    <link rel="icon" href="/img/logo.svg" />
				</Head>
				<LandingHeader />
				<LandingSection bgClass="relative">
					<>
						<RadialBlur />
						<div className="space-y-12 text-center pt-32 pb-16">
							<div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
								<h1 className="!text-4xl font-bold tracking-tight text-blue-500 dark:text-blue-400 sm:!text-5xl mb-8">
									Integrations
								</h1>
								<p className="text-lg">
                                Windmill can connect to anything with an API. Then use these integrations to build scripts, flows, apps, or pick them from <a href='https://hub.windmill.dev/'>WindmillHub</a>.
								</p>
							</div>
                            <div className="text-left">
                                <p>Some of the <a href="/docs/integrations/integrations_on_windmill">+50 pre-made integrations</a> include:</p>
                            </div>
                            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                {files.map((file) => (
                                    <li key={file.source} className="relative">
                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="block">
                                            <div className="group flex justify-center items-center overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100" style={{ width: '250px', height: '250px' }}>
                                                <img src={file.source} alt={file.title} style={{ maxWidth: file.maxWidth || '75%' }} className="pointer-events-none group-hover:brightness-90" />
                                                <div className="banner hidden group-hover:block absolute bottom-7 left-0 right-0 bg-blue-500 text-white text-center py-2 rounded-b-lg">
                                                    More details
                                                </div>
                                            </div>
                                            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 dark:text-gray-200">{file.title}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        <a
                                    type="button"
                                    href={`/docs/integrations/integrations_on_windmill`}
                                    target="_blank"
                                    className="flex items-center justify-center mx-auto gap-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-w-xs">
                                    All Integrations on Documentation
                                </a>
						</div>               
					</>
				</LandingSection>
				<Footer />
			</main>
		</LayoutProvider>
	);
}