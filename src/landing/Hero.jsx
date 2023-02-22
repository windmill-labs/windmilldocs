import React from 'react';
import LandingHeader from './LandingHeader';
import GitHubButton from 'react-github-btn';

export default function Hero() {
	return (
		<div className="relative isolate overflow-hidden bg-white">
			<LandingHeader />

			<div className="mx-auto max-w-7xl px-6 pt-4 gap-y-8 pb-24 sm:pb-32 lg:flex lg:pt-10 lg:pb-36 lg:px-8 mt-4">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
					<div className="h-8">
						<GitHubButton
							alt="Stars"
							href="https://github.com/windmill-labs/windmill"
							data-icon="octicon-star"
							data-show-count="true"
							data-size="large"
							aria-label="Star windmill-labs/windmill on GitHub"
						/>
					</div>
					<h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Turn scripts into workflows and UIs in minutes
					</h1>
					<h2 className="mt-6 text-lg leading-8 text-gray-600">
						Easily create internal apps and invincible workflows with code only where it matters.
						<br />Self-hostable <b>worker infrastructure</b>: scalable, reliable, fast.
						<br />
						<a className="underline" href="https://github.com/windmill-labs/windmill">
							Fully Open-source
						</a>{' '}
						alternative to <i>Airplane</i>, <i>Superblocks</i> & <i>Retool</i>. 
					</h2>

					<div className="mt-10 flex items-center gap-x-6">
						<a
							href="https://app.windmill.dev/user/login"
							onClick={() => window.plausible('try-cloud')}
							data-analytics='"try-cloud"'
							className="rounded-md bg-blue-600 px-4 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800 hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 !no-underline"
						>
							Try Windmill Cloud
						</a>

						<a
							href="https://docs.windmill.dev/docs/advanced/self_host/"
							onClick={() => window.plausible('self-host')}
							className="text-base font-semibold leading-7 text-gray-900 text !no-underline"
						>
							Self-host yourself <span aria-hidden="true">→</span>
						</a>
					</div>

					<a
						href="https://docs.windmill.dev/docs/intro"
						onClick={() => window.plausible('getting-started')}
						className="text-xs ml-60 mt-6 leading-7 text-gray-600 text"
					>
						Read the docs
					</a>

					<div className="w-full text-left mt-16">
						Backed by <img className="inline ml-2" src="ycombinator.svg"></img>
					</div>
				</div>
				<div className="mx-auto mt-16 sm:mt-8">
					<div className="flex-none">
						<img
							src="/homescreen.svg"
							alt="App screenshot"
							className="w-full"
							width="1825"
							height="1920"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
