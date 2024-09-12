import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';
import classNames from 'classnames';
import Slider from './Slider';
import { QuoteForm } from '../QuoteForm';

const plans = [
	{
		name: 'Core package',
		description: 'Your own hosted dedicated Windmill cluster without restrictions or maintenance.',
		price: 600
	}
];

// Utility function to clamp values between min and max
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
  }

function calculatePrice(monthlyPrice, period, tierId) {
	if (period === 'annually') {
		if (tierId === 'tier-team') {
			return monthlyPrice * 12;
		}
		return monthlyPrice * 10;
	}
	return monthlyPrice;
}

const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

export default function PriceCalculator({ period, tier, selectedOption }) {
	const [selected, setSelected] = useState(plans[0]);
	const [seats, setSeats] = useState(tier.price.seat ? tier.price.seat.default : 2);
	const [vCPUs, setvCPUs] = useState(tier.price.vCPU ? tier.price.vCPU.default : 2);
	const [showQuoteForm, setShowQuoteForm] = useState(false);
  
	// Get the appropriate pricing based on selectedOption and tier.id
	function getPriceByOption() {
	  if (tier.id === 'tier-enterprise-selfhost') {
		if (selectedOption === 'SMB' && tier.price_smb) {
		  return tier.price_smb;
		} else if (selectedOption === 'Nonprofit' && tier.price_nonprofit) {
		  return tier.price_nonprofit;
		}
	  }
	  return tier.price; // Default price if no special option is selected
	}
  
	const pricing = getPriceByOption();
  
	// This effect ensures that seat and vCPU values are clamped to the new tier's limits
	useEffect(() => {
	  if (pricing.seat && seats > pricing.seat.max) {
		setSeats(pricing.seat.max);
	  }
	  if (pricing.vCPU && vCPUs > pricing.vCPU.max) {
		setvCPUs(pricing.vCPU.max);
	  }
	}, [pricing, seats, vCPUs]);
  
	function computeTotalPrice() {
	  let total = 0;
  
	  if (tier.id === 'tier-team') {
		total = calculatePrice(tier.minPrice, period.value, tier.id);
  
		if (pricing.seat) {
		  let additionalSeats = Math.max(0, seats - 1);
		  total += calculatePrice(pricing.seat.monthly, period.value, tier.id) * additionalSeats;
		}
	  } else {
		if (tier.id === 'tier-enterprise-cloud') {
		  total = calculatePrice(selected.price, period.value, tier.id);
		}
  
		if (pricing.seat) {
		  total += calculatePrice(pricing.seat.monthly, period.value, tier.id) * seats;
		}
	  }
  
	  if (pricing.vCPU) {
		total += calculatePrice(pricing.vCPU.monthly, period.value, tier.id) * vCPUs;
	  }
	  return total;
	}

	return (
		<>
			<QuoteForm
				vCPUs={vCPUs}
				seats={seats}
				open={showQuoteForm}

				setOpen={setShowQuoteForm}
				plan={tier.id === 'tier-enterprise-cloud' ? 'cloud_ee' : 'selfhosted_ee'}
				frequency={period.value === 'annually' ? 'yearly' : 'monthly'}
				selectedOption={selectedOption}
			/>
			<div className="grow flex flex-col justify-start">
				<div className="flex justify-between items-center">
					<h4>Price</h4>

					<div>
						<span className="text-2xl text-gray-900 font-semibold dark:text-white">
							{priceFormatter.format(computeTotalPrice())}
						</span>
						<span className="text-md text-gray-500">
							{period.value === 'annually' ? '/yr' : '/mo'}
						</span>
					</div>
				</div>

				<div className="mt-4 flex items-baseline gap-x-1">
								<ul className="flex flex-col gap-2 w-full">
								{Object.keys(pricing).map((key) => (
									<li key={key} className="flex flex-col">
									<div className="flex justify-between w-full items-center">
										<div>
										<span className="text-sm text-gray-600 dark:text-gray-200">
											{key === 'vCPU' ? vCPUs.toLocaleString() : seats.toLocaleString()}
										</span>{' '}
										{key === 'vCPU' ? (
											<>
											<a
												href="#vcpu-reporting"
												className="text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-200 custom-link decoration-gray-600 dark:decoration-gray-200 decoration-0.1 custom-link-offset-1.5"
											>
												{key}s
											</a>{' '}
											<span className="text-sm text-gray-600 dark:text-gray-200">
												({vCPUs * 2} GB of memory)
											</span>
											</>
										) : (
											<span className="text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-200">
											{key}s
											</span>
										)}
										</div>
										<div>
										<span className="text-sm text-gray-900 font-semibold dark:text-white">
											${calculatePrice(pricing[key].monthly, period.value, tier.id)}
										</span>{' '}
										<span className="text-sm text-gray-400">
										{period.value === 'annually' ? `/yr/${key}` : `/mo/${key}`}
									</span>
									</div>
								</div>
								<Slider
									min={pricing[key].min}
									max={pricing[key].max}
									step={1}
									defaultValue={clamp(
									key === 'vCPU' ? vCPUs : seats,
									pricing[key].min,
									pricing[key].max
									)}
									onChange={(value) => {
									if (key === 'vCPU') {
										setvCPUs(clamp(value, pricing[key].min, pricing[key].max));
									}

									if (key === 'seat') {
										setSeats(clamp(value, pricing[key].min, pricing[key].max));
									}
									}}
								/>
								</li>
						))}
					</ul>
				</div>
				{tier.id === 'tier-enterprise-cloud' ? (
					<div className="mt-8">
						<RadioGroup value={selected} onChange={setSelected}>
							<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
							<div className="space-y-4 mt-4">
								{plans.map((plan) => (
									<RadioGroup.Option
										key={plan.name}
										value={plan}
										className={({ checked, active }) =>
											classNames(
												checked ? 'border-transparent' : 'border-gray-300',
												active ? 'border-blue-600 ring-2 ring-blue-600' : '',
												'relative block cursor-pointer rounded-lg border p-3 shadow-sm focus:outline-none sm:flex sm:justify-between'
											)
										}
									>
										{({ active, checked }) => (
											<>
												<span className="flex items-center w-full">
													<span className="flex flex-col text-sm w-full">
														<RadioGroup.Label
															as="span"
															className="font-medium text-gray-900 dark:text-white"
														>
															{plan.name}
														</RadioGroup.Label>
														<RadioGroup.Description
															as="span"
															className="text-gray-500 dark:text-gray-300"
														>
															<span className="block sm:inline">{plan.description}</span>
														</RadioGroup.Description>
														<RadioGroup.Description as="div" className="flex w-full justify-end">
															+
															<span className="text-sm text-gray-900 font-semibold dark:text-white">
																${calculatePrice(plan.price, period.value)}
															</span>
															<span className="text-sm text-gray-500 dark:text-gray-300">
																{period.value === 'annually' ? '/yr' : '/mo'}
															</span>
														</RadioGroup.Description>
													</span>
												</span>

												<span
													className={classNames(
														'border',
														checked ? 'border-blue-600' : 'border-transparent',
														'pointer-events-none absolute -inset-px rounded-lg'
													)}
													aria-hidden="true"
												/>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>
					</div>
				) : null}

				{tier.id === 'tier-team' ? (
					<div className="mt-8 flex flex-col gap-1">
						<h5 className="font-semibold">Summary</h5>
						<div className="mt-2 flex items-baseline gap-x-1">
							<div className="text-sm text-gray-600 mt-1">
								<span>
									{`~${(seats * 10 * (period.value === 'annually' ? 12 : 1)).toLocaleString()}k `}
									<a href="#execution" class="custom-link text-gray-600 dark:text-gray-200">
										executions
									</a>
									{` of 100ms per `}
								</span>
								<span>{period.value === 'annually' ? 'year' : 'month'}</span>
							</div>
						</div>
						<div className="flex flex-row gap-1">
							<span className="whitespace-nowrap text-sm">
								{seats.toLocaleString()} {seats > 1 ? 'developers' : 'developer'}
							</span>
							<b className="text-sm">OR</b>
							<span className="whitespace-nowrap text-sm">
								{(seats * 2).toLocaleString()}{' '}
								<a href="#operator" class="custom-link text-black dark:text-white">
									operators
								</a>
							</span>
						</div>
					</div>
				) : null}

				{tier.id === 'tier-enterprise-cloud' ? (
					<>
						<div className="mt-8 flex flex-col gap-1">
							<h5 className="font-semibold">Summary</h5>
							<div className="mt-2 flex items-baseline gap-x-1">
								<div className="text-sm text-gray-600 dark:text-gray-200 mt-1">
									<span>
										{`~${(vCPUs * 26 * (period.value === 'annually' ? 12 : 1)).toLocaleString()}M `}
										<a href="#execution" class="custom-link text-gray-600 dark:text-gray-200">
											executions
										</a>
										{` of 100ms per `}
									</span>
									<span>{period.value === 'annually' ? 'year' : 'month'}</span>
								</div>
							</div>
							<div className="flex flex-row gap-1">
								<span className="whitespace-nowrap text-sm">
									{seats.toLocaleString()} {seats > 1 ? 'developers' : 'developer'}
								</span>
								<b className="text-sm">OR</b>
								<span className="whitespace-nowrap text-sm">
									{(seats * 2).toLocaleString()}{' '}
									<a href="#operator" class="custom-link text-black dark:text-white">
										operators
									</a>
								</span>
							</div>
						</div>
						<a
							onClick={() => setShowQuoteForm(true)}
							className={classNames(
								'text-sm cursor-pointer border-teal-600 border text-teal-600 shadow-sm hover:text-teal-700 dark:hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950',
								'!no-underline mt-6 block rounded-md py-2 px-3 text-center font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
							)}
						>
							Download quote
						</a>
					</>
				) : null}

				{tier.id === 'tier-enterprise-selfhost' ? (
					<>
						<div className="mt-8 flex flex-col gap-1">
							<div className="flex justify-between items-center">
								<h5 className="font-semibold">Summary</h5>
							</div>
							<div className="mt-2 flex items-baseline gap-x-1">
								<div className="text-sm text-gray-600 dark:text-gray-200 mt-1">
									<span>
										{`~${(vCPUs * 26 * (period.value === 'annually' ? 12 : 1)).toLocaleString()}M `}
										<a href="#execution" class="custom-link text-gray-600 dark:text-gray-200">
											executions
										</a>
										{` of 100ms per `}
									</span>
									<span>{period.value === 'annually' ? 'year' : 'month'}</span>
								</div>
							</div>
							<div className="flex flex-row gap-1">
								<span className="whitespace-nowrap text-sm">
									{seats.toLocaleString()} {seats > 1 ? 'developers' : 'developer'}
								</span>
								<b className="text-sm">OR</b>
								<span className="whitespace-nowrap text-sm">
									{(seats * 2).toLocaleString()}{' '}
									<a href="#operator" class="custom-link text-black dark:text-white">
										operators
									</a>
								</span>
							</div>
						</div>
						<a
						onClick={() => setShowQuoteForm(true)}
						className={classNames(
							'border',
							selectedOption === 'SMB'
							? 'text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 focus-visible:outline-blue-600'
							: 'text-teal-600 border-teal-600 hover:text-teal-700 dark:hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950 focus-visible:outline-teal-600',
							'text-sm cursor-pointer shadow-sm !no-underline mt-6 block rounded-md py-2 px-3 text-center font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
						)}
						>
						Download quote
						</a>
					</>
				) : null}

				{tier.id === 'tierpro' ? (
					<div className="mt-8 flex flex-col gap-1">
						<h5 className="font-semibold">Summary</h5>
						<div className="mt-2 flex items-baseline gap-x-1">
							<div className="text-sm text-gray-600 dark:text-gray-200 mt-1">
								<span>
									{`~${(vCPUs * 26 * (period.value === 'annually' ? 12 : 1)).toLocaleString()}M `}
									<a href="#execution" class="custom-link text-gray-600 dark:text-gray-200">
										executions
									</a>
									{` of 100ms per `}
								</span>
								<span>{period.value === 'annually' ? 'year' : 'month'}</span>
							</div>
						</div>
						<div className="flex flex-row gap-1">
							<span className="whitespace-nowrap text-sm">
								{seats.toLocaleString()} {seats > 1 ? 'developers' : 'developer'}
							</span>
							<b className="text-sm">OR</b>
							<span className="whitespace-nowrap text-sm">
								{(seats * 2).toLocaleString()}{' '}
								<a href="#operator" class="custom-link text-black dark:text-white">
									operators
								</a>
							</span>
						</div>
					</div>
				) : null}
			</div>
		</>
	);
}
