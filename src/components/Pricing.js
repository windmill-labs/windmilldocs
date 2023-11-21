import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';

import PricingFAQ from './pricing/PricingFAQ';
import FeatureList from './pricing/FeatureList';
import PriceCalculator from './pricing/PriceCalculator';
import classNames from 'classnames';

const types = [
	{ value: 'cloud', label: 'Cloud' },
	{ value: 'selfhost', label: 'Self-hosted' },
	{ value: 'whitelabel', label: 'White Label' }
];

const periods = [
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'annually', label: 'Annually' }
];

const pricing = {
	selfhost: [
		{
			name: 'Free and Open-source',
			id: 'tier-free-selfhost',
			href: '/docs/advanced/self_host',
			price: {},
			description: 'Unlimited users & executions.',
			features: [
				{ text: 'Easy deployment on Fargate / Docker / Kubernetes' },
				{ text: 'Community support on Discord' },
				{ text: 'Max 10 users with SSO' }
			],
			mostPopular: false,
			customMessage: 'Learn more',
			minPrice: 0
		},
		{
			name: 'Pro',
			id: 'tiertest',
			href: 'mailto:contact@windmill.dev',
			description: 'Small businesses, young startups, nonprofits.',
			features: [
				{
					text: (
						<span>
							Subset of <b className="text-teal-600">Enterprise</b> Plugins including:
						</span>
					),
					features: [
						{ text: 'Dedicated Workers / High Throughput' },
						{ text: 'Worker Group Management UI' },
						{ text: 'Deploy to staging/prod web UI' },
						{ text: 'Global CSS on App Editor' },
						{ text: 'Multiplayer on WebIDE' },
						{ text: 'Prometheus Metrics' }
					]
				},
				{
					text: (
						<span>
							Priority Support 24/7 with 48h response time and automation engineer assistance
						</span>
					)
				},
				{ text: 'Max 10 users with SSO' }
			],
			minPrice: 48,
			mostPopular: true,
			price: {
				vCPU: {
					monthly: 20,
					description:
						'1 vCPU can execute about 26mio executions per month. (on average a script takes 100ms to execute, so 1 vCPU can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
					default: 2,
					min: 2,
					max: 10
				},
				seat: {
					monthly: 8,
					description: 'An author can create scripts and flows',
					default: 1,
					min: 1,
					max: 10
				}
			}
		},
		{
			name: 'Enterprise',
			id: 'tier-enterprise-selfhost',
			href: 'mailto:contact@windmill.dev',
			price: {
				vCPU: {
					monthly: 50,
					description:
						'1vCPU is usually assigned to 1 worker (or 10 native workers) and each workers can execute about 26mio executions per month. (on average a script takes 100ms to execute, so 1 worker can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
					default: 2,
					min: 2,
					max: 100
				},
				seat: {
					monthly: 20,
					description: 'An author can create scripts and flows',
					default: 1,
					min: 1,
					max: 1000
				}
			},
			minPrice: 120,
			description: 'Dedicated support and infrastructure.',
			features: [
				{
					text: (
						<span>
							Windmill <b className="text-teal-600">Enterprise</b> Edition Plugins:
						</span>
					),
					features: [
						{
							text: (
								<span>
									Everything in <b className="text-blue-500">Pro</b>
								</span>
							)
						},
						{ text: 'Audit logs' },
						{ text: 'Distributed dependency cache backed by S3' },
						{ text: 'SAML support including groups synchronization' }
					]
				},
				{
					text: (
						<span>
							<b>Commercial</b> licence
						</span>
					)
				},
				{
					text: (
						<span>
							<b>SLA & Priority Support 24/7 </b> with 3h response time and engineer assistance
						</span>
					)
				},
				{
					text: (
						<span>
							<b>Design partners for roadmap</b>
						</span>
					)
				},
				{ text: 'Unlimited SSO users' }
			],
			enterprise_edition: true
		}
	],
	cloud: [
		{
			name: 'Community',
			id: 'tier-free',
			href: '/docs/misc/plans_details#community-edition---cloud',
			price: {},
			minPrice: 0,
			description: 'Discover the platform with no commitment and no credit card required.',
			features: [
				{
					text: (
						<span>
							<b>1,000</b> free executions per month
						</span>
					)
				},
				{
					text: <span>Google / Microsoft / GitHub / GitLab SSO</span>
				},
				{
					text: <span>Unlimited variables/resources/scripts/apps/flows (*except abuse)</span>
				},
				{
					text: <span>Groups, folders and granulars permissions</span>
				},
				{
					text: <span>Public apps</span>
				},
				{
					text: <span>Deploy from GitHub</span>
				},
				{
					text: <span>Community support on Discord</span>
				},
				{
					text: (
						<span>
							<a href="/docs/misc/plans_details#community-edition---cloud">All details</a>
						</span>
					)
				}
			],

			mostPopular: false
		},
		{
			name: 'Team',
			id: 'tier-team',
			href: 'https://app.windmill.dev/',
			price: {
				seat: {
					monthly: 10,
					description: 'An author can create scripts and flows',
					default: 1,
					min: 1,
					max: 20
				}
			},
			minPrice: 10,
			description: 'For small teams that want to automate their processes.',
			features: [
				{
					text: <span>Everything in free</span>
				},

				{
					text: (
						<span>
							Audit logs <b>7 days </b>retention
						</span>
					)
				},
				{
					text: <span>Global CSS on App Editor</span>
				},
				{
					text: <span>Multiplayer editing</span>
				},
				{
					text: <span> Each seat includes:</span>,
					features: [
						{ text: 'one user or two operators' },
						{
							text: (
								<span>
									<b>10k</b> executions per month
								</span>
							)
						}
					]
				},
				{
					text: <span>20 seats maximum</span>
				},
				{
					text: (
						<span>
							<b>Priority Support 24/7 </b> with 48h response time and automation engineer
							assistance
						</span>
					)
				},
				{
					text: (
						<span>
							<a href="/docs/misc/plans_details#team-plan---cloud">All details</a>
						</span>
					)
				}
			],
			mostPopular: true,
			customMessage: 'Sign in and upgrade your workspace'
		},
		{
			name: 'Enterprise',
			id: 'tier-enterprise',
			href: 'mailto:contact@windmill.dev',
			enterprise_edition: true,
			price: {
				vCPU: {
					monthly: 100,
					description:
						'1vCPU is usually assigned to 1 worker (or 10 native workers) and each workers can execute about 26 mio executions per month. ( on average a script takes 100ms to execute, so 1 worker can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
					default: 2,
					min: 2,
					max: 100
				},
				seat: {
					monthly: 40,
					description: 'An author can create scripts and flows',
					default: 1,
					min: 1,
					max: 1000
				}
			},
			minPrice: 840,
			description: 'Dedicated support, guidance and infrastructure for your company.',
			features: [
				{
					text: (
						<span>
							Everything in <b className="text-blue-500">Team</b>
						</span>
					)
				},
				{
					text: (
						<span>
							Audit logs <b>60 days </b>retention
						</span>
					)
				},
				{
					text: <span>Deploy to staging/prod web UI</span>
				},
				{
					text: <span>SAML / SCIM support including groups synchronization</span>
				},
				{
					text: <span>Isolated & dedicated database network & vCPUs</span>
				},

				{
					text: (
						<span>
							Each vCPU can run up to <b>~26M</b> jobs per month
						</span>
					)
				},
				{
					text: (
						<span>
							<b>SLA & Priority Support 24/7 </b> with 3h response time and automation engineer
							assistance
						</span>
					)
				},

				{
					text: <span>Design partners for roadmap</span>
				},
				{
					text: (
						<span>
							<a href="/docs/misc/plans_details#enterprise-plan---cloud">All details</a>
						</span>
					)
				}
			],
			mostPopular: false
		}
	],
	whitelabel: [
		{
			name: 'White Labeling Windmill',
			id: 'whitelabel',
			price: {},

			description:
				'Windmill offers white labeling capabilities, allowing you to customize the Windmill platform to align with your brand.',
			features: [
				{ text: 'Embed the entire Windmill app.' },
				{ text: 'Embed specific components (flow builder, app builder).' }
			],
			customMessage: 'Learn more',
			href: '/docs/misc/white_labelling'
		}
	]
};

export default function Pricing() {
	const [frequency, setFrequency] = useState(types[1]);
	const [period, setPeriod] = useState(periods[0]);

	return (
		<div className="pb-12">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing</p>
				</div>

				<div className="mt-12 flex justify-center flex-col gap-4 items-center">
					<RadioGroup
						value={frequency}
						onChange={setFrequency}
						className="grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-md font-semibold leading-5 ring-1 ring-inset ring-gray-200 dark:ring-gray-700"
					>
						<RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
						{types.map((option) => (
							<RadioGroup.Option
								key={option.value}
								value={option}
								className={({ checked }) =>
									classNames(
										checked
											? option.value === 'whitelabel'
												? 'bg-gray-300 text-white'
												: 'bg-blue-600 text-white'
											: '',
										'cursor-pointer rounded-full px-4 py-2',
										'transition-all'
									)
								}
							>
								<span>{option.label}</span>
							</RadioGroup.Option>
						))}
					</RadioGroup>
					<div>
						{frequency.value !== 'whitelabel' && (
							<RadioGroup
								value={period}
								onChange={setPeriod}
								className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200 dark:ring-gray-700"
							>
								<RadioGroup.Label className="sr-only">Payment period</RadioGroup.Label>
								{periods.map((option) => (
									<RadioGroup.Option
										key={option.value}
										value={option}
										className={({ checked }) =>
											classNames(
												checked
													? 'bg-gray-800 dark:bg-gray-200 dark:text-gray-900 text-white'
													: 'text-gray-500',
												'cursor-pointer rounded-full px-2.5 py-1',
												'transition-all'
											)
										}
									>
										<span>{option.label}</span>
									</RadioGroup.Option>
								))}
							</RadioGroup>
						)}
					</div>
				</div>
				<div
					className={classNames(
						'isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none w-full',
						{
							'lg:grid-cols-3': frequency.value === 'cloud' || frequency.value === 'selfhost',
							'lg:grid-cols-1': frequency.value === 'whitelabel'
						}
					)}
				>
					{pricing[frequency.value].map((tier, index) => (
						<div
							key={tier.id}
							className={classNames(
								tier.mostPopular
									? 'ring-1 ring-blue-600'
									: tier.enterprise_edition
									? 'ring-1 ring-teal-600'
									: 'ring-1 ring-gray-200 dark:ring-gray-600',
								'rounded-xl p-6 xl:p-8'
							)}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									id={tier.id}
									className={classNames(
										tier.mostPopular
											? 'text-blue-500'
											: tier.enterprise_edition
											? 'text-teal-600'
											: '',
										'text-2xl font-semibold leading-8'
									)}
								>
									{tier.name}
								</h3>
								{period.value === 'annually' && Object.keys(tier.price).length > 0 ? (
									<p className="whitespace-nowrap rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										16% Discount
									</p>
								) : null}
							</div>

							{tier.minPrice !== undefined ? (
								<p className="mt-6 flex items-baseline gap-x-1">
									<span className="text-sm font-semibold leading-6 text-gray-400">from</span>
									<span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
										$
										{period.value === 'annually'
											? (tier.minPrice * 10).toLocaleString('en-US')
											: tier.minPrice.toLocaleString('en-US')}
									</span>
									<span className="text-sm font-semibold leading-6 text-gray-600">
										{period.value === 'annually' ? '/yr' : '/mo'}
									</span>
								</p>
							) : (
								<p className="mt-6 flex items-baseline gap-x-1 invisible">
									<span className="text-sm font-semibold leading-6 text-gray-600">Lorem</span>
									<span className="text-5xl font-bold tracking-tight text-gray-900">Lorem</span>
									<span className="text-sm font-semibold leading-6 text-gray-600">Lorem</span>
								</p>
							)}

							<p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-200">
								{tier.description}
							</p>

							{index === 0 && (frequency.value === 'selfhost' || frequency.value === 'cloud') ? (
								<a
									aria-describedby={tier.id}
									href={tier.href}
									className={classNames(
										'text-gray-900 ring-1 ring-inset ring-gray-200 dark:ring-gray-600 hover:ring-gray-300 dark:text-white',
										'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
									)}
								>
									No credit card required
								</a>
							) : (
								<a
									href={tier.href}
									aria-describedby={tier.id}
									className={classNames(
										tier.mostPopular
											? 'bg-blue-600 !text-white shadow-sm hover:bg-blue-500 '
											: tier.enterprise_edition
											? 'bg-teal-600 !text-white shadow-sm hover:bg-teal-700 '
											: 'text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300',
										'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
									)}
								>
									{tier.customMessage ? tier.customMessage : 'Get in touch'}
								</a>
							)}
							<ul
								role="list"
								className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
								style={{ marginBottom: '12rem' }}
							>
								<FeatureList features={tier.features} level={1} id={tier.id} />
							</ul>
							{Object.keys(tier.price).length > 0 ? (
								<PriceCalculator tier={tier} period={period} />
							) : null}
							{index === 2 && frequency.value === 'selfhost' && (
								<a
									href="https://billing.windmill.dev/b/8wMaFS51Y0Bl2VacMT"
									className={classNames(
										tier.mostPopular ? 'additional-class-for-most-popular' : '',
										'!text-teal-600 shadow-sm hover:text-teal-800 hover:bg-teal-100 dark:hover:bg-teal-800',
										'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
									)}
									target="_blank"
								>
									Try it for a month
								</a>
							)}
						</div>
					))}
				</div>
			</div>

			<PricingFAQ />
		</div>
	);
}
