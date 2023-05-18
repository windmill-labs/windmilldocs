import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';

import PricingFAQ from './pricing/PricingFAQ';
import FeatureList from './pricing/FeatureList';
import PriceCalculator from './pricing/PriceCalculator';

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
					max: 100
				}
			},
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
					features: [{ text: 'Audit log exports' }, { text: 'Distributed dependency cache' }]
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
							<b>Priority Support 24/7 </b> with 3h response time and automation engineer assistance
						</span>
					)
				},
				{
					text: 'Global cache synchronization'
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
			description: 'Discover the platform with no commitment',
			features: [
				{
					text: (
						<span>
							<b>1000</b> free global executions per month
						</span>
					)
				},
				{
					text: <span>Community support on Discord</span>
				},
				{
					text: <span>Google/Github/Microsoft/Gitlab SSO</span>
				},
				{
					text: (
						<span>
							<b>Unlimited</b> variables/resources/scripts/apps/flows * (except abuse)
						</span>
					)
				}
			],

			mostPopular: false
		},
		{
			name: 'Team',
			id: 'tier-team',
			href: 'https://docs.windmill.dev/docs/misc/upgrade#team-edition',
			price: {
				seat: {
					monthly: 10,
					description: 'An author can create scripts and flows',
					default: 2,
					min: 2,
					max: 10
				}
			},
			description: 'For small teams that want to automate their processes.',
			features: [
				{
					text: <span>Google/Github/Microsoft/Gitlab SSO</span>
				},
				{
					text: (
						<span>
							<b>Unlimited</b> variables/resources/scripts/apps/flows
						</span>
					)
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
							Limited to <b>10</b> seats
						</span>
					),
					features: [{ text: '10k executions per month per seat' }]
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
					monthly: 200,
					description:
						' 1 worker can execute about 13mio executions per month. ( on average a script takes 200ms to execute, so 1 worker can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
					default: 2,
					min: 2,
					max: 100
				},
				seat: {
					monthly: 40,
					description: 'An author can create scripts and flows',
					default: 10,
					min: 10,
					max: 100
				}
			},
			description: 'Dedicated support and infrastructure for your company.',
			features: [
				{
					text: <span>Everything in team</span>
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
							<b>Priority Support 24/7 </b> with 3h response time and automation engineer assistance
						</span>
					)
				},
				{
					text: 'Global cache synchronization'
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

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
	const [frequency, setFrequency] = useState(types[1]);
	const [period, setPeriod] = useState(periods[0]);

	return (
		<div className="bg-white pb-12">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pricing</p>
				</div>

				<div className="mt-12 flex justify-center flex-col gap-4 items-center">
					<RadioGroup
						value={frequency}
						onChange={setFrequency}
						className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-md font-semibold leading-5 ring-1 ring-inset ring-gray-200"
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
							className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
						>
							<RadioGroup.Label className="sr-only">Payment period</RadioGroup.Label>
							{periods.map((option) => (
								<RadioGroup.Option
									key={option.value}
									value={option}
									className={({ checked }) =>
										classNames(
											checked ? 'bg-sky-600 text-white' : 'text-gray-500',
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
								tier.mostPopular ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-200',
								'rounded-xl p-6 xl:p-8'
							)}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									id={tier.id}
									className={classNames(
										tier.mostPopular ? 'text-blue-600' : 'text-gray-900',
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
							<p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>

							{index == 0 ? (
								<p className="mt-6 text-sm leading-6 text-gray-500">No payment required.</p>
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
