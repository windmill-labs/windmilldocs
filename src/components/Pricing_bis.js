import { useState } from 'react';
import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

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
			mostPopular: false,
			customMessage: 'Learn more',
			minPrice: 0,
			features: [
				{ text: 'Easy deployment on Fargate / Docker / Kubernetes' },
				{ text: 'Community support on Discord' },
				{ text: 'Max 10 users with SSO' }
			]
		},
		{
			name: 'Pro',
			id: 'tiertest',
			href: 'mailto:contact@windmill.dev',
			description: 'Small businesses, young startups, nonprofits.',
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
					description: 'A developer can create scripts and flows',
					default: 1,
					min: 1,
					max: 10
				}
			},
			features: [
				{
					text: (
						<span>
							Subset of <b className="text-teal-600">Enterprise</b> Plugins
						</span>
					)
				},
				{
					text: (
						<span>
							Priority Support 24/7 with 48h response time and automation engineer assistance
						</span>
					)
				},
				{ text: 'Max 10 users with SSO' }
			]
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
					description: 'A developer can create scripts and flows',
					default: 1,
					min: 1,
					max: 1000
				}
			},
			minPrice: 120,
			description: 'Dedicated support and infrastructure.',
			enterprise_edition: true,
			features: [
				{
					text: (
						<span>
							Windmill <b className="text-teal-600">Enterprise</b> Edition Plugins:
						</span>
					),
					features: [
						{ text: 'Audit logs' },
						{ text: 'Distributed dependency cache backed by S3' },
						{ text: 'SAML support including groups synchronization' }
					]
				},
				{
					text: <span>Commercial licence</span>
				},
				{
					text: (
						<span>SLA & Priority Support 24/7 with 3h response time and engineer assistance</span>
					)
				},
				{
					text: <span>Design partners for roadmap</span>
				},
				{ text: 'Unlimited SSO users' }
			]
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
					text: <span>1,000 free executions per month</span>
				},
				{
					text: <span>Google / Microsoft / GitHub / GitLab SSO</span>
				},
				{
					text: <span>Unlimited variables/resources/scripts/apps/flows (*except abuse)</span>
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
			href: 'https://app.windmill.dev/',
			price: {
				seat: {
					monthly: 10,
					description: 'A developer can create scripts and flows',
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
					text: <span>Audit logs 7 days retention</span>
				},
				{
					text: <span> Each seat includes:</span>,
					features: [
						{ text: 'one developer or two operators' },
						{
							text: <span>10k executions per month</span>
						}
					]
				},
				{
					text: <span>20 seats maximum</span>
				},
				{
					text: (
						<span>
							Priority Support 24/7 with 48h response time and automation engineer assistance
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
					description: 'A developer can create scripts and flows',
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
					text: <span>Audit logs 60 days retention</span>
				},
				{
					text: <span>Isolated & dedicated database network & vCPUs</span>
				},

				{
					text: <span>Each vCPU can run up to ~26M jobs per month</span>
				},
				{
					text: (
						<span>
							SLA & Priority Support 24/7 with 3h response time and automation engineer assistance
						</span>
					)
				},

				{
					text: <span>Design partners for roadmap</span>
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

const sections = [
	{
		name: 'Catered for business',
		attributes: [
			{
				name: 'Tax Savings',
				tiers: { 'Free and Open-source': true, Pro: true, Enterprise: true },
				link: 'https://www.ycombinator.com/'
			},
			{
				name: 'Easy to use accounting',
				tiers: { 'Free and Open-source': true, Pro: true, Enterprise: true }
			},
			{
				name: 'Multi-accounts',
				tiers: {
					'Free and Open-source': '3 accounts',
					Pro: 'Unlimited accounts',
					Enterprise: '7 accounts'
				}
			},
			{
				name: 'Invoicing',
				tiers: {
					'Free and Open-source': '3 invoices',
					Pro: 'Unlimited invoices',
					Enterprise: '10 invoices'
				}
			},
			{
				name: 'Exclusive offers',
				tiers: { 'Free and Open-source': false, Pro: true, Enterprise: true }
			},
			{
				name: '6 months free advisor',
				tiers: { 'Free and Open-source': false, Pro: true, Enterprise: true }
			},
			{
				name: 'Mobile and web access',
				tiers: { 'Free and Open-source': false, Pro: true, Enterprise: false }
			}
		]
	},
	{
		name: 'Other perks',
		attributes: [
			{
				name: '24/7 customer support',
				tiers: { 'Free and Open-source': true, Pro: true, Enterprise: true }
			},
			{
				name: 'Instant notifications',
				tiers: { 'Free and Open-source': true, Pro: true, Enterprise: true }
			},
			{
				name: 'Budgeting tools',
				tiers: { 'Free and Open-source': true, Pro: true, Enterprise: true }
			},
			{
				name: 'Digital receipts',
				tiers: { 'Free and Open-source': true, Pro: true, Enterprise: true }
			},
			{
				name: 'Pots to separate money',
				tiers: { 'Free and Open-source': false, Pro: true, Enterprise: true }
			},
			{
				name: 'Free bank transfers',
				tiers: { 'Free and Open-source': false, Pro: true, Enterprise: false }
			},
			{
				name: 'Business debit card',
				tiers: { 'Free and Open-source': false, Pro: true, Enterprise: false }
			}
		]
	}
];

export default function Pricing() {
	const [frequency, setFrequency] = useState(types[1]);
	const [period, setPeriod] = useState(periods[0]);

	const getPricingArray = () => {
		switch (frequency.value) {
			case 'cloud':
				return pricing.cloud;
			case 'whitelabel':
				return pricing.selfhost;
			case 'selfhost':
			default:
				return pricing.selfhost;
		}
	};
	return (
		<div className="">
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
								style={{ marginBottom: '4rem' }}
							>
								<FeatureList features={tier.features} level={1} id={tier.id} />
							</ul>
							{Object.keys(tier.price).length > 0 ? (
								<PriceCalculator tier={tier} period={period} />
							) : null}
							{index === 1 && frequency.value === 'selfhost' && (
								<a
									href="https://billing.windmill.dev/b/eVa15ifGC1Fp8fu14f"
									className={classNames(
										tier.mostPopular ? 'additional-class-for-most-popular' : '',
										'!text-blue-600 shadow-sm hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800',
										'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-lg font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
									)}
									target="_blank"
								>
									Try it for a month
								</a>
							)}
							{index === 2 && frequency.value === 'selfhost' && (
								<a
									href="https://billing.windmill.dev/b/8wMaFS51Y0Bl2VacMT"
									className={classNames(
										tier.mostPopular ? 'additional-class-for-most-popular' : '',
										'!text-teal-600 shadow-sm hover:text-teal-800 hover:bg-teal-100 dark:hover:bg-teal-800',
										'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-lg font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
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
			<div className="h-14"></div>
			<div className="relative bg-gray-50 dark:bg-slate-900 lg:pt-14">
				<div className="mx-auto max-w-7xl px-6 py-1 lg:px-8">
					{/* Feature comparison (up to lg) */}
					<section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
						<h2 id="mobile-comparison-heading" className="sr-only">
							Feature comparison
						</h2>

						<div className="mx-auto max-w-2xl space-y-16">
							{getPricingArray().map((pricingItem) => (
								<div key={pricingItem.id} className="border-t border-gray-900/10">
									<div
										className={classNames(
											pricingItem.mostPopular
												? 'border-blue-500'
												: pricingItem.enterprise_edition
												? 'border-teal-600'
												: 'border-transparent',
											'-mt-px w-72 border-t-2 pt-4 md:w-80'
										)}
									>
										<h3
											className={classNames(
												pricingItem.mostPopular
													? 'text-blue-500'
													: pricingItem.enterprise_edition
													? 'text-teal-600'
													: 'text-gray-900',
												'text-sm font-semibold leading-6'
											)}
										>
											{pricingItem.name}
										</h3>
										<p className="mt-1 text-sm leading-6 text-gray-600">
											{pricingItem.description}
										</p>
									</div>

									<div className="mt-10 space-y-10">
										{sections.map((section) => (
											<div key={section.name}>
												<h4 className="text-sm font-semibold leading-6 text-gray-900">
													{section.name}
												</h4>
												<div className="relative mt-6">
													{/* Fake card background */}
													<div
														aria-hidden="true"
														className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block"
													/>

													<div
														className={classNames(
															pricingItem.mostPopular
																? 'ring-1 ring-blue-500'
																: pricingItem.enterprise_edition
																? 'ring-2 ring-teal-600'
																: 'ring-1 ring-gray-900/10',
															'relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0'
														)}
													>
														<dl className="divide-y divide-gray-200 text-sm leading-6">
															{section.attributes.map((attribute) => (
																<div
																	key={attribute.name}
																	className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
																>
																	<dt className="pr-4 text-gray-600">{attribute.name}</dt>
																	<dd className="flex items-center justify-end sm:justify-center sm:px-4">
																		{typeof attribute.tiers[pricingItem.name] === 'string' ? (
																			<span
																				className={
																					pricingItem.mostPopular
																						? 'font-semibold text-blue-500'
																						: pricingItem.enterprise_edition
																						? 'font-semibold text-teal-600'
																						: 'text-gray-900'
																				}
																			>
																				{attribute.tiers[pricingItem.name]}
																			</span>
																		) : (
																			<>
																				{attribute.tiers[pricingItem.name] === true ? (
																					<CheckIcon
																						className="mx-auto h-5 w-5 text-teal-600"
																						aria-hidden="true"
																					/>
																				) : (
																					<XMarkIcon
																						className="mx-auto h-5 w-5 text-gray-400"
																						aria-hidden="true"
																					/>
																				)}

																				<span className="sr-only">
																					{attribute.tiers[pricingItem.name] === true
																						? 'Yes'
																						: 'No'}
																				</span>
																			</>
																		)}
																	</dd>
																</div>
															))}
														</dl>
													</div>

													{/* Fake card border */}
													<div
														aria-hidden="true"
														className={classNames(
															pricingItem.mostPopular
																? 'ring-1 ring-blue-500'
																: pricingItem.enterprise_edition
																? 'ring-2 ring-teal-600'
																: 'ring-1 ring-gray-900/10',
															'pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block'
														)}
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Feature comparison (lg+) */}
					<section aria-labelledby="comparison-heading" className="hidden lg:block">
						<h2 id="comparison-heading" className="sr-only">
							Feature comparison
						</h2>

						<div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block">
							{getPricingArray().map((pricingItem) => (
								<div key={pricingItem.id}>
									<div
										className={classNames(
											pricingItem.mostPopular
												? 'border-blue-500'
												: pricingItem.enterprise_edition
												? 'border-teal-600'
												: 'border-transparent',
											'border-t-2 pt-10'
										)}
									>
										<p
											className={classNames(
												pricingItem.mostPopular
													? 'text-blue-500'
													: pricingItem.enterprise_edition
													? 'text-teal-600'
													: 'text-gray-900 dark:text-white',
												'text-sm font-semibold leading-6'
											)}
										>
											{pricingItem.name}
										</p>
										<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
											{pricingItem.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="-mt-6 space-y-16">
							{sections.map((section) => (
								<div key={section.name}>
									<h3 className="text-sm font-semibold leading-6 text-gray-900">{section.name}</h3>
									<div className="relative -mx-8 mt-10 reset">
										<table className="relative w-full border-separate border-spacing-x-8">
											<thead>
												<tr className="text-left">
													<th scope="col">
														<span className="sr-only">Feature</span>
													</th>
													{getPricingArray().map((pricingItem) => (
														<th key={pricingItem.id} scope="col">
															<span className="sr-only">{pricingItem.name} tier</span>
														</th>
													))}
												</tr>
											</thead>
											<tbody>
												{section.attributes.map((attribute, featureIdx) => (
													<tr key={attribute.name}>
														<th
															scope="row"
															className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
														>
															{attribute.link ? (
																<a
																	href={attribute.link}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="custom-link"
																>
																	{attribute.name}
																</a>
															) : (
																attribute.name
															)}
															{featureIdx !== section.attributes.length - 1 ? (
																<div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
															) : null}
														</th>
														{getPricingArray().map((pricingItem) => (
															<td
																key={pricingItem.id}
																className="relative w-1/4 px-4 py-0 text-center"
															>
																<span className="relative h-full w-full py-3">
																	{typeof attribute.tiers[pricingItem.name] === 'string' ? (
																		<span
																			className={classNames(
																				pricingItem.mostPopular
																					? 'font-semibold text-blue-500'
																					: pricingItem.enterprise_edition
																					? 'font-semibold text-teal-600'
																					: 'text-gray-900',
																				'text-sm leading-6'
																			)}
																		>
																			{attribute.tiers[pricingItem.name]}
																		</span>
																	) : (
																		<>
																			{attribute.tiers[pricingItem.name] === true ? (
																				<CheckIcon
																					className="mx-auto h-5 w-5 text-teal-600"
																					aria-hidden="true"
																				/>
																			) : (
																				<XMarkIcon
																					className="mx-auto h-5 w-5 text-gray-400"
																					aria-hidden="true"
																				/>
																			)}

																			<span className="sr-only">
																				{attribute.tiers[pricingItem.name] === true ? 'Yes' : 'No'}
																			</span>
																		</>
																	)}
																</span>
															</td>
														))}
													</tr>
												))}
											</tbody>
										</table>

										{/* Fake card borders */}
										<div
											className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
											aria-hidden="true"
										>
											{getPricingArray().map((pricingItem) => (
												<div
													key={pricingItem.id}
													className={classNames(
														pricingItem.mostPopular
															? 'ring-1 ring-blue-500'
															: pricingItem.enterprise_edition
															? 'ring-1 ring-teal-600'
															: 'ring-1 ring-gray-900/10',
														'rounded-lg'
													)}
												/>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
			<PricingFAQ />
		</div>
	);
}
