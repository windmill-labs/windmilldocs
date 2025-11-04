import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';
import classNames from 'classnames';
import Slider from './Slider';
import MemorySlider from './MemorySlider';
import EditableValue from './EditableValue';
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

const workerGroupDefaults = {
	workers: 2,
	memoryGB: 2
};

// Update the calculateWorkerPrice function
function calculateWorkerPrice(memoryGB, tierId, selectedOption) {
	// For enterprise self-hosted, cap the price calculation at 4GB
	if (tierId === 'tier-enterprise-selfhost') {
		const effectiveMemory = Math.min(4, memoryGB);
		// Base price: Linear interpolation between $25 at 1GB and $100 at 4GB
		let basePrice = 25 + (effectiveMemory - 1) * 25;

		// Apply discounts based on selectedOption
		if (selectedOption === 'Pro' || selectedOption === 'Nonprofit') {
			basePrice = basePrice * 0.4; // 60% discount
		}
		return basePrice;
	}

	// For enterprise cloud, no memory cap - linear scaling
	// Base price: $25 per GB of memory
	return memoryGB * 25;
}

// New reusable component for price display
const PriceDisplay = ({ amount, period, className = "" }) => (
	<span className={className}>
		<span className="font-semibold">{priceFormatter.format(amount)}</span>
		<span className="text-gray-400">/{period === 'annually' ? 'yr' : 'mo'}</span>
	</span>
);

// New component for seats summary
const SeatsSummary = ({ developers, operators }) => (
	<div className="mt-2 flex flex-col gap-1 min-h-[4.5rem]">
		<span className="whitespace-nowrap text-sm text-gray-900 dark:text-white">
			Total seats: {(developers + Math.ceil(operators/2)).toLocaleString()}
		</span>
		<span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-200 ml-4">
			{developers.toLocaleString()} {developers === 1 ? 'developer' : 'developers'}
		</span>
		{operators > 0 && (
			<span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-200 ml-4">
				{operators.toLocaleString()}{' '}
				<a href="#operator" className="custom-link text-gray-600 dark:text-gray-200">
					{operators <= 1 ? 'operator' : 'operators'}
				</a>
				{' '}= {operators/2} {operators/2 <= 1 ? 'seat' : 'seats'}
			</span>
		)}
	</div>
);

// Update the ComputeUnitsSummary component
const ComputeUnitsSummary = ({ workerGroups, nativeWorkers, agentWorkers, selectedOption, tierId }) => {
	// Group workers by memory size
	const groupedWorkers = workerGroups.reduce((acc, group) => {
		// For self-hosted, group all workers with memoryGB >= 4 as 'large'
		const key = tierId === 'tier-enterprise-selfhost' && group.memoryGB >= 4 
			? 4  // Use 4 as key for all large workers
			: group.memoryGB;
		
		if (!acc[key]) {
			acc[key] = 0;
		}
		acc[key] += group.workers;
		return acc;
	}, {});

	const totalComputeUnits = tierId === 'tier-enterprise-cloud'
		? workerGroups.reduce((sum, group) => sum + (group.memoryGB/2 * group.workers), 0) + (nativeWorkers/8) + (agentWorkers/2)
		: Object.entries(groupedWorkers).reduce((sum, [memoryGB, workers]) => {
			memoryGB = Number(memoryGB);
			return sum + (memoryGB === 1 ? workers/2 : memoryGB === 2 ? workers : workers * 2);
		}, 0) + (nativeWorkers/8) + (agentWorkers/1);
	
	return (
		<div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-200 min-h-[6.5rem]">
			<span className="text-gray-900 dark:text-white">
				Total <a href="#compute-units" className="custom-link text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">compute units</a> (CU):
				{' '}<span className={selectedOption === 'Pro' && tierId === 'tier-enterprise-selfhost' && totalComputeUnits > 10 ? "text-rose-700 dark:text-red-400" : ""}>
					{Math.round(totalComputeUnits)}
					{selectedOption === 'Pro' && tierId === 'tier-enterprise-selfhost' && totalComputeUnits > 10 ? ' (max 10 CU on Pro plan)' : ''}
				</span>
			</span>
			{Object.entries(groupedWorkers)
				.sort(([memoryA], [memoryB]) => Number(memoryA) - Number(memoryB))
				.map(([memoryGB, workers]) => {
					memoryGB = Number(memoryGB);
					const computeUnits = tierId === 'tier-enterprise-cloud'
						? (memoryGB/2 * workers)
						: (memoryGB === 1 ? workers/2 : memoryGB === 2 ? workers : workers * 2);

					const getWorkerSizeLabel = (memoryGB, tierId) => {
						if (memoryGB === 1) return 'small';
						if (memoryGB === 2) return 'standard';
						if (tierId === 'tier-enterprise-selfhost') return 'large';
						return `${memoryGB}GB`;
					};

					return computeUnits > 0 && (
						<span key={memoryGB} className="ml-4">
							{workers} {' '}
							<span className={
								memoryGB === 1 ? "font-semibold text-blue-800 dark:text-blue-600" : 
								memoryGB === 2 ? "font-semibold text-blue-600 dark:text-blue-500" : 
								tierId === 'tier-enterprise-selfhost' ? "font-semibold text-blue-500 dark:text-blue-400" :
								"font-semibold"
							}>
								{getWorkerSizeLabel(memoryGB, tierId)}
							</span>{' '}
							{workers === 1 ? 'worker' : 'workers'} = {computeUnits} CU
						</span>
					);
				})}
			{nativeWorkers > 0 && (
				<span className="ml-4">{nativeWorkers} native {nativeWorkers === 1 ? 'worker' : 'workers'} = {nativeWorkers/8} CU</span>
			)}
			{agentWorkers > 0 && (
				<span className="ml-4">{agentWorkers} agent {agentWorkers === 1 ? 'worker' : 'workers'} = {tierId === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1} CU</span>
			)}
		</div>
	);
};

// Move getWorkerCounts outside of the main component
function getWorkerCounts(workerGroups) {
	return workerGroups.reduce((acc, group) => {
		const size = group.memoryGB === 1 ? 'small' : 
					 group.memoryGB === 2 ? 'standard' : 'large';
		acc[size] = (acc[size] || 0) + group.workers;
		return acc;
	}, {});
}

export default function PriceCalculator({ period, tier, selectedOption }) {
	const [selected, setSelected] = useState(plans[0]);
	const [developers, setDevelopers] = useState(tier.price.seat ? tier.price.seat.default : 2);
	const [operators, setOperators] = useState(0);
	const [showQuoteForm, setShowQuoteForm] = useState(false);

	// Add new state for worker groups
	const [workerGroups, setWorkerGroups] = useState(
		(tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') 
			? [{ workers: workerGroupDefaults.workers, memoryGB: workerGroupDefaults.memoryGB }]
			: []
	);

	// Update the initial state of nativeWorkers to 8
	const [nativeWorkers, setNativeWorkers] = useState(8);
	// Add agent workers state
	const [agentWorkers, setAgentWorkers] = useState(0);

	// Get the appropriate pricing based on selectedOption and tier.id
	function getPriceByOption() {
		if (tier.id === 'tier-enterprise-selfhost') {
			if (selectedOption === 'Pro' && tier.price_pro) {
				return tier.price_pro;
			} else if (selectedOption === 'Nonprofit' && tier.price_nonprofit) {
				return tier.price_nonprofit;
			}
		}
		return tier.price; // Default price if no special option is selected
	}

	const pricing = getPriceByOption();

	// This effect ensures that seat values are clamped to the new tier's limits
	useEffect(() => {
		if (pricing.seat && developers > pricing.seat.max) {
			setDevelopers(pricing.seat.max);
		}
	}, [pricing, developers]);

	// Replace the existing computeTotalPrice function
	function computeTotalPrice() {
		let total = 0;

		if (tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') {
			// Calculate seats cost (before period multiplier)
			if (pricing.seat) {
				const totalSeats = developers + Math.ceil(operators/2);
				total += pricing.seat.monthly * totalSeats;
			}

			// Calculate total compute units and round up
			const counts = getWorkerCounts(workerGroups);
			const totalComputeUnits = Math.ceil(
				(counts.small / 2 || 0) + 
				(counts.standard || 0) + 
				((1/8) * nativeWorkers) + 
				(tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1) + 
				(2 * (counts.large || 0))
			);

			// Calculate cost based on total compute units
			let workersTotal = 0;
			workerGroups.forEach(group => {
				const pricePerWorker = calculateWorkerPrice(group.memoryGB, tier.id, selectedOption) * 
					(tier.id === 'tier-enterprise-cloud' ? 2 : 1);
				workersTotal += pricePerWorker * group.workers;
			});

			// Add native workers cost
			let nativeWorkersCost = 0;
			if (pricing.worker?.native) {
				nativeWorkersCost = (pricing.worker.native * nativeWorkers / 8);
			}

			// Add agent workers cost
			let agentWorkersCost = 0;
			if (pricing.worker?.agent) {
				agentWorkersCost = (pricing.worker.agent * (tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1));
			}

			// Apply minimum worker group pricing
			let minimumWorkerPrice = tier.id === 'tier-enterprise-cloud' ? 200 : 100;
			if (tier.id === 'tier-enterprise-selfhost' && (selectedOption === 'Pro' || selectedOption === 'Nonprofit')) {
				minimumWorkerPrice = 40;
			}
			
			const totalWorkersCost = workersTotal + nativeWorkersCost + agentWorkersCost;
			if (totalWorkersCost < minimumWorkerPrice) {
				total += minimumWorkerPrice;
			} else {
				// Adjust the cost based on the ceiling of compute units
				const adjustmentFactor = totalComputeUnits / ((counts.small / 2 || 0) + (counts.standard || 0) + ((1/8) * nativeWorkers) + (tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1) + (2 * (counts.large || 0)));
				total += totalWorkersCost * adjustmentFactor;
			}

			// Add core package price for enterprise cloud
			if (tier.id === 'tier-enterprise-cloud') {
				total += selected.price;
			}

			// Apply period multiplier to the total at the end
			total = calculatePrice(total, period.value, tier.id);
		} else {
			if (pricing.seat) {
				const totalSeats = developers + Math.ceil(operators/2);
				total += calculatePrice(pricing.seat.monthly, period.value, tier.id) * totalSeats;
			}
		}

		return total;
	}

	// Add handler for adding new worker groups
	const addWorkerGroup = () => {
		setWorkerGroups([
			...workerGroups,
			{ workers: workerGroupDefaults.workers, memoryGB: workerGroupDefaults.memoryGB }
		]);
	};

	// Add handler for updating worker group values
	const updateWorkerGroup = (index, field, value) => {
		const newGroups = [...workerGroups];
		newGroups[index][field] = value;
		setWorkerGroups(newGroups);
	};

	// Add handler for removing worker groups
	const removeWorkerGroup = (index) => {
		if (workerGroups.length > 1) {
			const newGroups = workerGroups.filter((_, i) => i !== index);
			setWorkerGroups(newGroups);
		}
	};

	// Update the getWorkerCountsForQuote function
	function getWorkerCountsForQuote() {
		if (tier.id === 'tier-enterprise-cloud') {
			return {
				workerGroups,  // Pass the full worker groups array for cloud
				native: nativeWorkers / 8,
				agent: agentWorkers / 2
			};
		} else {
			// For self-hosted, use the original categorization
			const counts = getWorkerCounts(workerGroups);
			return {
				native: nativeWorkers / 8,
				small: counts.small || 0,
				standard: counts.standard || 0,
				large: counts.large || 0
			};
		}
	}

	return (
		<>
			<QuoteForm
				workers={getWorkerCountsForQuote()}
				developers={developers}
				operators={operators}
				open={showQuoteForm}
				setOpen={setShowQuoteForm}
				plan={tier.id === 'tier-enterprise-cloud' ? 'cloud_ee' : 'selfhosted_ee'}
				frequency={period.value === 'annually' ? 'yearly' : 'monthly'}
				selectedOption={selectedOption}
				total_price={computeTotalPrice()}
			/>
			<div className="grow flex flex-col justify-start">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<h3 className="m-0 font-semibold">Price</h3>
						<div className="ml-4">
							{(tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') && (
								<>
									{/* Existing minimum price warning */}
									{(workerGroups.reduce((sum, group) => {
										const pricePerWorker = calculateWorkerPrice(group.memoryGB, tier.id, selectedOption) * 
											(tier.id === 'tier-enterprise-cloud' ? 2 : 1);
										return sum + (pricePerWorker * group.workers);
									}, 0) + (pricing.worker?.native * nativeWorkers / 8) + (pricing.worker?.agent * (tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1))) < 
									(tier.id === 'tier-enterprise-cloud' ? 200 : 
										(tier.id === 'tier-enterprise-selfhost' && (selectedOption === 'Pro' || selectedOption === 'Nonprofit') ? 40 : 100)) && (
										<span className="text-sm text-rose-700 dark:text-red-400">
											Price for workers can't be below ${tier.id === 'tier-enterprise-cloud' 
												? (period.value === 'annually' ? '2,000' : '200') 
												: (tier.id === 'tier-enterprise-selfhost' && (selectedOption === 'Pro' || selectedOption === 'Nonprofit')
													? (period.value === 'annually' ? '400' : '40')
													: (period.value === 'annually' ? '1,000' : '100'))}
											/{period.value === 'annually' ? 'yr' : 'mo'}
										</span>
									)}

									{/* New CU limit warning for Pro - only for self-hosted */}
									{selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' && (
										(() => {
											const counts = getWorkerCounts(workerGroups);
											const totalComputeUnits = (counts.small / 2 || 0) + 
												(counts.standard || 0) + 
												((1/8) * nativeWorkers) + 
												(tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1) + 
												(2 * (counts.large || 0));
											
											return totalComputeUnits > 10 ? (
												<span className="text-sm text-rose-700 dark:text-red-400">
													Maximum 10 CU on Pro plan, go to Enterprise if above
												</span>
											) : null;
										})()
									)}
								</>
							)}
						</div>
					</div>

					<div>
						{(() => {
							const counts = getWorkerCounts(workerGroups);
							const totalComputeUnits = (counts.small / 2 || 0) + 
								(counts.standard || 0) + 
								((1/8) * nativeWorkers) + 
								(tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1) + 
								(2 * (counts.large || 0));
							const isOverLimit = selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' && totalComputeUnits > 10;
							const textColor = isOverLimit ? "text-rose-700 dark:text-red-400" : "text-gray-900 dark:text-white";
							const subTextColor = isOverLimit ? "text-rose-700 dark:text-red-400" : "text-gray-500";

							return (
								<>
									<span className={classNames("text-2xl font-semibold", textColor)}>
										{priceFormatter.format(computeTotalPrice())}
									</span>
									<span className={classNames("text-md", subTextColor)}>
										{period.value === 'annually' ? '/yr' : '/mo'}
									</span>
								</>
							);
						})()}
					</div>
				</div>

				<div className="mt-8 flex items-baseline gap-x-1">
					<ul className="flex flex-col gap-2 w-full">
						{/* Show seats slider if applicable */}
						{pricing.seat && (
							<>
								<li className="flex flex-col">
									<div className="flex justify-between w-full items-center">
										<div>
											<span className="text-sm font-semibold text-gray-600 dark:text-gray-200">
												<EditableValue
													value={developers}
													onChange={(value) => setDevelopers(clamp(value, 1, pricing.seat.max))}
													min={1}
													max={pricing.seat.max}
													step={1}
												/>
											</span>
											<span className="text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-200">
												{' '}{developers === 1 ? 'developer' : 'developers'}
											</span>
										</div>
										<div>
											<span className="text-sm text-gray-900 font-semibold dark:text-white">
												${calculatePrice(pricing.seat.monthly, period.value, tier.id)}
											</span>{' '}
											<span className="text-sm text-gray-400">
												{period.value === 'annually' ? `/yr/dev` : `/mo/dev`}
											</span>
										</div>
									</div>
									<Slider
										min={1}
										max={pricing.seat.max}
										step={1}
										defaultValue={developers}
										onChange={(value) => {
											setDevelopers(clamp(value, 1, pricing.seat.max));
										}}
									/>
								</li>

								<li className="flex flex-col mt-2">
									<div className="flex justify-between w-full items-center">
										<div>
											<span className="text-sm font-semibold text-gray-600 dark:text-gray-200">
												<EditableValue
													value={operators}
													onChange={(value) => setOperators(clamp(value, 0, pricing.seat.max * 2))}
													min={0}
													max={pricing.seat.max * 2}
													step={2}
												/>
											</span>
											<span className="text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-200">
												{' '}{operators <= 1 ? 'operator' : 'operators'}{' '}
												<span className="relative group">
													<svg className="inline-block w-3 h-3 text-blue-800 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													<span className="invisible group-hover:visible absolute z-10 w-96 p-2 mt-2 text-sm font-normal text-white bg-slate-800 rounded-lg shadow-lg">
														An <a href="#operator" className="text-blue-400 hover:text-blue-500">operator</a> is a user who can only execute scripts, flows and apps, but not create and edit them. Operators are 1/2 price of developers (or 1/2 seats).
													</span>
												</span>
											</span>
										</div>
										<div>
											<span className="text-sm text-gray-900 font-semibold dark:text-white">
												${calculatePrice(pricing.seat.monthly / 2, period.value, tier.id)}
											</span>{' '}
											<span className="text-sm text-gray-400">
												{period.value === 'annually' ? `/yr/op` : `/mo/op`}
											</span>
										</div>
									</div>
									<Slider
										min={0}
										max={pricing.seat.max * 2}
										step={2}
										defaultValue={operators}
										onChange={(value) => {
											setOperators(clamp(value, 0, pricing.seat.max * 2));
										}}
									/>
								</li>
							</>
						)}

						{/* Move plans section here for enterprise cloud */}
						{tier.id === 'tier-enterprise-cloud' && (
							<div className="mt-8">
								<RadioGroup value={selected} onChange={setSelected}>
									<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
									<div className="space-y-4 mt-4">
										{plans.map((plan) => (
											<RadioGroup.Option
												key={plan.name}
												value={plan}
											>
												{({ checked, active }) => (
													<div className={classNames(
														checked ? 'border-transparent' : 'border-gray-300',
														active ? 'border-blue-600 ring-2 ring-blue-600' : '',
														'relative block cursor-pointer rounded-lg border p-3 shadow-sm focus:outline-none sm:flex sm:justify-between'
													)}>
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
																		${calculatePrice(plan.price, period.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
													</div>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>
						)}

						{/* Add the simulation text here for enterprise plans */}
						{(tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') && (
							<p className="mt-6 text-sm text-gray-600 dark:text-gray-200">
								Get a simulation of the number of Units needed by reproducing your workers config below.{' '}
								<a href="#number-of-compute-units" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
									More details
								</a>
							</p>
						)}

						{/* Existing worker groups section */}
						{(tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') && (
							<div className="mt-6">
								{workerGroups.map((group, index) => (
									<li key={index} className="flex flex-col gap-2 p-4 border rounded-lg mt-2 group relative">
										<div className="flex justify-between items-center">
											<h6 className="font-semibold">Worker group {index + 1}</h6>
											{workerGroups.length > 1 && (
												<button
													onClick={() => removeWorkerGroup(index)}
													className="text-sm text-red-300 hover:text-red-500 invisible group-hover:visible absolute top-4 right-4"
													aria-label="Remove worker group"
												>
													Remove
												</button>
											)}
										</div>
										
										{/* Number of workers slider */}
										<div className="flex justify-between w-full items-center">
										<span className="text-sm text-gray-600 dark:text-gray-200">
												<EditableValue
													value={group.workers}
													onChange={(value) => updateWorkerGroup(index, 'workers', value)}
													min={1}
													max={selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' ? 10 : 1000}
													step={1}
													formatDisplay={(val) => val % 1000 === 0 ? `${val/1000}k` : val.toLocaleString()}
												/>{" "}
												{group.workers === 1 ? (
													<>
														<span className={
															group.memoryGB === 1 ? "font-semibold text-blue-800 dark:text-blue-600" :
															group.memoryGB === 2 ? "font-semibold text-blue-600 dark:text-blue-500" :
															"font-semibold text-blue-500 dark:text-blue-400"
														}>
															{group.memoryGB === 1 ? 'small' :
															 group.memoryGB === 2 ? 'standard' :
															 tier.id === 'tier-enterprise-cloud' ? `${group.memoryGB}GB` :
															 'large'}
														</span>{" "}
														worker
													</>
												) : (
													<>
														<span className={
															group.memoryGB === 1 ? "font-semibold text-blue-800 dark:text-blue-600" :
															group.memoryGB === 2 ? "font-semibold text-blue-600 dark:text-blue-500" :
															"font-semibold text-blue-500 dark:text-blue-400"
														}>
															{group.memoryGB === 1 ? 'small' :
															 group.memoryGB === 2 ? 'standard' :
															 tier.id === 'tier-enterprise-cloud' ? `${group.memoryGB}GB` :
															 'large'}
														</span>{" "}
														workers
													</>
												)}
											</span>
											<span className="text-sm text-gray-900 dark:text-white">
												<span className="font-normal text-gray-400 dark:text-gray-300">
													{(tier.id === 'tier-enterprise-cloud'
														? (group.memoryGB/2 * group.workers)
														: (group.memoryGB === 1 ? group.workers/2 : group.memoryGB === 2 ? group.workers : group.workers * 2)
													).toLocaleString()} CU
												</span>
												{' · '}
												<span className="font-semibold">
													${(Math.round(calculateWorkerPrice(group.memoryGB, tier.id, selectedOption) * group.workers *
														(tier.id === 'tier-enterprise-cloud' ? 2 : 1) *
														(period.value === 'annually' ? 10 : 1) * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 1})}
													/{period.value === 'annually' ? 'yr' : 'mo'}
												</span>
											</span>
										</div>
										<Slider
											min={1}
											max={selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' ? 10 : 1000}
											step={1}
											defaultValue={group.workers}
											onChange={(value) => updateWorkerGroup(index, 'workers', value)}
										/>

										{/* Memory per worker slider */}
										<div className="flex justify-between w-full items-center">
											<span className="text-sm text-gray-600 dark:text-gray-200">
												<EditableValue
													value={group.memoryGB}
													onChange={(value) => {
														// Snap to nearest valid step
														const steps = [1, 2, 4, 6, 8, 12, 14, 16, 32, 48, 64, 80, 96, 112, 128];
														const nearest = steps.reduce((prev, curr) =>
															Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
														);
														updateWorkerGroup(index, 'memoryGB', nearest);
													}}
													min={1}
													max={128}
													step={1}
												/>GB memory limit {tier.id === 'tier-enterprise-cloud' && group.memoryGB >= 10 ? '/ worker' : 'per worker'}
											</span>
											<span className="text-sm text-gray-900 font-semibold dark:text-white">
												{group.memoryGB >= 4 && tier.id === 'tier-enterprise-selfhost' && (
													<span className="text-sm font-normal text-gray-400 dark:text-gray-300 mr-2">(Price cap)</span>
												)}
												${(Math.round(calculateWorkerPrice(group.memoryGB, tier.id, selectedOption) * (tier.id === 'tier-enterprise-cloud' ? 2 : 1) * (period.value === 'annually' ? 10 : 1) * 10) / 10).toFixed(1).replace('.0', '')} /worker/{period.value === 'annually' ? 'yr' : 'mo'}
											</span>
										</div>
										<MemorySlider
											min={1}
											max={128}
											defaultValue={group.memoryGB}
											onChange={(value) => updateWorkerGroup(index, 'memoryGB', value)}
											steps={[1, 2, 4, 6, 8, 12, 14, 16, 32, 48, 64, 80, 96, 112, 128]}
										/>
									</li>
								))}
								
								<button
									onClick={addWorkerGroup}
									className="mt-2 text-sm text-blue-600 hover:text-blue-500 dark:text-slate-100 dark:hover:text-white font-semibold"
								>
									+ Add worker group
								</button>
							</div>
						)}
						{(tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') && (
							<li className="flex flex-col gap-2 p-4 border rounded-lg mt-8">
								<h6 className="font-semibold">
									Native workers{' '}
									<span className="relative group">
										<svg className="inline-block w-3 h-3 text-blue-800 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span className="invisible group-hover:visible absolute z-10 w-96 p-2 mt-2 text-sm font-normal text-white bg-slate-800 rounded-lg shadow-lg">
											<a href="#native-workers" className="text-blue-400 hover:text-blue-500">Native</a> workers are workers within the native <a href="/docs/core_concepts/worker_groups#native-workers" className="text-blue-400 hover:text-blue-500">worker group</a>. This group is pre-configured to listen to native jobs tags (query languages). Those jobs are executed under a special mode with subworkers for increased throughput. You can set the number of native workers to 0.
										</span>
									</span>
								</h6>
								
								<div className="flex justify-between w-full items-center">
									<span className="text-sm text-gray-600 dark:text-gray-200">
										<EditableValue
											value={nativeWorkers}
											onChange={(value) => setNativeWorkers(value)}
											min={0}
											max={selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' ? 32 : 200}
											step={8}
										/> native {nativeWorkers === 0 ? 'worker' : 'workers'}
									</span>
									<span className="text-sm text-gray-900 font-semibold dark:text-white">
										${(Math.round((pricing.worker.native * nativeWorkers / 8) * (period.value === 'annually' ? 10 : 1) * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 1})} /{period.value === 'annually' ? 'yr' : 'mo'}
									</span>
								</div>
								<Slider
									min={0}
									max={selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' ? 32 : 200}
									step={8}
									defaultValue={nativeWorkers}
									onChange={(value) => setNativeWorkers(value)}
									noExponential={true}
								/>
							</li>
						)}
						{(tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') && (
							<li className="flex flex-col gap-2 p-4 border rounded-lg mt-8">
								<h6 className="font-semibold">
									Agent workers{' '}
									<span className="relative group">
										<svg className="inline-block w-3 h-3 text-blue-800 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span className="invisible group-hover:visible absolute z-10 w-96 p-2 mt-2 text-sm font-normal text-white bg-slate-800 rounded-lg shadow-lg">
											<a href="#agent-workers" className="text-blue-400 hover:text-blue-500">Agent</a> workers are specialized workers that handle AI agent tasks and workflows. Each agent worker counts as 1 Compute Unit on the self-hosted plan and 0.5 Compute Unit on the cloud plan. Unless you are using agent workers for compute on a large machine, we will count them as 1 Compute Unit on cloud and 2 Compute Units on self-hosted.
										</span>
									</span>
								</h6>
								
								<div className="flex justify-between w-full items-center">
									<span className="text-sm text-gray-600 dark:text-gray-200">
										<EditableValue
											value={agentWorkers}
											onChange={(value) => setAgentWorkers(value)}
											min={0}
											max={selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' ? 10 : 200}
											step={tier.id === 'tier-enterprise-cloud' ? 2 : 1}
										/> agent {agentWorkers === 1 ? 'worker' : 'workers'}
									</span>
									<span className="text-sm text-gray-900 font-semibold dark:text-white">
										${(Math.round((pricing.worker.agent * (tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1)) * (period.value === 'annually' ? 10 : 1) * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 1})} /{period.value === 'annually' ? 'yr' : 'mo'}
									</span>
								</div>
								<Slider
									min={0}
									max={selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' ? 10 : 200}
									step={tier.id === 'tier-enterprise-cloud' ? 2 : 1}
									defaultValue={agentWorkers}
									onChange={(value) => setAgentWorkers(value)}
									exponential={true}
								/>
							</li>
						)}
					</ul>
				</div>
				{tier.id === 'tier-team' ? (
					<div className="mt-8 flex flex-col gap-1">
						<h5 className="font-semibold">Summary</h5>
						<div className="mt-2 flex items-baseline gap-x-1">
							<div className="text-sm text-gray-600 dark:text-gray-200 mt-1">
								<span>
									{`~${(developers * 10 * (period.value === 'annually' ? 12 : 1)).toLocaleString()}k `}
									<a href="#execution" class="custom-link text-gray-600 dark:text-gray-200">
										executions
									</a>
									{` of 1s per `}
								</span>
								<span>{period.value === 'annually' ? 'year' : 'month'}</span>
							</div>
						</div>
						<div className="mt-2 flex flex-col gap-1">
								<span className="whitespace-nowrap text-sm text-gray-900 dark:text-white">
									Total seats: {(developers + Math.ceil(operators/2)).toLocaleString()}
								</span>
								<span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-200 ml-4">
									{developers.toLocaleString()} {developers === 1 ? 'developer' : 'developers'}
								</span>
								{operators > 0 && (
									<span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-200 ml-4">
										{operators.toLocaleString()}{' '}
										<a href="#operator" className="custom-link text-gray-600 dark:text-gray-200">
											{operators <= 1 ? 'operator' : 'operators'}
										</a>
										{' '}= {operators/2} {operators/2 <= 1 ? 'seat' : 'seats'}
									</span>
								)}
						</div>
					</div>
				) : null}

				{tier.id === 'tier-enterprise-cloud' || tier.id === 'tier-enterprise-selfhost' ? (
					<>
						<div className="mt-8 flex flex-col gap-1">
							<div>
								<a href="#pricing-explained" className="custom-link text-sm text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100">
									Our pricing explained
								</a>
							</div>

							<h5 className="font-semibold mt-4">Summary</h5>
							<div className="mt-2 text-sm">
								{(() => {
									const counts = getWorkerCounts(workerGroups);
									const totalComputeUnits = (counts.small / 2 || 0) + 
										(counts.standard || 0) + 
										((1/8) * nativeWorkers) + 
										(tier.id === 'tier-enterprise-cloud' ? agentWorkers/2 : agentWorkers/1) + 
										(2 * (counts.large || 0));
									
									return (
										<PriceDisplay 
											amount={computeTotalPrice()} 
											period={period.value} 
											className={classNames(
												selectedOption === 'Pro' && tier.id === 'tier-enterprise-selfhost' && totalComputeUnits > 10 
													? "text-rose-700 dark:text-red-400" 
													: "text-gray-900 dark:text-white"
											)}
										/>
									);
								})()}
							</div>
							<SeatsSummary developers={developers} operators={operators} />
							<ComputeUnitsSummary 
								workerGroups={workerGroups} 
								nativeWorkers={nativeWorkers} 
								agentWorkers={agentWorkers}
								selectedOption={selectedOption} 
								tierId={tier.id}
							/>
						</div>
						<a
							onClick={() => setShowQuoteForm(true)}
							className={classNames(
								'text-sm cursor-pointer border shadow-sm !no-underline mt-6 block rounded-md py-2 px-3 text-center font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
								tier.id === 'tier-enterprise-cloud' || selectedOption !== 'Pro'
									? 'border-teal-600 text-teal-600 hover:text-teal-700 dark:hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950 focus-visible:outline-teal-600'
									: 'border-blue-600 text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 focus-visible:outline-blue-600'
							)}
						>
							Download quote
						</a>
					</>
				) : null}
			</div>
		</>
	);
}