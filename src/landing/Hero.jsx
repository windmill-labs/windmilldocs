import React from 'react';
import LandingHeader from './LandingHeader';
import GitHubButton from 'react-github-btn';
export default function Hero() {
	return (
		<div className="relative isolate overflow-hidden bg-white">
			<svg
				className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
				aria-hidden="true"
			>
				<defs>
					<pattern
						id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
						width={200}
						height={200}
						x="50%"
						y={-1}
						patternUnits="userSpaceOnUse"
					>
						<path d="M.5 200V.5H200" fill="none" />
					</pattern>
				</defs>
				<rect
					width="100%"
					height="100%"
					strokeWidth={0}
					fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
				/>
			</svg>
			<LandingHeader />

			<div className="mx-auto max-w-7xl px-6 pt-10 gap-8 pb-24 sm:pb-32 lg:flex lg:py-20 lg:px-8 mt-4">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
					<GitHubButton
						href="https://github.com/windmill-labs/windmill"
						data-icon="octicon-star"
						data-show-count="true"
						data-size="large"
						aria-label="Star windmill-labs/windmill on GitHub"
					>
						Star
					</GitHubButton>
					<h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Turn scripts into invincible workflows and UIs in minutes
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Easily create internal apps and invincible workflows with code only where it matters.
						<span> </span>
						<a href="https://github.com/windmill-labs/windmill">Open-source</a>, scalable, reliable, fast
					</p>

					<div className="mt-10 flex items-center gap-x-6">
						<a
							href="https://app.windmill.dev/user/login"
							onClick={() => window.plausible('try-cloud')}
							data-analytics='"try-cloud"'
							className="rounded-md bg-blue-600 px-4 py-2 text-base font-semibold leading-7 text-white shadow-xl hover:bg-blue-800 hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 !no-underline"
						>
							Try Windmill Cloud
						</a>
						
						<a
							href="https://docs.windmill.dev/docs/how-tos/self_host"
							onClick={() => window.plausible('read-docs')}
							className="text-base font-semibold leading-7 text-gray-900 text !no-underline"
						>
							Or self-host yourself <span aria-hidden="true">→</span>
						</a>
					</div>

											
					<a
							href="https://docs.windmill.dev/docs/intro"
							onClick={() => window.plausible('getting-started')}
							className="text-xs ml-60 mt-2 leading-7 text-gray-600 text"
						>
							Getting started
						</a>

					<div className="w-full text-left mt-16">
						Backed by <img className="inline ml-2" src="ycombinator.svg"></img>
					</div>
				</div>
				<div className="mx-auto mt-16 sm:mt-8">
					<div className="flex-none">
							<img
								src="homescreen.png"
								alt="App screenshot"
								className="w-full"
							/>
					</div>
				</div>
			</div>
		</div>
	);
}
