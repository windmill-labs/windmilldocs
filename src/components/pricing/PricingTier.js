import React from 'react';

function PricingTier({ tier, period }) {
	const calculatePrice = (monthlyPrice, period) => {
		if (period === 'annually') {
			return monthlyPrice * 10; // 20% discount for annual period
		}
		return monthlyPrice;
	};

	return (
		<div
			className={`rounded-3xl p-8 xl:p-10 ${
				tier.mostPopular ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-200'
			}`}
		>
			<div className="flex items-center justify-between gap-x-4">
				<h3
					id={tier.id}
					className={`text-lg font-semibold leading-8 ${
						tier.mostPopular ? 'text-blue-600' : 'text-gray-900'
					}`}
				>
					{tier.name}
				</h3>
				{period.value === 'annually' && Object.keys(tier.price).length > 0 && (
					<p className="rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
						16% Discount
					</p>
				)}
			</div>
			<p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
			<a
				href={tier.href}
				aria-describedby={tier.id}
				className={`${
					tier.mostPopular
						? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500'
						: 'text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300'
				} mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
			>
				{tier.customMessage ? tier.customMessage : 'Contact us'}
			</a>
			<ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
				<FeatureList features={tier.features} level={1} id={tier.id} />
			</ul>
			<div className="mt-16 grow flex flex-col justify-start">
				{Object.keys(tier.price).length > 0 && (
					<div className="text-md font-semibold leading-8">Pricing</div>
				)}
				<ul className="mt-4 flex items-baseline gap-x-1">
					{Object.keys(tier.price).map((key) => (
						<li key={key} className="flex flex-row justify-between w-full items-center">
							<div>
								<span className="text-sm text-gray-500">1 </span>
								<span className="text-sm font-semibold tracking-tight text-gray-900 ">{key}:</span>
							</div>
							<div>
								<span className="text-sm text-gray-900 font-semibold">
									${calculatePrice(tier.price[key].monthly, period).toFixed(2)}
								</span>
								<span className="text-sm text-gray-500">
									{period.value === 'annually' ? '/yr' : '/mo'}
								</span>
							</div>
						</li>
					))}
				</ul>
				{tier.id === 'tier-enterprise' && (
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
											<span className="flex items-center">
												<span className="flex flex-col text-sm">
													<RadioGroup.Label as="span" className="font-medium text-gray-900">
														{plan.name}
													</RadioGroup.Label>
													<RadioGroup.Description as="span" className="text-gray-500">
														<span className="block sm:inline">{plan.description}</span>
													</RadioGroup.Description>
												</span>
											</span>
											<RadioGroup.Description
												as="span"
												className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
											>
												<span className="font-medium text-gray-900">{plan.price}</span>
												<span className="ml-1 text-gray-500 sm:ml-0">/mo</span>
											</RadioGroup.Description>
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
				)}
			</div>
		</div>
	);
}

export default PricingTier;
