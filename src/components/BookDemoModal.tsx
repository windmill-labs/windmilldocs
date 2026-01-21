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
					<div className="rounded-lg bg-white dark:bg-gray-950 w-[26rem] p-6 flex flex-col gap-5">
						<div className="flex flex-row justify-between items-start">
							<span className="text-xl font-bold text-gray-900 dark:text-white">
								Interested in a demo?
							</span>
							<button onClick={() => setOpen(false)}>
								<X className="-m-1" />
							</button>
						</div>
						<p className="text-gray-800 dark:text-gray-200">
							Demos are designed for teams evaluating Windmill Enterprise Edition (self-hosted and cloud) or white labeling.
						</p>
						<p className="text-gray-800 dark:text-gray-200">
							On a smaller team? Pro and Team plans are self-serve. Start a free trial or explore on your own.
						</p>
						<div className="flex flex-row gap-3">
							<a
								href="https://www.windmill.dev/book-demo"
								className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-blue-800 hover:text-white !no-underline"
								onClick={() => window.plausible?.('schedule-demo')}
							>
								Book a demo
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
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}
