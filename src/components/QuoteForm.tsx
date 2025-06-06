import { Dialog } from '@headlessui/react';
import { Loader2, X } from 'lucide-react';
import React, { useState } from 'react';

type DetailRowProps = {
	label: string;
	value: string | number;
	isSubItem?: boolean;
	calculation?: {
		left: number;
		right: number | string;
		operator?: string;
	};
	className?: string;
};

const DetailRow = ({ label, value, isSubItem, calculation, className = '' }: DetailRowProps) => (
	<div className={`flex flex-row justify-between ${isSubItem ? 'font-normal text-gray-600 dark:text-gray-300' : 'font-medium text-gray-800 dark:text-gray-200'} ${className}`}>
		<span className={isSubItem ? 'pl-4 w-40' : ''}>{label}</span>
		{calculation ? (
			<div className="grid grid-cols-[60px_20px_60px] gap-1">
				<span className="text-right">{calculation.left}</span>
				<span className="text-center">{calculation.operator || '='}</span>
				<span className="text-right">{calculation.right}</span>
			</div>
		) : (
			<div>{value}</div>
		)}
	</div>
);

type Workers = {
	native: number;
} & (
	| {
		workerGroups: Array<{ workers: number; memoryGB: number }>;  // For cloud
	}
	| {
		small: number;
		standard: number;
		large: number;  // For self-hosted
	}
);

export function QuoteForm({
	workers,
	developers,
	operators,
	frequency,
	plan,
	total_price,
	open,
	setOpen,
	selectedOption
}: {
	workers: Workers;
	developers: number;
	operators: number;
	frequency: string;
	plan: 'selfhosted_ee' | 'cloud_ee';
	open: boolean;
	setOpen: (open: boolean) => void;
	selectedOption: string;
	total_price: number;
}) {
	const [companyName, setCompanyName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [qualification, setQualification] = useState('');

	// Add this function near the top of the component
	const isValidEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Add these helper functions
	const getPlanDisplay = () => {
		if (plan === 'cloud_ee') return 'Cloud EE';
		if (selectedOption === 'Pro' && plan === 'selfhosted_ee') return 'Pro';
		if (selectedOption === 'Nonprofit' && plan === 'selfhosted_ee') return 'Enterprise - Nonprofit';
		return 'Self-Hosted EE';
	};

	const formatPrice = () => {
		return `$${total_price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/${frequency === 'monthly' ? 'mo' : 'yr'}`;
	};

	// Function to generate quote
	async function generateQuote() {
		setLoading(true);
		try {
			// Modify plan if conditions are met
			let apiPlan = plan;

			if (selectedOption === 'Pro' && plan === 'selfhosted_ee') {
				apiPlan = 'selfhosted_pro';
			} else if (selectedOption === 'Nonprofit' && plan === 'selfhosted_ee') {
				apiPlan = 'nonprofit_ee';
			}

			// Calculate total compute units with minimum of 2
			const computeUnits = plan === 'cloud_ee'
				? Math.max(2, (workers as { workerGroups: Array<{ workers: number; memoryGB: number }> })
					.workerGroups.reduce((sum, group) => sum + (group.memoryGB/2 * group.workers), 0) + workers.native)
				: Math.max(2, Math.ceil((workers as { small: number }).small / 2) + 
					(workers as { standard: number }).standard + 
					workers.native + 
					(2 * (workers as { large: number }).large));

			const seats = developers + Math.ceil(operators / 2);

			// API request
			const response = await fetch(
				`https://app.windmill.dev/api/w/windmill-labs/jobs/run_wait_result/f/f/bd/public/quote_and_crm?token=YTt4ylut571bcKX9k3d0WxWmSdS0qi20`, // script-only token, harmless
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer '
					},
					body: JSON.stringify({
						plan: apiPlan,
						frequency,
						seats,
						compute_units: computeUnits,
						email,
						company_name: companyName,
						reason_plan: (selectedOption === 'Nonprofit' || selectedOption === 'Pro') ? qualification : '',
					})
				}
			);

			if (!response.ok) {
				alert('Failed to generate quote: ' + (await response.text()));
				return;
			}

			const data = (await response.json()) as any;

			const pdfDataUrl = `data:application/pdf;base64,${data.file.content}`;
			const link = document.createElement('a');
			link.href = pdfDataUrl;
			link.download = 'quote_windmill.pdf';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (err) {
			alert('Failed to generate quote: ' + err);
		} finally {
			setLoading(false);
		}
	}

	// Update this calculation before the return statement
	const rawComputeUnits = plan === 'cloud_ee'
		? (workers as { workerGroups: Array<{ workers: number; memoryGB: number }> }).workerGroups.reduce(
			(sum, group) => sum + (group.memoryGB/2 * group.workers), 0
		  ) + workers.native
		: Math.ceil((workers as { small: number; standard: number; large: number }).small / 2) + 
		  (workers as { small: number; standard: number; large: number }).standard + 
		  workers.native + 
		  (2 * (workers as { small: number; standard: number; large: number }).large);

	const computeUnits = Math.max(2, rawComputeUnits);
	const isProWithTooManyUnits = selectedOption === 'Pro' && computeUnits > 10;

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<div className="fixed inset-0 bg-black/50 flex flex-row justify-center items-center">
				<Dialog.Panel>
					<div className="rounded-lg bg-white dark:bg-gray-950 min-w-96 p-4 flex flex-col gap-4">
						<div className="flex flex-row justify-between items-start">
							<span className="text-lg font-medium leading-none">Quote</span>
							<button
								onClick={() => {
									setOpen(false);
								}}
							>
								<X className="-m-1" />
							</button>
						</div>
						<label className="flex flex-col">
							<span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
								Company name
							</span>
							<input
								type="text"
								className="border-gray-100 dark:border-gray-600 border rounded-lg bg-white dark:bg-gray-950"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								autoFocus
							/>
						</label>
						<label className="flex flex-col">
							<span className="font-medium text-gray-800 dark:text-gray-200 text-sm">Email</span>
							<input
								type="email"
								className="border-gray-100 dark:border-gray-600 border rounded-lg bg-white dark:bg-gray-950 "
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<DetailRow label="Plan" value={getPlanDisplay()} />
						<DetailRow label="Price" value={formatPrice()} />
						<DetailRow label="Total seats" value={Math.ceil(operators / 2) + developers} />

						{developers > 0 && (
							<DetailRow 
								label="Developers" 
								isSubItem 
								calculation={{
									left: developers,
									right: `${developers} ${developers === 1 ? 'seat' : 'seats'}`
								}}
							/>
						)}

						{operators > 0 && (
							<DetailRow 
								label="Operators" 
								isSubItem 
								calculation={{
									left: operators,
									right: `${Math.ceil(operators / 2)} ${operators === 1 ? 'seat' : 'seats'}`
								}}
							/>
						)}

						<DetailRow 
							label={`Total compute units (CU)${rawComputeUnits < 2 ? ' - can\'t be below 2' : ''}`}
							value={computeUnits}
							className={rawComputeUnits < 2 ? 'text-red-500' : ''}
						/>

						{/* Worker type rows */}
						{plan === 'cloud_ee' ? (
							// For cloud, show workers with their memory sizes
							(workers as { workerGroups: Array<{ workers: number; memoryGB: number }> }).workerGroups.map((group, index) => 
								group.workers > 0 && (
									<DetailRow 
										key={index}
										label={`${group.memoryGB}GB workers`}
										isSubItem
										calculation={{
											left: group.workers,
											right: `${(group.memoryGB/2 * group.workers)} CU`
										}}
									/>
								)
							)
						) : (
							// For self-hosted, show the original breakdown
							Object.entries({
								'Standard workers': { count: (workers as { standard: number }).standard, multiplier: 1 },
								'Small workers': { count: (workers as { small: number }).small, multiplier: 0.5 },
								'Large workers': { count: (workers as { large: number }).large, multiplier: 2 }
							}).map(([label, { count, multiplier }]) => 
								count > 0 && (
									<DetailRow 
										key={label}
										label={label}
										isSubItem
										calculation={{
											left: count,
											right: `${Math.ceil(count * multiplier)} CU`
										}}
									/>
								)
							)
						)}

						{/* Show native workers for both plans */}
						{workers.native > 0 && (
							<DetailRow 
								key="Native workers"
								label="Native workers"
								isSubItem
								calculation={{
									left: workers.native * 8,
									right: `${workers.native} CU`
								}}
							/>
						)}

						{plan === 'selfhosted_ee' && (selectedOption === 'Nonprofit' || selectedOption === 'Pro') && (
							<label className="flex flex-col">
								<span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
									Qualification for {selectedOption === 'Nonprofit' ? 'nonprofit' : 'Pro plan'} (<a href="#pro-plan" className="font-normal text-blue-600 hover:text-blue-800">see rules</a>)
								</span>
								<input
									type="text"
									className="text-sm border-gray-100 dark:border-gray-600 border rounded-lg bg-white dark:bg-gray-950"
									placeholder={`Write in a few words why you qualify for ${selectedOption === 'Nonprofit' ? 'Nonprofit plan' : 'Pro plan'}`}
									value={qualification}
									onChange={(e) => setQualification(e.target.value)}
								/>
							</label>
						)}

						{isProWithTooManyUnits && (
							<div className="text-red-500 text-sm">
								Pro plan is limited to 10 compute units maximum
							</div>
						)}

						<button
							className="rounded-md bg-blue-600 px-4 py-2 flex flex-row gap-2 justify-center items-center font-medium text-white shadow-sm hover:bg-blue-800 hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
							onClick={() => {
								generateQuote();
							}}
							disabled={
								!companyName || 
								!email || 
								!isValidEmail(email) || 
								loading || 
								isProWithTooManyUnits || 
								((plan === 'selfhosted_ee' && (selectedOption === 'Nonprofit' || selectedOption === 'Pro')) && qualification.length < 3)
							}
						>
							Generate quote
							{loading && <Loader2 className="animate-spin" />}
						</button>
						<a
							href="https://drive.google.com/uc?export=download&id=1tbBMNSGcdu3e5BAFf8CIEXlbEKppbtLm"
							className="text-blue underline text-sm"
						>
							Also need a presentation?
						</a>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}
