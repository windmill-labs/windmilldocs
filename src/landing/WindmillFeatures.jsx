import React from 'react';
import {
	BoltIcon,
	ChatBubbleBottomCenterTextIcon,
	EnvelopeIcon,
	GlobeAltIcon,
	ScaleIcon
} from '@heroicons/react/24/outline';

const transferFeatures = [
	{
		id: 1,
		name: 'Schedules',
		description:
			'Trigger scripts and flows using cron-like schedules, or via an automatically generated webhook',
		icon: GlobeAltIcon
	},
	{
		id: 2,
		name: 'OAuth integrations & external apps',
		description: 'Connect to external apps using any OAuth providers or API keys',
		icon: ScaleIcon
	},
	{
		id: 3,
		name: 'Granular Permissions & Approval flows',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: BoltIcon
	},
	{
		id: 4,
		name: 'Deploy from Github & Exportable Workspace',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: BoltIcon
	}
];

const communicationFeatures = [
	{
		id: 1,
		name: 'Mobile notifications',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: ChatBubbleBottomCenterTextIcon
	},
	{
		id: 2,
		name: 'Reminder emails',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: EnvelopeIcon
	}
];

export default function WindmillFeatures() {
	return (
		<div className="overflow-hidden bg-gray-50 py-16 lg:py-24">
			<div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
				<div className="relative">
					<h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
						Build endpoints, workflows & ETLs, UIs with code only where it matters
					</h2>
					<p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
						Open-source and self-hostable serverless runtime and platform combining the power of
						code with the velocity of low-code. Scalable, reliable, blazingly fast, any dependencies
						in
					</p>
				</div>

				<div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
					<div className="relative">
						<h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							Transfer funds world-wide
						</h3>
						<p className="mt-3 text-lg text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi
							recusandae, porro maiores officia assumenda aliquam
						</p>

						<dl className="mt-10 space-y-10">
							{transferFeatures.map((item) => (
								<div key={item.id} className="relative">
									<dt>
										<div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white"></div>
										<p className="ml-16 text-lg font-medium leading-6 text-gray-900">{item.name}</p>
									</dt>
									<dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
								</div>
							))}
						</dl>
					</div>

					<div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
						<img className="relative mx-auto" width={490} src="homescreen.png" alt="" />
					</div>
				</div>

				<div className="relative mt-12 sm:mt-16 lg:mt-24">
					<div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
						<div className="lg:col-start-2">
							<h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
								Replace all your sparely used niche tools
							</h3>
							<p className="mt-3 text-lg text-gray-500">
								Are your teams maintaining various niche internal tools to power ops teams? Costly
								one-off integrations with HubSpot, Salesforce, Slack, etc? Do you have scripts in
								lambdas, cron tabs, or cloud instances everybody has forgotten about except (maybe!)
								a single developer?
							</p>

							<dl className="mt-10 space-y-10">
								{communicationFeatures.map((item) => (
									<div key={item.id} className="relative">
										<dt>
											<div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white"></div>
											<p className="ml-16 text-lg font-medium leading-6 text-gray-900">
												{item.name}
											</p>
										</dt>
										<dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
									</div>
								))}
							</dl>
						</div>

						<div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
							<img className="relative mx-auto" width={490} src="homescreen.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
