import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';
import classNames from 'classnames';
import Slider from './Slider';
import MemorySlider from './MemorySlider';
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
	// Cap the price calculation at 4GB
	const effectiveMemory = Math.min(4, memoryGB);
	// Base price: Linear interpolation between $25 at 1GB and $100 at 4GB
	let basePrice = 25 + (effectiveMemory - 1) * 25;

	// Apply discounts for enterprise self-hosted tier based on selectedOption
	if (tierId === 'tier-enterprise-selfhost') {
		if (selectedOption === 'SMB') {
			basePrice = basePrice * 0.4; // 60% discount for SMB
		} else if (selectedOption === 'Nonprofit') {
			basePrice = basePrice * 0.4; // 60% discount for Nonprofit
		}
	}

	return basePrice;
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

// New component for compute units summary
const ComputeUnitsSummary = ({ workerGroups, nativeWorkers, selectedOption }) => {
	const counts = getWorkerCounts(workerGroups);
	const totalComputeUnits = (counts.small / 2 || 0) + 
		(counts.standard || 0) + 
		((1/8) * nativeWorkers) + 
		(2 * (counts.large || 0));
	
	return (
		<div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-200 min-h-[6.5rem]">
			<span className="text-gray-900 dark:text-white">
				Total <a href="#compute-units" className="custom-link text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">compute units</a> (CU): 
				<span className={selectedOption === 'SMB' && totalComputeUnits > 10 ? "text-rose-700 dark:text-red-400" : ""}>
					{Math.round(totalComputeUnits)}
					{selectedOption === 'SMB' && totalComputeUnits > 10 ? ' (max 10 CU on Pro plan)' : ''}
				</span>
			</span>
			{counts.standard > 0 && (
				<span className="ml-4">{counts.standard} standard workers = {counts.standard} CU</span>
			)}
			{counts.small > 0 && (
				<span className="ml-4">{counts.small} small workers = {counts.small/2} CU</span>
			)}
			{counts.large > 0 && (
				<span className="ml-4">{counts.large} large workers = {counts.large * 2} CU</span>
			)}
			{nativeWorkers > 0 && (
				<span className="ml-4">{nativeWorkers} native workers = {nativeWorkers/8} CU</span>
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
	const [vCPUs, setvCPUs] = useState(tier.price.vCPU ? tier.price.vCPU.default : 2);
	const [showQuoteForm, setShowQuoteForm] = useState(false);

	// Add new state for worker groups
	const [workerGroups, setWorkerGroups] = useState(
		(tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') 
			? [{ workers: workerGroupDefaults.workers, memoryGB: workerGroupDefaults.memoryGB }]
			: []
	);

	// Update the initial state of nativeWorkers to 8
	const [nativeWorkers, setNativeWorkers] = useState(8);

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
		if (pricing.seat && developers > pricing.seat.max) {
			setDevelopers(pricing.seat.max);
		}
		if (pricing.vCPU && vCPUs > pricing.vCPU.max) {
			setvCPUs(pricing.vCPU.max);
		}
	}, [pricing, developers, vCPUs]);

	// Replace the existing computeTotalPrice function
	function computeTotalPrice() {
		let total = 0;

		if (tier.id === 'tier-enterprise-selfhost' || tier.id === 'tier-enterprise-cloud') {
			// Calculate seats cost (before period multiplier)
			if (pricing.seat) {
				total += pricing.seat.monthly * developers; // Full price for developers
				total += Math.ceil(operators/2) * (pricing.seat.monthly / 2); // Half price for operators
			}

			// Add native workers cost
			let nativeWorkersCost = 0;
			if (pricing.worker?.native) {
				nativeWorkersCost = (pricing.worker.native * nativeWorkers / 8);
				total += nativeWorkersCost;
			}

			// Calculate regular workers cost
			const workersTotal = workerGroups.reduce((sum, group) => {
				const pricePerWorker = calculateWorkerPrice(group.memoryGB, tier.id, selectedOption) * 
					(tier.id === 'tier-enterprise-cloud' ? 2 : 1); // Double price for cloud
				return sum + (pricePerWorker * group.workers);
			}, 0);

			// Apply minimum worker group pricing considering both native and regular workers
			let minimumWorkerPrice = tier.id === 'tier-enterprise-cloud' ? 200 : 100;
			if (tier.id === 'tier-enterprise-selfhost' && (selectedOption === 'SMB' || selectedOption === 'Nonprofit')) {
				minimumWorkerPrice = 40; // 60% discount applied to minimum price
			}
			
			const totalWorkersCost = workersTotal + nativeWorkersCost;
			if (totalWorkersCost < minimumWorkerPrice) {
				total += minimumWorkerPrice - nativeWorkersCost;
			} else {
				total += workersTotal;
			}

			// Add core package price for enterprise cloud
			if (tier.id === 'tier-enterprise-cloud') {
					total += selected.price;
			}

			// Apply period multiplier to the total at the end
			total = calculatePrice(total, period.value, tier.id);
		} else {
			if (pricing.seat) {
				const devCost = calculatePrice(pricing.seat.monthly, period.value, tier.id) * developers;
				const opCost = calculatePrice(pricing.seat.monthly / 2, period.value, tier.id) * operators;
				total += devCost + opCost;
			}

			if (pricing.vCPU) {
				total += calculatePrice(pricing.vCPU.monthly, period.value, tier.id) * vCPUs;
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

	// Get worker counts for quote generation
	function getWorkerCountsForQuote() {
		const counts = getWorkerCounts(workerGroups);
		return {
			native: nativeWorkers / 8,
				small: counts.small || 0,
				standard: counts.standard || 0,
				large: counts.large || 0
		};
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
									}, 0) + (pricing.worker?.native * nativeWorkers / 8)) < 
									(tier.id === 'tier-enterprise-cloud' ? 200 : 
										(selectedOption === 'SMB' || selectedOption === 'Nonprofit' ? 40 : 100)) && (
										<span className="text-sm text-rose-700 dark:text-red-400">
											Price for workers can't be below ${tier.id === 'tier-enterprise-cloud' 
												? (period.value === 'annually' ? '2,000' : '200') 
												: (selectedOption === 'SMB' || selectedOption === 'Nonprofit' 
													? (period.value === 'annually' ? '400' : '40')
													: (period.value === 'annually' ? '1,000' : '100'))}
											/{period.value === 'annually' ? 'yr' : 'mo'}
										</span>
									)}

									{/* New CU limit warning for SMB */}
									{selectedOption === 'SMB' && (
										(() => {
											const counts = getWorkerCounts(workerGroups);
											const totalComputeUnits = (counts.small / 2 || 0) + 
												(counts.standard || 0) + 
												((1/8) * nativeWorkers) + 
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
								(2 * (counts.large || 0));
							const isOverLimit = selectedOption === 'SMB' && totalComputeUnits > 10;
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
												{developers.toLocaleString()}
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
										defaultValue={clamp(developers, 1, pricing.seat.max)}
										onChange={(value) => {
											setDevelopers(clamp(value, 1, pricing.seat.max));
										}}
									/>
								</li>

								<li className="flex flex-col mt-2">
									<div className="flex justify-between w-full items-center">
										<div>
											<span className="text-sm font-semibold text-gray-600 dark:text-gray-200">
												{operators.toLocaleString()}
											</span>
											<span className="text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-200">
												{' '}{operators <= 1 ? 'operator' : 'operators'}{' '}
												<span className="relative group">
													<svg className="inline-block w-3 h-3 text-blue-800 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													<span className="invisible group-hover:visible absolute z-10 w-96 p-2 mt-2 text-sm font-normal text-white bg-slate-800 rounded-lg shadow-lg">
														An <a href="#operators" className="text-blue-400 hover:text-blue-500">operator</a> is a user who can only execute scripts, flows and apps, but not create and edit them. Operators are 1/2 price of developers (or 1/2 seats).
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
										step={1}
										defaultValue={clamp(operators, 0, pricing.seat.max * 2)}
										onChange={(value) => {
											setOperators(clamp(value, 0, pricing.seat.max * 2));
										}}
									/>
								</li>
							</>
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
												{group.workers % 1000 === 0 ? `${group.workers/1000}k` : group.workers.toLocaleString()}{" "}
												{group.workers === 1 ? (
													<>
														<span className={
															group.memoryGB === 1 ? "font-semibold text-blue-800 dark:text-blue-600" : 
															group.memoryGB === 2 ? "font-semibold text-blue-600 dark:text-blue-500" : 
															"font-semibold text-blue-500 dark:text-blue-400"
														}>
															{group.memoryGB === 1 ? 'small' : 
															group.memoryGB === 2 ? 'standard' : 
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
															'large'}
														</span>{" "}
														workers
													</>
												)}
											</span>
											<span className="text-sm text-gray-900 dark:text-white">
												<span className="font-normal text-gray-400 dark:text-gray-300">{(group.memoryGB === 1 ? group.workers/2 : group.memoryGB === 2 ? group.workers : group.workers * 2).toLocaleString()} {tier.id === 'tier-enterprise-cloud' ? 'CU' : ((group.memoryGB === 1 ? group.workers/2 : group.memoryGB === 2 ? group.workers : group.workers * 2) <= 1 ? 'compute unit' : 'compute units')}</span> · <span className="font-semibold">${(Math.round(calculateWorkerPrice(group.memoryGB, tier.id, selectedOption) * group.workers * (tier.id === 'tier-enterprise-cloud' ? 2 : 1) * (period.value === 'annually' ? 10 : 1) * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 1})} /{period.value === 'annually' ? 'yr' : 'mo'}</span>
											</span>
										</div>
										<Slider
											min={1}
											max={selectedOption === 'SMB' ? 10 : 1000}
											step={1}
											defaultValue={group.workers}
											onChange={(value) => updateWorkerGroup(index, 'workers', value)}
										/>

										{/* Memory per worker slider */}
										<div className="flex justify-between w-full items-center">
											<span className="text-sm text-gray-600 dark:text-gray-200">
												{group.memoryGB}GB memory limit {tier.id === 'tier-enterprise-cloud' && group.memoryGB >= 10 ? '/ worker' : 'per worker'}
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
										{group.memoryGB >= 4 && tier.id === 'tier-enterprise-cloud' && (
											<span className="text-sm font-normal text-gray-400 dark:text-gray-300 mt-1 text-right w-full">
												(Price cap)
											</span>
										)}
									</li>
								))}
								
								<button
									onClick={addWorkerGroup}
									className="mt-2 text-sm text-blue-600 hover:text-blue-500 dark:text-white dark:hover:text-slate-100 font-semibold"
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
										{nativeWorkers} native {nativeWorkers === 0 ? 'worker' : 'workers'}
									</span>
									<span className="text-sm text-gray-900 font-semibold dark:text-white">
										${(Math.round((pricing.worker.native * nativeWorkers / 8) * (period.value === 'annually' ? 10 : 1) * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 1})} /{period.value === 'annually' ? 'yr' : 'mo'}
									</span>
								</div>
								<Slider
									min={0}
									max={selectedOption === 'SMB' ? 32 : 200}
									step={8}
									defaultValue={8}
									onChange={(value) => setNativeWorkers(value)}
									noExponential={true}
								/>
							</li>
						)}
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
										(2 * (counts.large || 0));
									
									return (
										<PriceDisplay 
											amount={computeTotalPrice()} 
											period={period.value} 
											className={classNames(
												selectedOption === 'SMB' && totalComputeUnits > 10 
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
								selectedOption={selectedOption} 
							/>
						</div>
						<a
							onClick={() => setShowQuoteForm(true)}
							className={classNames(
								'text-sm cursor-pointer border shadow-sm !no-underline mt-6 block rounded-md py-2 px-3 text-center font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
								tier.id === 'tier-enterprise-cloud' || selectedOption !== 'SMB'
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