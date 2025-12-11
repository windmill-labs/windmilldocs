import React from 'react';
import GithubStarCount from './GithubStarCount';
import RadialBlur from './RadialBlur';
import HomescreenSvg from '../../static/homescreen.svg';
import Link from '@docusaurus/Link';

export default function Hero() {
	return (
		<div className="relative rounded-none mx-auto max-w-screen-2xl overflow-hidden 2xl:rounded-3xl pt-32">
			<RadialBlur />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl px-8 mx-auto py-16">
				<div>
					<div className="flex flex-row items-end gap-8">
						<GithubStarCount />
					</div>
					<h1 className="mt-4 !text-4xl text-slate-750 !tracking-tight !font-semibold sm:!text-6xl">
						Build, deploy and monitor internal tools any scale
					</h1>
					<div className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-100">
						For enfineering teams that need the flexibility of an IDE with the convenience of managed deployment and built-in observability.
						
					</div>
					<div className="mt-8 flex flex-col gap-3">
						<div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
							<span className="text-green-500 font-bold">✓</span>
							<span>Full IDE flexibility</span>
						</div>
						<div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
							<span className="text-green-500 font-bold">✓</span>
							<span>Enterprise deployment</span>
						</div>
						<div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
							<span className="text-green-500 font-bold">✓</span>
							<span>Built-in observability</span>
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
					<div className="w-full font-medium text-slate-400 text-left mt-16 flex-container">
						Backed by
						<a
							href="https://www.ycombinator.com/companies/windmill"
							target="_blank"
							title="Y-Combinator"
						>
							<img 
								src="/images/brands/yc_grey.svg"
								alt="Y Combinator logo"
								width="137"
								height="32"
								className="logo"
							/>
						</a>
						<a
							href="https://www.gradient.com/"
							target="_blank"
							title="Gradient Ventures"
						>
							<img 
								src="/images/brands/gradient.svg"
								alt="Gradient Ventures logo"
								width="160"
								height="40"
								className="logo"
							/>
						</a>
						<a
							href="https://www.bvp.com/"
							target="_blank"
							title="Bessemer Venture Partners"
							className="ml-4 -mt-1"
						>
							<img 
								src="/images/brands/bessemer.png"
								alt="Bessemer Venture Partners logo"
								width="90"
								height="27"
								className="logo"
								style={{ filter: 'grayscale(100%) brightness(2)' }}
							/>
						</a>
					</div>
				</div>
				<div>
					<div className="flex  justify-center !rounded-2xl overflow-hidden dark:bg-[#2e344033] bg-[#fbfbfb]">
						<HomescreenSvg className="scaled-svg" style={{ width: '90%', height: '90%' }} />
					</div>
				</div>
			</div>
		</div>
	);
}
