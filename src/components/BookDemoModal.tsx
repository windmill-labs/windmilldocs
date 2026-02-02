import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import React from 'react';

type BookDemoModalProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export default function BookDemoModal({ open, setOpen }: BookDemoModalProps) {
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<div className="fixed inset-0 bg-black/50 flex flex-row justify-center items-center z-50">
				<Dialog.Panel>
					<div className="rounded-lg bg-white dark:bg-gray-950 w-[28rem] p-6 flex flex-col gap-4">
						<div className="flex flex-row justify-between items-start">
							<span className="text-xl font-bold text-gray-900 dark:text-white">
								Contact us
							</span>
							<button onClick={() => setOpen(false)}>
								<X className="-m-1" />
							</button>
						</div>
						<div>
							<p className="text-gray-800 dark:text-gray-200 text-sm mb-3">
								To discover the product in depth:
							</p>
							<ul className="text-gray-800 dark:text-gray-200 text-sm space-y-1.5 list-disc list-inside">
								<li>
									<a href="https://app.windmill.dev" className="text-blue-600 dark:text-blue-400 hover:underline" rel="nofollow">
										Try Windmill Cloud
									</a>
								</li>
								<li>
									<a href="https://www.windmill.dev/docs/advanced/self_host" className="text-blue-600 dark:text-blue-400 hover:underline">
										Self-host Community Edition
									</a>
								</li>
								<li>
									<a href="https://www.windmill.dev/docs/misc/plans_details#self-host" className="text-blue-600 dark:text-blue-400 hover:underline">
										Start a 30-day free trial of Enterprise Edition
									</a>
								</li>
								<li>
									<a href="https://www.windmill.dev/docs/intro#take-a-tour-of-windmill" className="text-blue-600 dark:text-blue-400 hover:underline">
										Watch the quick tour videos
									</a>
								</li>
							</ul>
						</div>
						<div className="border-t border-gray-200 dark:border-gray-700 pt-4">
							<p className="text-gray-800 dark:text-gray-200 text-sm mb-3">
								For commercial inquiries, email{' '}
								<a
									href="mailto:sales@windmill.dev"
									className="text-blue-600 dark:text-blue-400 hover:underline"
								>
									sales@windmill.dev
								</a>
								{' '}or book a meeting with the <strong>founder</strong>:
							</p>
							<p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
								Meetings are designed for teams evaluating Enterprise Edition or white labeling.
							</p>
							<div className="flex flex-row gap-3">
								<a
									href="https://www.windmill.dev/book-demo"
									className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-blue-800 hover:text-white !no-underline"
									onClick={() => window.plausible?.('schedule-demo')}
								>
									Book a meeting
								</a>
								<a
									href="https://www.windmill.dev/pricing"
									className="flex-1 rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-2 text-center font-medium text-gray-900 dark:text-white shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 !no-underline"
									onClick={() => window.plausible?.('try-cloud')}
								>
									Explore plans
								</a>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}
