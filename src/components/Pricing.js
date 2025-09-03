import React, { useState } from 'react';
import { RadioGroup, Dialog } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

import PricingFAQ from './pricing/PricingFAQ';
import FeatureList, { sections } from './pricing/FeatureList';
import PriceCalculator from './pricing/PriceCalculator';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

const types = [
	{ value: 'cloud', label: 'Cloud' },
	{ value: 'selfhost', label: 'Self-hosted' },
	{ value: 'whitelabel', label: 'White Label' }
];

const periods = [
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'annually', label: 'Annually' }
];

const workerDefaults = {
	workers: 1,
	minWorkers: 1,
	maxWorkers: 100,
	memoryGB: 4,
	minMemoryGB: 10,
	maxMemoryGB: 32,
	memoryPricePerGB: 10,
	maxPricedMemoryGB: 16
};

const pricing = {
	selfhost: [
		{
			name: 'Free and Open-source',
			id: 'tier-free-selfhost',
			href: '/docs/advanced/self_host',
			price: {},
			description: 'Unlimited executions.',
			customMessage: 'Self-host in minutes',
			minPrice: 0,
			features: [
				{ text: 'Easy deployment on Fargate / Docker / Kubernetes' },
				{ text: 'Community support on Discord' },
				{ text: 'Max 10 users with SSO' }
			]
		},
		{
			name: 'Enterprise',
			name_nonprofit: 'Enterprise - Nonprofit',
			name_pro: 'Pro',
			id: 'tier-enterprise-selfhost',
			href: 'mailto:contact@windmill.dev',
			price: {
				worker: {
					default: workerDefaults.workers,
					min: workerDefaults.minWorkers,
					max: workerDefaults.maxWorkers,
					memoryGB: {
						default: workerDefaults.memoryGB,
						min: workerDefaults.minMemoryGB,
						max: workerDefaults.maxMemoryGB,
						pricePerGB: workerDefaults.memoryPricePerGB,
						maxPricedGB: workerDefaults.maxPricedMemoryGB
					},
					native: 50
				},
				seat: {
					monthly: 20,
					default: 1,
					min: 1,
					max: 1000
				}
			},
			price_nonprofit: {
				worker: {
					default: workerDefaults.workers,
					min: workerDefaults.minWorkers,
					max: workerDefaults.maxWorkers,
					memoryGB: {
						default: workerDefaults.memoryGB,
						min: workerDefaults.minMemoryGB,
						max: workerDefaults.maxMemoryGB,
						pricePerGB: workerDefaults.memoryPricePerGB,
						maxPricedGB: workerDefaults.maxPricedMemoryGB
					},
					native: 20
				},
				seat: {
					monthly: 8,
					default: 1,
					min: 1,
					max: 1000
				}
			},
			price_pro: {
				worker: {
					default: workerDefaults.workers,
					min: workerDefaults.minWorkers,
					max: 10,
					memoryGB: {
						default: workerDefaults.memoryGB,
						min: workerDefaults.minMemoryGB,
						max: workerDefaults.maxMemoryGB,
						pricePerGB: workerDefaults.memoryPricePerGB,
						maxPricedGB: workerDefaults.maxPricedMemoryGB
					},
					native: 20
				},
				seat: {
					monthly: 8,
					default: 1,
					min: 1,
					max: 10
				}
			},
			minPrice: 120,
			minPrice_pro: 48,
			minPrice_nonprofit: 48,
			description: 'For advanced needs in observability, security and performance.',
			description_nonprofit: '60% discount for nonprofits & universities, no limits. Free if used as teaching material.',
			description_pro:
				'For individuals and small businesses.',
			enterprise_edition: true,
			features: [
				{
					text: (
						<span>
							Windmill <b className="text-teal-600">Enterprise</b> Edition features (see table
							below), including:
						</span>
					),
					features: [
						{ text: 'Audit logs' },
						{ text: 'Distributed dependency cache backed by S3' },
						{ text: 'SAML support including groups synchronization' }
					]
				},
				{ text: 'Uncapped SSO (requires seats)' },
				{
					text: <span>Commercial licence</span>
				},
				{
					text: (
						<span>SLA & Priority Support 24/7 with 3h response time and engineer assistance</span>
					)
				},
				{
					text: <span>Dedicated Slack or Discord channel</span>
				},
				{
					text: <span>Design partners for roadmap</span>
				}
			],
			features_pro: [
				{
					text: (
						<span>
							Subset of Windmill <b className="text-teal-600">Enterprise</b> Edition Plugins. Limits
							are:
						</span>
					),
					features: [
						{ text: 'No Audit logs' },
						{ text: 'No Distributed dependency cache backed by S3' },
						{ text: 'Max 10 users with SSO' },
						{
							text: (
								<span>
									Max 10{' '}
									<a
										href="#compute-units"
										className="custom-link text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200"
									>
										compute units
									</a>{' '}
									(CU)
								</span>
							)
						}
					]
				},
				{ text: 'Support with 48h response time by email' }
			]
		}
	],
	cloud: [
		{
			name: 'Free',
			id: 'tier-free',
			href: 'https://app.windmill.dev/user/login',
			price: {},
			minPrice: 0,
			customMessage: 'No credit card required',
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
			]
		},
		{
			name: 'Team',
			id: 'tier-team',
			href: 'https://app.windmill.dev/',
			price: {
				seat: {
					monthly: 10,
					default: 1,
					min: 1,
					max: 10
				}
			},
			minPrice: 10,
			description:
				'For small teams that want to automate their processes. Plan is at workspace level.',
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
					text: <span>10 seats maximum</span>
				},
				{
					text: <span>Priority Support on Discord</span>
				}
			],
			customMessage: 'Sign in and upgrade your workspace'
		},
		{
			name: 'Enterprise',
			id: 'tier-enterprise-cloud',
			href: 'mailto:contact@windmill.dev',
			enterprise_edition: true,
			price: {
				worker: {
					default: workerDefaults.workers,
					min: workerDefaults.minWorkers,
					max: workerDefaults.maxWorkers,
					memoryGB: {
						default: workerDefaults.memoryGB,
						min: workerDefaults.minMemoryGB,
						max: workerDefaults.maxMemoryGB,
						pricePerGB: workerDefaults.memoryPricePerGB * 2,
						maxPricedGB: workerDefaults.maxPricedMemoryGB
					},
					native: 100
				},
				seat: {
					monthly: 40,
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
							Everything in <b className="text-blue-600">Team</b>
						</span>
					)
				},
				{
					text: <span>Audit logs unlimited retention</span>
				},
				{
					text: <span>Isolated & dedicated workers and database</span>
				},

				{
					text: <span>Each vCPU can run up to ~26M jobs per month</span>
				},
				{
					text: (
						<span>
							SLA & Priority Support 24/7 with 3h response time, automation engineer assistance and
							dedicated Slack channel
						</span>
					)
				},
				{
					text: <span>Dedicated Slack or Discord channel</span>
				},
				{
					text: <span>Design partners for roadmap</span>
				}
			]
		}
	],
	whitelabel: [
		{
			name: 'White labeling Windmill',
			id: 'whitelabel',
			price: {},

			description:
				'Windmill offers white labeling capabilities, allowing you to embed and customize the Windmill platform to align with your brand.',
			features: [
				{ text: 'Embed the entire Windmill app' },
				{ text: 'Embed specific components (flow builder, app builder) with Windmill React SDK' },
				{ text: 'Private Hub' },
				{ text: 'External auth with JWT' }
			],
			customMessage: 'Learn more',
			href: '/docs/misc/white_labelling'
		}
	]
};

function QualificationModal({ isOpen, closeModal, planType, qualificationText, setQualificationText, onConfirm }) {
	const [organizationName, setOrganizationName] = useState('');

	return (
		<Dialog open={isOpen} onClose={closeModal} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto w-full max-w-2xl rounded-xl bg-white dark:bg-gray-800 p-8">
					<Dialog.Title className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
						Qualify for {planType} Plan
					</Dialog.Title>

					<div className="mb-6">
						<label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
							Organization name
						</label>
						<input
							type="text"
							value={organizationName}
							onChange={(e) => setOrganizationName(e.target.value)}
							className="w-full p-3 text-base border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Enter your organization name"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
							Reason for qualification
						</label>
						<textarea
							value={qualificationText}
							onChange={(e) => setQualificationText(e.target.value)}
							className="w-full p-3 text-base border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							rows={6}
							placeholder={planType === 'Pro' 
								? 'Please explain how you qualify for the Pro plan (e.g., small business size, revenue, etc.).'
								: 'Please explain how you qualify for the Nonprofit plan (e.g., organization status, registration number, etc.).'}
						/>
					</div>

					<div className="flex justify-end gap-4">
						<button
							onClick={closeModal}
							className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
						>
							Cancel
						</button>
						<button
							onClick={() => onConfirm(organizationName)}
							disabled={!qualificationText.trim() || !organizationName.trim()}
							className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Confirm
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}

export default function Pricing() {
	const [frequency, setFrequency] = useState(types[1]);
	const [period, setPeriod] = useState(periods[0]);

	const buttonOptions = ['Pro', 'Nonprofit', 'Enterprise'];

	const [selectedOption, setSelectedOption] = useState('Enterprise');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [qualificationText, setQualificationText] = useState('');
	const [pendingUrl, setPendingUrl] = useState('');

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	const getPricingArray = (removePro) => {
		switch (frequency.value) {
			case 'cloud':
				return pricing.cloud;
			case 'whitelabel':
				return pricing.selfhost;
			case 'selfhost':
			default:
				if (removePro) {
					return pricing.selfhost.filter((tier) => tier.name !== 'Pro');
				} else {
					return pricing.selfhost;
				}
		}
	};

	const handlePlanClick = (url, planType) => {
		if (planType === 'Pro' || planType === 'Nonprofit') {
			setIsModalOpen(true);
			setPendingUrl(url);
		} else {
			window.open(url, '_blank');
		}
	};

	const handleModalConfirm = async (organizationName) => {
		if (pendingUrl && qualificationText.trim()) {
			// Call webhook
			try {
				await fetch('https://app.windmill.dev/api/w/windmill-labs/jobs/run_wait_result/f/f/bd/qualification_trial', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer Mk9WB1kn5ZkVNRW1nbD0sxdnl71KpPPV'
					},
					body: JSON.stringify({
						qualificationText,
						organizationName,
						plan: selectedOption
					})
				});
			} catch (error) {
				console.error('Error sending qualification data:', error);
			}

			// Open the pending URL in a new tab
			window.open(pendingUrl, '_blank');
			
			// Reset modal state
			setIsModalOpen(false);
			setQualificationText('');
			setPendingUrl('');
		}
	};

	return (
		<div className="">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing</p>
					<p className="text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">Open source. Open pricing. No lock-in.</p>
				</div>

				<div className="mt-12 flex justify-center flex-col gap-4 items-center">
					<RadioGroup
						value={frequency}
						onChange={setFrequency}
						className={twMerge(
							'grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-md font-semibold leading-5 ring-1 ring-inset ring-gray-200 dark:ring-gray-700'
						)}
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
						'isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none w-full px-6',
						{
							'lg:grid-cols-3': frequency.value === 'cloud',
							'lg:grid-cols-2': frequency.value === 'selfhost',
							'lg:grid-cols-1': frequency.value === 'whitelabel'
						}
					)}
				>
					{pricing[frequency.value].map((tier) => (
						<div
							key={tier.id}
							className={classNames(
								tier.id === 'tier-team'
									? 'ring-1 ring-blue-600'
									: tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro'
									? 'ring-1 ring-blue-600'
									: tier.enterprise_edition
									? 'ring-1 ring-teal-600'
									: 'ring-1 ring-gray-200 dark:ring-gray-600',
								'rounded-xl p-6 xl:p-8 flex flex-col'
							)}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									id={tier.id}
									className={classNames(
										tier.id === 'tier-team'
											? 'text-blue-600'
											: tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro'
											? 'text-blue-600'
											: tier.enterprise_edition
											? 'text-teal-600'
											: '',
										'text-2xl font-semibold leading-8'
									)}
								>
									{
										tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Nonprofit'
											? tier.name_nonprofit // Display name for Nonprofit
											: tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro'
											? tier.name_pro // Display name for Pro
											: tier.name // Default name
									}
								</h3>
								{tier.id === 'tier-enterprise-selfhost' &&
								selectedOption === 'Nonprofit' &&
								period.value === 'annually' ? (
									<p className="whitespace-nowrap rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										60% nonprofit + 16% annual discount
									</p>
								) : tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Nonprofit' ? (
									<p className="whitespace-nowrap rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										60% nonprofit discount
									</p>
								) : period.value === 'annually' &&
								  Object.keys(tier.price).length > 0 &&
								  tier.id !== 'tier-team' ? (
									<p className="whitespace-nowrap rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										16% annual discount
									</p>
								) : null}
							</div>
							{tier.minPrice !== undefined ? (
								<p className="mt-6 flex items-baseline justify-between gap-x-1">
									<span className="flex items-baseline gap-x-1">
										<span className="text-sm font-semibold leading-6 text-gray-400">from</span>
										<span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
											$
											{period.value === 'annually'
												? tier.id === 'tier-team'
													? (tier.minPrice * 12).toLocaleString('en-US') // Team tier calculation
													: selectedOption === 'Pro' && tier.minPrice_pro !== undefined
													? (tier.minPrice_pro * 10).toLocaleString('en-US') // Annual price for Pro
													: selectedOption === 'Nonprofit' && tier.minPrice_nonprofit !== undefined
													? (tier.minPrice_nonprofit * 10).toLocaleString('en-US') // Annual price for Nonprofit
													: (tier.minPrice * 10).toLocaleString('en-US') // Annual price for others
												: selectedOption === 'Pro' && tier.minPrice_pro !== undefined
												? tier.minPrice_pro.toLocaleString('en-US') // Monthly price for Pro
												: selectedOption === 'Nonprofit' && tier.minPrice_nonprofit !== undefined
												? tier.minPrice_nonprofit.toLocaleString('en-US') // Monthly price for Nonprofit
												: tier.minPrice.toLocaleString('en-US')}
										</span>
										<span className="text-sm font-semibold leading-6 text-gray-600">
											{period.value === 'annually' ? '/yr' : '/mo'}
										</span>
									</span>
									{tier.id === 'tier-enterprise-selfhost' && (
										<span className="isolate inline-flex rounded-md">
											{buttonOptions.map((option) => (
												<button
													key={option}
													type="button"
													onClick={() => handleOptionChange(option)}
													className={classNames(
														'relative inline-flex items-center',
														// Smaller size for default (mobile/smaller screens)
														'px-2 py-1 text-xs font-semibold',
														// Larger size for bigger screens
														'sm:px-3 sm:py-2 sm:text-sm', // Apply larger size on screens larger than "sm"
														option === selectedOption
															? 'bg-gray-500 text-white'
															: 'bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-300',
														'ring-1 ring-inset ring-white dark:ring-zinc-800 hover:bg-gray-100 dark:hover:bg-gray-600 focus:z-10',
														option === 'Pro'
															? 'rounded-l-md'
															: option === 'Enterprise'
															? 'rounded-r-md -ml-px'
															: '-ml-px'
													)}
												>
													{option}
												</button>
											))}
										</span>
									)}
								</p>
							) : (
								<p className="mt-6 flex items-baseline gap-x-1 invisible">
									<span className="text-sm font-semibold leading-6 text-gray-600">Lorem</span>
									<span className="text-5xl font-bold tracking-tight text-gray-900">Lorem</span>
									<span className="text-sm font-semibold leading-6 text-gray-600">Lorem</span>
								</p>
							)}

							<div className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-200">
								<span
									dangerouslySetInnerHTML={{
										__html:
											tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Nonprofit'
												? tier.description_nonprofit // Display the nonprofit description with links
												: tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro'
												? tier.description_pro // Display the Pro description with links
												: tier.description // Default description with links
									}}
								/>
							</div>

							<a
								href={
									tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro'
										? '#pro-plan'
										: tier.href
								}
								target="_blank"
								aria-describedby={tier.id}
								className={classNames(
									tier.id === 'tier-team'
										? 'bg-blue-600 !text-white shadow-sm hover:bg-blue-700'
										: tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro'
										? 'bg-blue-600 !text-white shadow-sm hover:bg-blue-700'
										: tier.enterprise_edition
										? 'bg-teal-600 !text-white shadow-sm hover:bg-teal-700'
										: 'text-gray-900 hover:text-blue-600 dark:hover:text-blue-400 ring-1 ring-inset ring-gray-200 dark:ring-gray-600 hover:ring-gray-300 dark:hover:ring-gray-500 dark:text-white',
									'!no-underline mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600'
								)}
							>
								{tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro'
									? 'Check if you qualify'
									: tier.customMessage
									? tier.customMessage
									: 'Get in touch'}
							</a>

							<ul
								role="list"
								className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
								style={{ marginBottom: '4rem' }}
							>
								{tier.id === 'tier-enterprise-selfhost' && selectedOption === 'Pro' ? (
									<FeatureList features={tier.features_pro} level={1} id={tier.id} />
								) : (
									<FeatureList features={tier.features} level={1} id={tier.id} />
								)}
							</ul>
							<div className="flex flex-col justify-between flex-1">
								{Object.keys(tier.price).length > 0 ? (
									<PriceCalculator
										tier={tier}
										period={period}
										selectedOption={selectedOption}
									/>
								) : null}

								{tier.id === 'tier-enterprise-selfhost' &&
									frequency.value === 'selfhost' &&
									(selectedOption === 'Enterprise' ? (
										<div className="try-it-button">
											<a
												href="https://billing.windmill.dev/b/4gw4hu51YbfZ0N200j"
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handlePlanClick('https://billing.windmill.dev/b/4gw4hu51YbfZ0N200j', 'Enterprise');
												}}
												className="main-section"
											>
												Try it for a month
											</a>
											<a
												href="https://app.windmill.dev/public/windmill-labs/cae76591e9a0c229a338636c50e67066"
												className="hover-section"
												target="_blank"
												onClick={(e) => {
													e.stopPropagation();
												}}
											>
												No credit card?
											</a>
										</div>
									) : (
										<div className="try-it-button">
											<a
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handlePlanClick(
														selectedOption === 'Pro'
															? 'https://billing.windmill.dev/b/28o3dq51Y6ZJ9jy7sM'
															: 'https://billing.windmill.dev/b/4gw4hu51YbfZ0N200j' +
															(selectedOption === 'Nonprofit' ? '?prefilled_promo_code=nonprofit' : ''),
														selectedOption
													);
												}}
												className={classNames(
													selectedOption === 'Pro'
														? 'text-sm bg-blue-600 !text-white shadow-sm hover:bg-blue-700 focus-visible:outline-blue-600'
														: 'text-sm bg-teal-600 !text-white shadow-sm hover:bg-teal-700 focus-visible:outline-teal-600',
													'main-section !no-underline text-center font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
												)}
												style={{ cursor: 'pointer' }}
											>
												Try it for a month
											</a>
											<a
												href={`https://app.windmill.dev/public/windmill-labs/cae76591e9a0c229a338636c50e67066${
													selectedOption !== 'Enterprise' ? `?plan=${selectedOption.toLowerCase()}` : ''
												}`}
												className="hover-section"
												target="_blank"
												onClick={(e) => {
													e.stopPropagation();
												}}
											>
												No credit card?
											</a>
										</div>
									))}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="h-14 "></div>
			{frequency.value !== 'whitelabel' && (
				<div className="relative  dark:bg-gray-950 lg:pt-14">
					<div className="mx-auto max-w-7xl px-6 py-1 lg:px-8">
						{/* Feature comparison (up to lg) */}
						<section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
							<h2 id="mobile-comparison-heading" className="sr-only">
								Feature comparison
							</h2>

							<div className="mx-auto max-w-2xl space-y-16">
								{getPricingArray(true).map((pricingItem) => (
									<div key={pricingItem.id} className="border-t border-gray-900/10">
										<div
											className={classNames(
												pricingItem.id === 'tier-team'
													? 'border-blue-600'
													: pricingItem.enterprise_edition
													? 'border-teal-600'
													: 'border-transparent',
												'-mt-px w-72 border-t-2 pt-4 md:w-80'
											)}
										>
											<h3
												className={classNames(
													pricingItem.id === 'tier-team'
														? 'text-blue-600 dark:text-blue-400'
														: pricingItem.enterprise_edition
														? 'text-teal-600 dark:text-teal-500'
														: 'text-gray-900 dark:text-white',
													'text-sm font-semibold leading-6'
												)}
											>
												{pricingItem.name}
											</h3>
											<div className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200">
												{pricingItem.description}
											</div>
										</div>

										<div className="mt-10 space-y-10">
											{sections.map((section) => (
												<div key={section.name}>
													<h4 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
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
																pricingItem.id === 'tier-team'
																	? 'ring-1 ring-blue-600'
																	: pricingItem.enterprise_edition
																	? 'ring-2 ring-teal-600'
																	: 'ring-1 dark:ring-gray-100/10 ring-gray-900/10',
																'relative rounded-lg bg-white dark:bg-slate-900 shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0'
															)}
														>
															<dl className="divide-y divide-gray-200 text-sm leading-6">
																{section.attributes.map((attribute) => (
																	<div
																		key={attribute.name}
																		className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
																	>
																		<dt className="pr-4 text-gray-600 dark:text-gray-200">
																			{attribute.link ? (
																				<a
																					href={attribute.link}
																					target="_blank"
																					rel="noopener noreferrer"
																					className="custom-link text-gray-600 dark:text-gray-200"
																				>
																					{attribute.name}
																				</a>
																			) : (
																				attribute.name
																			)}
																			{attribute.tooltip && (
																				<span className="ml-2 tooltip-icon">
																					ⓘ<span className="tooltip-text">{attribute.tooltip}</span>
																				</span>
																			)}
																		</dt>
																		<dd className="flex items-center justify-end sm:justify-center sm:px-4">
																			{typeof attribute.tiers[pricingItem.id] === 'string' ? (
																				<span
																					className={
																						pricingItem.id === 'tier-team'
																							? 'font-semibold text-blue-600 dark:text-blue-500'
																							: pricingItem.enterprise_edition
																							? 'font-semibold text-teal-600 dark:text-teal-500'
																							: 'text-gray-900 dark:text-white'
																					}
																				>
																					{attribute.tiers[pricingItem.id]}
																				</span>
																			) : (
																				<>
																					{attribute.tiers[pricingItem.id] === true ? (
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
																						{attribute.tiers[pricingItem.id] === true
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
																pricingItem.id === 'tier-team'
																	? 'ring-1 ring-blue-600'
																	: pricingItem.enterprise_edition
																	? 'ring-2 ring-teal-600'
																	: 'ring-1 dark:ring-gray-100/10 ring-gray-900/10',
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

							<div
								className={twMerge(
									'grid  gap-x-8 border-t border-gray-900/10 before:block',
									frequency.value === 'cloud' ? 'grid-cols-4' : 'grid-cols-3'
								)}
							>
								{getPricingArray(true).map((pricingItem) => (
									<div key={pricingItem.id}>
										<div
											className={classNames(
												pricingItem.id === 'tier-team'
													? 'border-blue-600'
													: pricingItem.enterprise_edition
													? 'border-teal-600'
													: 'border-transparent',
												'border-t-2 pt-10'
											)}
										>
											<p
												className={classNames(
													pricingItem.id === 'tier-team'
														? 'text-blue-600 dark:text-blue-400'
														: pricingItem.enterprise_edition
														? 'text-teal-600 dark:text-teal-500'
														: 'text-gray-900 dark:text-white',
													'text-sm font-semibold leading-6'
												)}
											>
												{pricingItem.name}
											</p>
											<div className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
												{pricingItem.description}
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="mt-6 space-y-16">
								{sections.map((section) => (
									<div key={section.name}>
										<h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
											{section.name}
										</h3>
										<div className="relative -mx-8 reset">
											<table className="relative w-full border-separate border-spacing-x-8">
												<thead>
													<tr className="text-left">
														<th scope="col">
															<span className="sr-only">Feature</span>
														</th>
														{getPricingArray(true).map((pricingItem) => (
															<th key={pricingItem.id} scope="col">
																<span className="sr-only">{pricingItem.id} tier</span>
															</th>
														))}
													</tr>
												</thead>
												<tbody>
													{section.attributes.map((attribute, featureIdx) => (
														<tr key={attribute.name}>
															<th
																scope="row"
																className={twMerge(
																	'py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-600 dark:text-gray-200',
																	frequency.value === 'cloud' ? 'w-1/4' : 'w-1/3'
																)}
															>
																<div className="flex items-center relative">
																	{attribute.link ? (
																		<a
																			href={attribute.link}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="custom-link text-gray-600 dark:text-gray-200"
																		>
																			{attribute.name}
																		</a>
																	) : (
																		<span>{attribute.name}</span>
																	)}
																	{attribute.tooltip && (
																		<span className="ml-2 tooltip-icon">
																			<span style={{ fontSize: '75%' }}>ⓘ</span>
																			<span className="tooltip-text">{attribute.tooltip}</span>
																		</span>
																	)}
																</div>
																{featureIdx !== section.attributes.length - 1 ? (
																	<div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
																) : null}
															</th>
															{getPricingArray(true).map((pricingItem) => (
																<td
																	key={pricingItem.id}
																	className={twMerge(
																		'relative px-4 py-0 text-center ',
																		frequency.value === 'cloud' ? 'w-1/4' : 'w-1/3'
																	)}
																>
																	<span className="relative h-full w-full py-3 ">
																		{typeof attribute.tiers[pricingItem.id] === 'string' ? (
																			<span
																				className={classNames(
																					pricingItem.id === 'tier-team'
																						? 'font-semibold text-blue-600 dark:text-blue-500'
																						: pricingItem.enterprise_edition
																						? 'font-semibold text-teal-600 dark:text-teal-500'
																						: 'text-gray-900 dark:text-white',
																					'text-sm leading-6'
																				)}
																			>
																				{attribute.tiers[pricingItem.id]}
																			</span>
																		) : (
																			<>
																				{attribute.tiers[pricingItem.id] === true ? (
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
																					{attribute.tiers[pricingItem.id] === true ? 'Yes' : 'No'}
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
												className={twMerge(
													'pointer-events-none absolute inset-x-8 inset-y-0 grid gap-x-8 inset-y-0 grid gap-x-8 before:block mt-4',
													frequency.value === 'cloud' ? 'grid-cols-4' : 'grid-cols-3'
												)}
												aria-hidden="true"
											>
												{getPricingArray(true).map((pricingItem) => (
													<div
														key={pricingItem.id}
														className={classNames(
															pricingItem.id === 'tier-team'
																? 'ring-1 ring-blue-600'
																: pricingItem.enterprise_edition
																? 'ring-1 ring-teal-600'
																: 'ring-1 ring-gray-900/10 dark:ring-gray-100/10',
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
			)}
			<div className="relative dark:bg-gray-950 lg:pt-14"></div>
			<PricingFAQ />
			<QualificationModal
				isOpen={isModalOpen}
				closeModal={() => {
					setIsModalOpen(false);
					setQualificationText('');
					setPendingUrl('');
				}}
				planType={selectedOption}
				qualificationText={qualificationText}
				setQualificationText={setQualificationText}
				onConfirm={handleModalConfirm}
			/>
		</div>
	);
}