import { ServerStackIcon } from '@heroicons/react/20/solid';
import { Eye, Github, Key, Landmark, Server } from 'lucide-react';
import React from 'react';
import LandingSection from './LandingSection';

const features = [
	{
		name: 'Open-source',
		description: 'State of the art tech stack that you can read and contribute to.',
		href: 'https://github.com/windmill-labs/',
		icon: Github
	},
	{
		name: 'Self-hostable',
		description: 'Easy to self-host and deploy on bare EC2 instances, kubernetes and even fargate.',
		href: '/docs/advanced/self_host',
		icon: Server
	},
	{
		name: 'Audit Logs',
		description: 'See all past executions, and find the root cause of mishaps quickly.',
		href: '/docs/reference#audit-log',
		icon: Eye
	},
	{
		name: 'RBAC',
		description:
			'Define visibility, edit rights and executability for your scripts, resources, schedules, etc, using groups, folders and user-level granular permissioning.',
		icon: Key
	},
	{
		name: 'Scalable',
		description:
			'Our workers are horizontally scalable, we scale from 0 to infinity to power all your internal services.',
		icon: ServerStackIcon
	},
	{
		name: 'Air-gapped',
		description:
			'It only require a connection to the internet if you use Hub scripts, otherwise it’s air-gapped and autonomous.',
		icon: Landmark
	}
];

export default function EnterpriseFeatures() {
	return (
		<LandingSection bgClass="white">
			<div className="w-full gap-8 flex flex-col">
				<h1 className="tracking-tight leading-tight text-left font-bold text-black">
					Enterprise-ready platform
				</h1>
				<span className="text-lg text-gray-600 max-w-3xl">
					Deploy faster, build invincible and reliable workflows in an enterprise-grade platform.
				</span>
				<div className="mx-auto w-full">
					<dl className="grid grid-cols-1 lg:grid-cols-3 border">
						{features.map((feature) => (
							<div key={feature.name} className="flex flex-col border p-8 hover:bg-gray-50">
								<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
									<feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
									{feature.name}
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
									<p className="flex-auto">{feature.description}</p>
									{feature.href && (
										<p className="mt-6">
											<a
												href={feature.href}
												className="text-base font-semibold leading-7 text-blue-600"
											>
												Learn more <span aria-hidden="true">→</span>
											</a>
										</p>
									)}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</LandingSection>
	);
}
