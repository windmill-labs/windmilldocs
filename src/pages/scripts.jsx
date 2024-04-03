import React from 'react';
import ScriptLightSection from '../landing/ScriptLightSection';
import Footer from '../landing/Footer';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import CallToAction from '../landing/CallToAction';
import LogoClouds from '../landing/LogoClouds';
import RadialBlur from '../landing/RadialBlur';
import HubExamples from '../landing/HubExamples';

const hubExamples = [
	{
		title: (
			<div>
				Send Message to a{' '}
				<span className="px-2 py-1 rounded-md bg-indigo-800 text-white">Slack</span> Channel
			</div>
		),
		link: 'https://hub.windmill.dev/scripts/slack/1284/send-message-to-channel-slack'
	},
	{
		title: (
			<div>
				Create an Issue on <span className="px-2 py-1 text-white bg-black rounded-md">GitHub</span>
			</div>
		),

		link: 'https://hub.windmill.dev/scripts/github/768/create-issue-github'
	},

	{
		title: (
			<div>
				Fetch data from a{' '}
				<span className="px-2 py-1 text-white bg-emerald-800 rounded-md">Google Sheet</span>
			</div>
		),
		link: 'https://hub.windmill.dev/scripts/gsheets/1229/get-spreadsheet-gsheets'
	},
	{
		title: (
			<div>
				Create a completion using{' '}
				<span className="px-2 py-1 text-white bg-black rounded-md">OpenAI</span>
			</div>
		),
		link: 'https://hub.windmill.dev/scripts/openai/1452/create-completion-openai'
	},

	{
		title: (
			<div>
				Trigger every time a new customer is added to your{' '}
				<span className="px-2 py-1 text-white bg-indigo-800 rounded-md">Stripe</span>
			</div>
		),
		link: 'https://hub.windmill.dev/scripts/stripe/1463/get-recently-added-customers-stripe'
	},
	{
		title: (
			<div>
				Trigger each time a call to the{' '}
				<span className="px-2 py-1 text-white bg-red-800 rounded-md">Twilio</span> phone number is
				completed.
			</div>
		),
		link: 'https://hub.windmill.dev/scripts/twilio/2248/new-call-twilio'
	}
];

export default function ScriptPage() {
	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Scripts | Windmill</title>
					<meta name="title" content="Custom Page Title" />
					<meta name="description" content="Custom page description." />
				</Head>
				<LandingHeader />
				<RadialBlur />
				<div className="mt-20">
					<ScriptLightSection />
				</div>
				<HubExamples examples={hubExamples} />
				<LogoClouds />
				<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full ">
					<CallToAction />
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
