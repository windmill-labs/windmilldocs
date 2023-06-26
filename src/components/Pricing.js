import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';

import PricingFAQ from './pricing/PricingFAQ';
import FeatureList from './pricing/FeatureList';
import PriceCalculator from './pricing/PriceCalculator';
import classNames from 'classnames';

const types = [
	{ value: 'selfhost', label: 'Self-hosted' },
	{ value: 'cloud', label: 'Cloud' }
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
			href: '#',
			price: {},

			description: 'Unlimited users & executions',
			features: [
				{ text: 'Google/Github/Microsoft/Gitlab SSO' },
				{ text: 'Easy to deploy on Fargate/Docker/Kubernetes' },
				{ text: 'Community support on Discord' }
			],
			mostPopular: false
		},
		{
			name: 'Enterprise edition',
			id: 'tier-enterprise-selfhost',
			href: 'mailto:contact@windmill.dev',
			price: {
				worker: {
					monthly: 50,
					description:
						'1 worker can execute about 13mio executions per month. ( on average a script takes 200ms to execute, so 1 worker can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
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
			description: 'Dedicated support and infrastructure for your company.',
			features: [
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
							Windmill Enterprise Edition <b>Plugins</b>
						</span>
					),
					features: [
						{ text: 'Audit logs' },
						{ text: 'Distributed dependency cache backed by S3' },
						{ text: 'SAML support including groups synchronization' },
						{ text: 'Multiplayer on WebIDE' }
					]
				},
				{
					text: (
						<span>
							<b>SLA</b>
						</span>
					)
				},
				{
					text: (
						<span>
							<b>Priority Support 24/7 </b> with 1h response time and automation engineer assistance
						</span>
					)
				},

				{
					text: (
						<span>
							<b>Design partners for Roadmap</b>
						</span>
					)
				}
			],
			mostPopular: true
		}
	],
	cloud: [
		{
			name: 'Free',
			id: 'tier-free',
			href: '#',
			price: {},
			description: 'Discover the platform with no commitment and no credit card required.',
			features: [
				{
					text: <span>Google/Github/Microsoft/Gitlab SSO</span>
				},
				{
					text: (
						<span>
							<b>Unlimited</b> variables/resources/scripts/apps/flows * (except abuse)
						</span>
					)
				},
				{
					text: (
						<span>
							<b>1000</b> free executions per month
						</span>
					)
				},
				{
					text: <span>Public apps</span>
				},
				{
					text: <span>Groups, folders and granual permissions</span>
				},
				{
					text: (
						<span>
							Deploy from <b>Github</b>
						</span>
					)
				},
				{
					text: <span>Community support on Discord</span>
				}
			],

			mostPopular: false
		},
		{
			name: 'Team',
			id: 'tier-team',
			href: '/docs/misc/upgrade#team-edition',
			price: {
				seat: {
					monthly: 10,
					description: 'An author can create scripts and flows',
					default: 1,
					min: 1,
					max: 100
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
					text: <span>Each seat includes:</span>,
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
					text: (
						<span>
							<b>Priority Support 24/7 </b> with 48h response time and automation engineer
							assistance
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
			price: {
				worker: {
					monthly: 100,
					description:
						' 1 worker can execute about 13mio executions per month. ( on average a script takes 200ms to execute, so 1 worker can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
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
			minPrice: 440,
			description: 'Dedicated support and infrastructure for your company.',
			features: [
				{
					text: <span>Everything in Team</span>
				},

				{
					text: (
						<span>
							Each worker can run up to <b>~13M</b> jobs per month
						</span>
					)
				},
				{
					text: (
						<span>
							<b>SAML</b> support including groups synchronization
						</span>
					)
				},
				{
					text: (
						<span>
							<b>SLA</b>
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
					text: (
						<span>
							<b>Priority Support 24/7 </b> with 3h response time and automation engineer assistance
						</span>
					)
				},

				{
					text: (
						<span>
							<b>Design partners for Roadmap</b>
						</span>
					)
				}
			],
			mostPopular: false
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
					<p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pricing</p>
				</div>

				<div className="mt-12 flex justify-center flex-col gap-4 items-center">
					<RadioGroup
						value={frequency}
						onChange={setFrequency}
						className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-md font-semibold leading-5 ring-1 ring-inset ring-gray-200 dark:ring-gray-700"
					>
						<RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
						{types.map((option) => (
							<RadioGroup.Option
								key={option.value}
								value={option}
								className={({ checked }) =>
									classNames(
										checked ? 'bg-blue-600 text-white' : 'text-gray-500',
										'cursor-pointer rounded-full px-4 py-2',
										'transition-all '
									)
								}
							>
								<span>{option.label}</span>
							</RadioGroup.Option>
						))}
					</RadioGroup>
					<div>
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
												? 'bg-black dark:bg-gray-200 dark:text-gray-900 text-white'
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
					</div>
				</div>
				<div
					className={classNames(
						'isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none w-full',
						frequency.value === 'selfhost' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
					)}
				>
					{pricing[frequency.value].map((tier, index) => (
						<div
							key={tier.id}
							className={classNames(
								tier.mostPopular
									? 'ring-2 ring-blue-600'
									: 'ring-1 ring-gray-200 dark:ring-gray-600',
								'rounded-xl p-6 xl:p-8'
							)}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									id={tier.id}
									className={classNames(
										tier.mostPopular ? 'text-blue-600' : 'text-gray-900 ',
										'text-2xl font-semibold leading-8'
									)}
								>
									{tier.name}
								</h3>

								{period.value === 'annually' && Object.keys(tier.price).length > 0 ? (
									<p className="rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										16% Discount
									</p>
								) : null}
							</div>

							{tier.minPrice !== undefined ? (
								<p className="mt-6 flex items-baseline gap-x-1">
									<span className="text-sm font-semibold leading-6 text-gray-600">from</span>
									<span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
										${period.value === 'annually' ? tier.minPrice * 10 : tier.minPrice}
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

							<p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>

							{index == 0 ? (
								<div
									aria-describedby={tier.id}
									className={classNames(
										'text-gray-900 ring-1 ring-inset ring-gray-200 dark:ring-gray-600 hover:ring-gray-300 dark:text-white',
										'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
									)}
								>
									No credit card required
								</div>
							) : (
								<a
									href={tier.href}
									aria-describedby={tier.id}
									className={classNames(
										tier.mostPopular
											? 'bg-blue-600 !text-white shadow-sm hover:bg-blue-500 '
											: 'text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300',
										'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
									)}
								>
									{tier.customMessage ? tier.customMessage : 'Contact us'}
								</a>
							)}
							<ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
								<FeatureList features={tier.features} level={1} id={tier.id} />
							</ul>
							{Object.keys(tier.price).length > 0 ? (
								<PriceCalculator tier={tier} period={period} />
							) : null}
						</div>
					))}
				</div>
			</div>

			<PricingFAQ />
		</div>
	);
}
