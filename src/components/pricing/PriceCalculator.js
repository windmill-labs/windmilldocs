import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';
import classNames from 'classnames';
import Slider from './Slider';

const plans = [
	{ name: 'Core package', description: 'Your own hosted dedicated Windmill cluster without restrictions', price: 600 },];

function calculatePrice(monthlyPrice, period) {
	if (period === 'annually') {
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

export default function PriceCalculator({ period, tier }) {
	const [selected, setSelected] = useState(plans[0]);
	const [seats, setSeats] = useState(tier.price.seat ? tier.price.seat.default : 2);
	const [workers, setWorkers] = useState(tier.price.worker ? tier.price.worker.default : 2);

	function computeTotalPrice() {
		let total = tier.id === 'tier-enterprise' ? calculatePrice(selected.price, period.value) : 0;

		if (tier.price.seat) {
			total += calculatePrice(tier.price.seat.monthly, period.value) * seats;
		}

		if (tier.price.worker) {
			total += calculatePrice(tier.price.worker.monthly, period.value) * workers;
		}

		return total;
	}

	return (
		<div className="mt-16 grow flex flex-col justify-start">
			<div className="flex justify-between items-center">
			<h4>Price</h4>

			<div>
				<span className="text-2xl text-gray-900 font-semibold dark:text-white">
					{priceFormatter.format(computeTotalPrice())}
				</span>
				<span className="text-md text-gray-500">
					{period.value === 'annually' ? '/yr' : '/mo'}
					{(tier.id === 'tier-enterprise' || tier.id === 'tier-enterprise-selfhost') && <span>*</span>}
				</span>
			</div>
			</div>

			<p className="mt-4 flex items-baseline gap-x-1">
				<ul class="flex flex-col gap-2 w-full">
					{Object.keys(tier.price).map((key) => (
						<li key={key} className="flex flex-col ">
							<div className="flex justify-between w-full items-center">
								<div>
									<span className="text-sm text-gray-600 dark:text-gray-200">
										{key === 'worker' ? workers : seats}
									</span>
									<span className="text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-200">
										{' '}
										{key}s:
									</span>
								</div>
								<div>
									<span className="text-sm text-gray-900 font-semibold dark:text-white">
										${calculatePrice(tier.price[key].monthly, period.value)}
									</span>
									<span className="text-sm text-gray-400">
										{period.value === 'annually' ? `/yr/${key}` : `/mo/${key}`}
									</span>
								</div>
							</div>

							<Slider
								min={tier.price[key].min}
								max={tier.price[key].max}
								step={1}
								defaultValue={tier.price[key].default}
								onChange={(value) => {
									if (key === 'worker') {
										setWorkers(value);
									}

									if (key === 'seat') {
										setSeats(value);
									}
								}}
							/>
						</li>
					))}
				</ul>
			</p>
			{tier.id === 'tier-enterprise' ? (
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
													active ? 'border' : 'border-2',
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
							<span>{`${
								seats * 10 * (period.value === 'annually' ? 12 : 1)
							}k executions per `}</span>
							<span>{period.value === 'annually' ? 'year' : 'month'}</span>
						</div>
					</div>
					<div className="flex flex-row gap-1">
						<span className="whitespace-nowrap text-sm">
							{seats} {seats > 1 ? 'users' : 'user'}
						</span>
						<b className="text-sm">OR</b>
						<span className="whitespace-nowrap text-sm">{seats * 2} operators</span>
					</div>
				</div>
			) : null}

			{tier.id === 'tier-enterprise' ? (
				<div className="mt-8 flex flex-col gap-1">
					<h5 className="font-semibold">Summary</h5>
					<div className="mt-2 flex items-baseline gap-x-1">
						<div className="text-sm text-gray-600 mt-1">
							<span>{`${
								workers * 13 * (period.value === 'annually' ? 12 : 1)
							}M executions per `}</span>
							<span>{period.value === 'annually' ? 'year' : 'month'}</span>
						</div>
					</div>
					<div className="flex flex-row gap-1">
						<span className="whitespace-nowrap text-sm">
							{seats} {seats > 1 ? 'users' : 'user'}
						</span>
						<b className="text-sm">OR</b>
						<span className="whitespace-nowrap text-sm">{seats * 2} operators</span>
					</div>
					{tier.id === 'tier-enterprise' && (
					<div className="mt-4 text-sm text-gray-600">
						*We give special discounts to SMBs and small start-ups. Talk to us for custom pricing.
					</div>
				)}
				</div>
			) : null}

			{tier.id === 'tier-enterprise-selfhost' ? (
				<div className="mt-8 flex flex-col gap-1">
					<h5 className="font-semibold">Summary</h5>
					<div className="mt-2 flex items-baseline gap-x-1">
						<div className="text-sm text-gray-600 mt-1">
							<span>{`${
								workers * 13 * (period.value === 'annually' ? 12 : 1)
							}M executions per `}</span>
							<span>{period.value === 'annually' ? 'year' : 'month'}</span>
						</div>
					</div>
					<div className="flex flex-row gap-1">
						<span className="whitespace-nowrap text-sm">
							{seats} {seats > 1 ? 'users' : 'user'}
						</span>
						<b className="text-sm">OR</b>
						<span className="whitespace-nowrap text-sm">{seats * 2} operators</span>
					</div>
					{tier.id === 'tier-enterprise-selfhost' && (
					<div className="mt-4 text-sm text-gray-600">
						*We give special discounts to SMBs and small start-ups. Talk to us for custom pricing.
					</div>
				)}
				</div>
			) : null}
		</div>
	);
}
