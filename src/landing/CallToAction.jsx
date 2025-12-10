import React from 'react';

export default function CallToAction() {
	return (
		<div className="w-full py-24 px-6 sm:px-16 text-center">
			<h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
				Try Windmill now
			</h2>
			<div className="flex items-center justify-center gap-x-6">
				<a
					href="https://app.windmill.dev/user/login"
					onClick={() => window.plausible('try-cloud')}
					data-analytics='"try-cloud"'
					className="rounded-md bg-blue-600 px-6 py-3 text-base hover:bg-blue-700 font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 !no-underline transition-colors"
					rel="nofollow"
				>
					Get started for free
				</a>
				<a
					href="https://www.windmill.dev/book-demo"
					data-analytics='"schedule-demo"'
					onClick={() => window.plausible('schedule-demo')}
					className="text-base font-semibold leading-7 text-gray-900 dark:text-white !no-underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
				>
					Schedule a demo <span aria-hidden="true">→</span>
				</a>
			</div>
		</div>
	);
}
