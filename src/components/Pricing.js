import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Circle, CircleDot } from 'lucide-react';

const types = [
	{ value: 'selfhost', label: 'Self-hosted' },
	{ value: 'cloud', label: 'Cloud' }
];

const periods = [
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'annually', label: 'Annually' }
];

function calculatePrice(monthlyPrice, period) {
	if (period === 'annually') {
		return monthlyPrice * 12 * 0.8; // 20% discount for annual period
	}
	return monthlyPrice;
}

const pricing = {
	selfhost: [
		{
			name: 'Free and Open-source',
			id: 'tier-free',
			href: '#',
			price: {},
			description: 'Unlimited users & executions',
			features: [
				'Google/Github/Microsoft/Gitlab SSO',
				'Easy to deploy on Fargate/Docker/Kubernetes',
				'Community support on Discord'
			],
			mostPopular: false
		},
		{
			name: 'Enterprise edition',
			id: 'tier-enterprise',
			href: '#',
			price: {
				worker: {
					monthly: 50,
					description:
						' 1 worker can execute about 13mio executions per month. ( on average a script takes 200ms to execute, so 1 worker can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
					default: 2
				},
				author: {
					monthly: 20,
					description: 'An author can create scripts and flows',
					default: 1
				},
				operator: {
					monthly: 10,
					description: 'An operator can execute scripts and flows',
					default: 0
				}
			},
			description: 'Dedicated support and infrastructure for your company.',
			features: [
				'SAML support including groups synchronization',
				'SLA',
				'Priority Support 24/7 with 3h response time and automation engineer assistance',
				'Design partners for Roadmap',
				'Global cache synchronization'
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
				'1000 executions per month',
				'Community support on discord',
				'Google/Github/Microsoft/Gitlab SSO',
				'Unlimited variables/resources/scripts/apps/flows * (except abuse)'
			],
			mostPopular: false
		},
		{
			name: 'Team',
			id: 'tier-team',
			href: '#',
			price: {
				author: {
					monthly: 10,
					description: 'An author can create scripts and flows',
					default: 1
				},
				operator: {
					monthly: 5,
					description: 'An operator can execute scripts and flows',
					default: 0
				}
			},
			description: 'For small teams that want to automate their processes.',
			features: [
				'Google/Github/Microsoft/Gitlab SSO',
				'Unlimited variables/resources/scripts/apps/flows',
				'Support 24/7 with 48h response time',
				'10k executions per month per seat (10k sec of compute time per month per seat)',
				'Limited to 10 seats'
			],
			mostPopular: true
		},
		{
			name: 'Enterprise',
			id: 'tier-enterprise',
			href: '#',
			price: {
				worker: {
					monthly: 200,
					description:
						' 1 worker can execute about 13mio executions per month. ( on average a script takes 200ms to execute, so 1 worker can execute 5 requests per second, 5  60  60  24  30 = 13mio)',
					default: 2
				},
				author: {
					monthly: 40,
					description: 'An author can create scripts and flows',
					default: 1
				},
				operator: {
					monthly: 20,
					description: 'An operator can execute scripts and flows',
					default: 0
				}
			},
			description: 'Dedicated support and infrastructure for your company.',
			features: [
				'SAML support including groups synchronization',
				'SLA',
				'Priority Support 24/7 with 3h response time and automation engineer assistance',
				'Design partners for Roadmap',
				'Global cache synchronization'
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
		<div className="bg-white py-12">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Pricing plans for teams of all sizes
					</p>
				</div>
				<p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
					Choose an affordable plan that’s packed with the best features for engaging your audience,
					creating customer loyalty, and driving sales.
				</p>
				<div className="mt-16 flex justify-center flex-row gap-2">
					<RadioGroup
						value={frequency}
						onChange={setFrequency}
						className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
					>
						<RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
						{types.map((option) => (
							<RadioGroup.Option
								key={option.value}
								value={option}
								className={({ checked }) =>
									classNames(
										checked ? 'bg-blue-600 text-white' : 'text-gray-500',
										'cursor-pointer rounded-full px-2.5 py-1',
										'transition-all'
									)
								}
							>
								<span>{option.label}</span>
							</RadioGroup.Option>
						))}
					</RadioGroup>
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
										checked ? 'bg-orange-600 text-white' : 'text-gray-500',
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
				<div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{pricing[frequency.value].map((tier, index) => (
						<div
							key={tier.id}
							className={classNames(
								tier.mostPopular ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-200',
								'rounded-3xl p-8 xl:p-10'
							)}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									id={tier.id}
									className={classNames(
										tier.mostPopular ? 'text-blue-600' : 'text-gray-900',
										'text-lg font-semibold leading-8'
									)}
								>
									{tier.name}
								</h3>
								{period.value === 'annually' && Object.keys(tier.price).length > 0 ? (
									<p className="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										20% discount
									</p>
								) : null}
							</div>
							<p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
							<p className="mt-6 flex items-baseline gap-x-1">
								<ul class="flex flex-col gap-2 w-full">
									{Object.keys(tier.price).map((key) => (
										<li key={key} className="flex flex-row justify-between w-full items-center">
											<div className="text-md font-semibold tracking-tight text-gray-900 capitalize ">
												{key}:
											</div>
											<div>
												<span className="text-lg text-gray-900 font-semibold">
													${calculatePrice(tier.price[key].monthly, period.value).toFixed(2)}
												</span>
												<span className="text-sm text-gray-500">
													{period.value === 'annually' ? '/year' : '/month'}
												</span>
											</div>
										</li>
									))}
								</ul>
							</p>
							{index == 0 ? (
								<p className="mt-6 text-sm leading-6 text-gray-500">No payment required.</p>
							) : (
								<a
									href={tier.href}
									aria-describedby={tier.id}
									className={classNames(
										tier.mostPopular
											? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500'
											: 'text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300',
										'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
									)}
								>
									Contact us
								</a>
							)}
							<ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
								{tier.features.map((feature) => (
									<li key={feature} className="flex gap-x-3">
										<Circle className="h-2 w-2 flex-none text-blue-600 mt-2" aria-hidden="true" />
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
