import { Dialog } from '@headlessui/react';
import { Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function QuoteForm({
	workers,
	seats,
	frequency,
	plan,
	open,
	setOpen,
	selectedOption
}: {
	workers: {
		native: number;
		small: number;
		standard: number;
		large: number;
	};
	seats: number;
	frequency: string;
	plan: 'selfhosted_ee' | 'cloud_ee';
	open: boolean;
	setOpen: (open: boolean) => void;
	selectedOption: string;
}) {
	const [companyName, setCompanyName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	// Function to generate quote
	async function generateQuote() {
		setLoading(true);
		try {
			// Modify plan if conditions are met
			let apiPlan = plan;

				if (selectedOption === 'SMB' && plan === 'selfhosted_ee') {
				apiPlan = 'selfhosted_pro';
				} else if (selectedOption === 'Nonprofit' && plan === 'selfhosted_ee') {
				apiPlan = 'nonprofit_ee';
				}

			// Calculate total compute units
			const computeUnits = workers.small + (2 * workers.standard) + (2 * workers.native) + (4 * workers.large);

			// API request
			const response = await fetch(
				`https://app.windmill.dev/api/w/windmill-labs/jobs/run/p/f/bd/public/generate_quote__public____new_pricing?token=eDuWDGxe3W4JOgBUg1bQuWyRk9bBaUdE`,
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
						company_name: companyName
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
								className="border-gray-100 dark:border-gray-600 border rounded-lg bg-white dark:bg-gray-800"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								autoFocus
							/>
						</label>
						<label className="flex flex-col">
							<span className="font-medium text-gray-800 dark:text-gray-200 text-sm">Email</span>
							<input
								type="email"
								className="border-gray-100 dark:border-gray-600 border rounded-lg bg-white dark:bg-gray-800 "
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<div className="flex flex-row justify-between">
						<span className="font-medium text-gray-800 dark:text-gray-200">Plan</span>
						{plan === 'cloud_ee'
							? 'Cloud EE'
							: selectedOption === 'SMB' && plan === 'selfhosted_ee'
							? 'Pro'
							: selectedOption === 'Nonprofit' && plan === 'selfhosted_ee'
							? 'Enterprise - Nonprofit'
							: 'Self-Hosted EE'}
						</div>
						<div className="flex flex-row justify-between">
							<span className="font-medium text-gray-800 dark:text-gray-200">Frequency</span>
							{frequency}
						</div>
						<div className="flex flex-row justify-between">
							<span className="font-medium text-gray-800 dark:text-gray-200">Seats</span>
							{selectedOption === 'SMB' && plan === 'selfhosted_ee' ? Math.min(seats, 10) : seats}
						</div>
						<div className="flex flex-row justify-between">
							<span className="font-medium text-gray-800 dark:text-gray-200">Total compute units (1GB)</span>
							{workers.small + (2 * workers.standard) + (2 * workers.native) + (4 * workers.large)}
						</div>
						{workers.standard > 0 && (
							<div className="flex flex-row justify-between">
								<span className="font-medium text-gray-800 dark:text-gray-200 pl-4">Standard workers (2GB)</span>
								{workers.standard}
							</div>
						)}
						{workers.small > 0 && (
							<div className="flex flex-row justify-between">
								<span className="font-medium text-gray-800 dark:text-gray-200 pl-4">Small workers (1GB)</span>
								{workers.small}
							</div>
						)}
						{workers.large > 0 && (
							<div className="flex flex-row justify-between">
								<span className="font-medium text-gray-800 dark:text-gray-200 pl-4">Large workers (>2GB)</span>
								{workers.large}
							</div>
						)}
						{workers.native > 0 && (
							<div className="flex flex-row justify-between">
								<span className="font-medium text-gray-800 dark:text-gray-200 pl-4">8 native workers (2GB)</span>
								{selectedOption === 'SMB' && plan === 'selfhosted_ee' ? Math.min(workers.native, 10) : workers.native}
							</div>
						)}
						<a
							href="https://drive.google.com/uc?export=download&id=1tbBMNSGcdu3e5BAFf8CIEXlbEKppbtLm"
							className="text-blue underline text-sm"
						>
							Also need a presentation?
						</a>

						<button
							className="rounded-md bg-blue-600 px-4 py-2 flex flex-row gap-2 justify-center items-center font-medium text-white shadow-sm hover:bg-blue-800 hover:text-white"
							onClick={() => {
								generateQuote();
							}}
							disabled={!companyName || !email || loading}
						>
							Generate quote
							{loading && <Loader2 className="animate-spin" />}
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}
