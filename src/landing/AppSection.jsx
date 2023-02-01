import React from 'react';
import LandingSection from '../landing/LandingSection';
import FeatureCard from '../landing/FeatureCard';
import { Code } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

const data = [
	{
		title: 'Polyglott',
		description: 'Python, Typescript, Go, Bash scripts with any dependencies',
		icon: Code
	},

	{
		title: 'Scalable',
		description: 'Run them at scale on your infra or ours',
		icon: Code
	},
	{
		title: 'Open source',
		description:
			'Open-source alternative to Airplane, Superblocks, Retool. Simplified Temporal, Airflow.',
		icon: Code
	},
	{
		title: 'Schedules',
		description:
			'Trigger scripts and flows using cron-like schedules, or via an automatically generated webhook',
		icon: Code
	}
];

export default function AppSection() {
	return (
		<LandingSection bgClass="bg-gradient-to-br from-white to-orange-50">
			<div className="flex flex-col gap-8 justify-center">
				<div className="flex-row gap-2 flex items-center">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 items-center">
						Apps
					</h1>
					<span className=" inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
						Alpha
					</span>
				</div>
				<h2 className="text-gray-600 text-2xl font-semibold">
					Retool-like builder for advanced UIs
				</h2>

				<span className="text-lg text-gray-600 max-w-3xl">
					Build your own UI using our Wisiwig editor. Simply drag and drop components, connect your
					data and deploy your app in minutes.
				</span>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
					<FeatureCard title={'hle'} color="orange" Icon={Code} index={0}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat reiciendis earum illo
						pariatur doloribus. Deserunt et modi reprehenderit earum, tempore blanditiis id, odit
						quis similique maxime qui ullam repellendus at.
					</FeatureCard>
					<div class="flex flex-col w-full  ">
						<video
							className="border-2 h-full rounded-xl object-cover w-full"
							autoPlay
							loop
							src="/videos/apps.mp4"
						/>
						<span className="text-gray-500 text-center w-full text-sm italic">
							Build an app to send custom messages on Slack in 2 minutes
						</span>
					</div>
				</div>
				<div className="flex">
					<a
						href="https://hub.windmill.dev/apps"
						type="button"
						target="_blank"
						className="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
					>
						Explore apps on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
