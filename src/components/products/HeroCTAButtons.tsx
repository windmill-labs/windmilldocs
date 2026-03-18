import React from 'react';
import Link from '@docusaurus/Link';

export default function HeroCTAButtons() {
	return (
		<div className="flex items-center gap-x-6">
			<a
				href="https://app.windmill.dev/user/login"
				onClick={() => (window as any).plausible?.('try-cloud')}
				data-analytics='"try-cloud"'
				className="rounded-md transition-all bg-blue-500 px-4 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800 hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 !no-underline"
				rel="nofollow"
			>
				Try Windmill cloud
			</a>
			<Link
				to="/docs/advanced/self_host"
				onClick={() => (window as any).plausible?.('self-host')}
				className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200 !no-underline"
			>
				Self-host in 3 mins <span aria-hidden="true">→</span>
			</Link>
		</div>
	);
}
