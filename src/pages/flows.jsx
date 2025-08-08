import React from 'react';
import FlowLightSection from '../landing/FlowLightSection';
import Footer from '../landing/Footer';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import CallToAction from '../landing/CallToAction';
import LogoClouds from '../landing/LogoClouds';
import RadialBlur from '../landing/RadialBlur';
import HubExamples from '../landing/HubExamples';
import TutorialSection from '../landing/TutorialSection';

const hubExamples = [
	{
		title: (
			<div>
				Whenever an{' '}
				<span className="px-2 py-0.5 rounded-md bg-orange-800 text-white">Hacker News</span> message
				contains a mention, publish it to{' '}
				<span className="px-2 py-0.5 rounded-md bg-indigo-800 text-white">Slack</span> with
				sentiment analysed
			</div>
		),
		link: 'https://hub.windmill.dev/flows/13/whenever-an-hackernews-message-contains-a-mention%2C-publish-it-to-slack-with-sentiment-analysed'
	},
	{
		title: (
			<div>
				When new expenses are uploaded to{' '}
				<span className="px-2 py-0.5 rounded-md bg-sky-800 text-white">Google Drive</span>, extract
				text using Tesseract and notify on{' '}
				<span className="px-2 py-0.5 rounded-md bg-indigo-800 text-white">Slack</span>.
			</div>
		),

		link: 'https://hub.windmill.dev/flows/70/when-new-expenses-are-uploaded-to-google-drive%2C-extract-text-using-tesseract-and-notify-on-slack'
	},
	{
		title: (
			<div>
				Retrieve articles from{' '}
				<span className="px-2 py-0.5 rounded-md bg-gray-800 text-white">Google Drive</span> , use a
				for loop to translate each one with{' '}
				<span className="px-2 py-0.5 rounded-md bg-black text-white">OpenAI</span> and store the
				embeddings in a{' '}
				<span className="px-2 py-0.5 rounded-md bg-green-800 text-white">Airtable</span> database.
			</div>
		),
		link: 'https://hub.windmill.dev/flows/71/retrieve-articles-from-google-drive-%2C-use-a-for-loop-to-translate-each-one-with-openai-and-store-the-embeddings-in-a-airtable-database'
	}
];

export default function FlowPage() {
	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Flows | Windmill</title>
					<meta name="title" content="Build complex flows without complexity" />
					<meta
						name="description"
						content="Build complex Flows from atomic scripts, either from your workspace or the Hub."
					/>
				</Head>
				<RadialBlur color="green" fullWidth />

				<LandingHeader />

				<TutorialSection subIndex={1}>
					<div
						className={`text-emerald-900 dark:text-emerald-300 text-5xl text-left font-normal tracking-tight leading-12`}
					>
						{'Develop and iterate with instant feedback'}
					</div>
				</TutorialSection>
				<div className="mt-16">
					<FlowLightSection />
				</div>
				<HubExamples
					examples={hubExamples}
					description={'Explore examples of flow on the Hub'}
					title={'Hub Flows'}
				/>
				<LogoClouds />
				<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full ">
					<CallToAction color="green" />
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
