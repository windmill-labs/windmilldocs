import React from 'react';
import GithubStarCount from './GithubStarCount';
import RadialBlur from './RadialBlur';
import HomescreenSvg from '../../static/homescreen.svg';
import Link from '@docusaurus/Link';

export default function Hero() {
	return (
		<div className="relative rounded-none mx-auto max-w-screen-2xl overflow-hidden 2xl:rounded-3xl pt-32">

			<div className="grid grid-cols-1 md:grid-cols-1 gap-2 max-w-7xl px-8 mx-auto py-16">
				<div>
					<div className="flex flex-row items-end gap-8">
						<GithubStarCount />
					</div>
					<h1 className="mt-4 !text-4xl text-slate-750 !tracking-tight !font-semibold sm:!text-6xl">
						Build, deploy, and monitor internal tools at<span className="text-blue-500 dark:text-blue-450"> enterprise</span> scale
					</h1>
					<div className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-100">
						For engineering teams that need the flexibility of an IDE with the convenience of managed deployment and built-in observability.
					</div>
					<div className="mt-8 flex flex-col gap-3">
						<div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
							<span className="text-green-500 font-bold">✓</span>
							<span><strong>Full IDE flexibility</strong> - Build exactly what you need</span>
						</div>
						<div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
							<span className="text-green-500 font-bold">✓</span>
							<span><strong>Enterprise deployment</strong> - Ship to production in seconds</span>
						</div>
						<div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
							<span className="text-green-500 font-bold">✓</span>
							<span><strong>Built-in observability</strong> - Monitor everything, debug instantly</span>
						</div>
					</div>
					<div className="mt-10 flex items-center gap-x-6">
						<a
							href="https://app.windmill.dev/user/login"
							onClick={() => window.plausible('try-cloud')}
							data-analytics='"try-cloud"'
							className="rounded-md transition-all bg-blue-500 px-4 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800 hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 !no-underline"
							rel="nofollow"
						>
							Try Windmill cloud
						</a>

						<Link
							href="docs/advanced/self_host"
							onClick={() => window.plausible?.('self-host')}
							className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200 text !no-underline"
						>
							Self-host in 3 mins <span aria-hidden="true">→</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
