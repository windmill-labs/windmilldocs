import React from 'react';
import LandingSection from '../landing/LandingSection';
import FeatureCard from '../landing/FeatureCard';
import { Code, Github, CalendarClock, Server } from 'lucide-react';
import { SiGnubash, SiGo, SiPython, SiTypescript } from 'react-icons/si/index';
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
		icon: Server
	},
	{
		title: 'Open source',
		description:
			'Open-source alternative to Airplane, Superblocks, Retool. Simplified Temporal, Airflow.',
		icon: Github
	},
	{
		title: 'Schedules',
		description:
			'Trigger scripts and flows using cron-like schedules, or via an automatically generated webhook',
		icon: CalendarClock
	}
];

export default function ScriptSection() {
	return (
		<LandingSection bgClass="bg-gradient-to-br from-white to-blue-50">
			<div className="flex flex-col gap-8 justify-center">
				<div className="flex flex-row gap-8 items-center">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
						Scripts
					</h1>
					<div className="inline-flex gap-4">
						<SiPython size={'24px'} className="inline-block" />
						<SiTypescript size={'24px'} className="inline-block" />
						<SiGo size={'24px'} className="inline-block" />
						<SiGnubash size={'24px'} className="inline-block" />
					</div>
				</div>

				<span className="text-lg text-gray-600 max-w-3xl">
					Develop and maintain scripts from our feature-complete webeditor or use your own IDE and
					deploy from Github. Upskill your less technical teammates. It's easier to learn writing
					useful scripts with Windmill.
				</span>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
					<div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
						{data.map((item) => (
							<FeatureCard title={item.title} color="blue" Icon={item.icon}>
								{item.description}
							</FeatureCard>
						))}
					</div>
					<div class="flex flex-col w-full gap-2 italic">
						<img className="border-2 h-full rounded-xl" src="homescreen.png"></img>
						<span className="text-gray-500 text-center w-full text-sm">Lorem ipsum</span>
					</div>
				</div>
				<div className="flex">
					<a
						type="button"
						href="https://hub.windmill.dev/"
						className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Explore scripts on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
