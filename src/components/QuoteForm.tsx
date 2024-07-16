import { Dialog } from '@headlessui/react';
import { Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function QuoteForm({
	vCPUs,
	seats,
	frequency,
	plan,
	open,
	setOpen
}: {
	vCPUs: number;
	seats: number;
	frequency: string;
	plan: 'selfhosted_ee' | 'cloud_ee';
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const [companyName, setCompanyName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	async function generateQuote() {
		setLoading(true);
		try {
			const response = await fetch(
				`https://app.windmill.dev/api/w/windmill-labs/jobs/run_wait_result/p/f/bd/public/generate_quote_public?token=ylmZm3yfDfLGPVjvn1N3g3vtOlV8AOnD`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer '
					},
					body: JSON.stringify({
						frequency,
						seats: seats,
						vcpus: vCPUs,
						company_name: companyName,
						plan,
						email
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
							{plan === 'cloud_ee' ? 'Cloud EE' : 'Self-hosted EE'}
						</div>
						<div className="flex flex-row justify-between">
							<span className="font-medium text-gray-800 dark:text-gray-200">vCPUs</span>
							{vCPUs}
						</div>
						<div className="flex flex-row justify-between">
							<span className="font-medium text-gray-800 dark:text-gray-200">Seats</span>
							{seats}
						</div>
						<div className="flex flex-row justify-between">
							<span className="font-medium text-gray-800 dark:text-gray-200">Frequency</span>
							{frequency}
						</div>

						<a
							href="https://drive.google.com/uc?export=download&id=1tbBMNSGcdu3e5BAFf8CIEXlbEKppbtLm"
							className="text-blue underline text-sm"
						>
							Also need a presentation? Here it is
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
