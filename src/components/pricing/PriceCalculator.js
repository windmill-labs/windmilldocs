import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';

import Slider from './Slider';

const plans = [
	{ name: 'Multi-tenant', description: 'Lorem ipsum', price: 0 },
	{ name: 'Isolated workers and database ', description: 'Available in US/EU/Asia', price: 500 },
	{
		name: 'Dedicated cluster',
		description: 'Dedicated entire kubernetes cluster. Available in US/EU/Asia',
		price: 1000
	}
];

function calculatePrice(monthlyPrice, period) {
	if (period === 'annually') {
		return monthlyPrice * 10;
	}
	return monthlyPrice;
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function PriceCalculator({ period, tier }) {
	const [selected, setSelected] = useState(plans[0]);
	const [seats, setSeats] = useState(2);
	const [workers, setWorkers] = useState(2);

	function computeTotalPrice() {
		let total = calculatePrice(selected.price, period.value);

		if (tier.price.seat) {
			total += calculatePrice(tier.price.seat.monthly, period.value) * seats;
		}

		if (tier.price.worker) {
			total += calculatePrice(tier.price.worker.monthly, period.value) * workers;
		}

		return total.toFixed(2);
	}

	return (
		<div className="mt-16 grow flex flex-col justify-start">
			<div className="flex justify-between items-center">
				<div className="text-md font-semibold leading-8">Price</div>

				<div>
					<span className="text-2xl text-gray-900 font-semibold">${computeTotalPrice()}</span>
					<span className="text-md text-gray-500">
						{period.value === 'annually' ? '/yr' : '/mo'}
					</span>
				</div>
			</div>

			<p className="mt-4 flex items-baseline gap-x-1">
				<ul class="flex flex-col gap-2 w-full">
					{Object.keys(tier.price).map((key) => (
						<li key={key} className="flex flex-col ">
							<div class="flex justify-between w-full items-center">
								<div>
									<span className="text-sm text-gray-500">
										{key === 'worker' ? workers : seats}
									</span>
									<span className="text-sm font-semibold tracking-tight text-gray-900">
										{' '}
										{key}s:
									</span>
								</div>
								<div>
									<span className="text-sm text-gray-900 font-semibold">
										${calculatePrice(tier.price[key].monthly, period.value).toFixed(2)}
									</span>
									<span className="text-sm text-gray-500">
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
										'relative block cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none sm:flex sm:justify-between'
									)
								}
							>
								{({ active, checked }) => (
									<>
										<span className="flex items-center w-full">
											<span className="flex flex-col text-sm w-full">
												<RadioGroup.Label as="span" className="font-medium text-gray-900">
													{plan.name}
												</RadioGroup.Label>
												<RadioGroup.Description as="span" className="text-gray-500">
													<span className="block sm:inline">{plan.description}</span>
												</RadioGroup.Description>
												<RadioGroup.Description as="div" className="flex w-full justify-end">
													<span className="text-sm text-gray-900 font-semibold">
														${calculatePrice(plan.price, period.value).toFixed(2)}
													</span>
													<span className="text-sm text-gray-500">
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
			) : null}
		</div>
	);
}
