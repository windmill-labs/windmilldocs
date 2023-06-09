import React, { useState, useEffect } from 'react';
import LandingHeader from './LandingHeader';

function useGithubStars() {
	const [stars, setStars] = useState(0);

	useEffect(() => {
		fetch('https://api.github.com/repos/windmill-labs/windmill')
			.then((res) => res.json())
			.then((data) => {
				setStars(data.stargazers_count);
			});
	}, []);

	return stars;
}

export default function Hero() {
	const stars = useGithubStars();

	return (
		<div className="relative isolate overflow-hidden bg-white">
			<LandingHeader />

			<div className="mx-auto max-w-7xl px-6 pt-4 gap-y-8 pb-24 sm:pb-32 lg:flex lg:pt-10 lg:pb-36 lg:px-8 mt-4">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
					<div className="text-sm font-semibold flex flex-row text-gray-700">
						⭐️ {stars} - <span class="hidden md:block mx-1">Help others discover Windmill.</span>{' '}
						Star us on
						<a
							href="https://github.com/windmill-labs/windmill"
							className="pl-1 text-blue-500 underline hover:text-blue-700"
						>
							Github
						</a>
						.
					</div>
					<h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-black">
						Turn scripts into workflows and UIs in minutes
					</h1>
					<h2 className="mt-6 text-lg leading-8 text-gray-600 font-medium">
						Easily create internal apps and invincible workflows with code only where it matters.
						<br />
						Self-hostable <b>worker infrastructure</b>: scalable, reliable, fast.
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

					<div className="w-full text-left mt-16">
						Backed by <img className="inline ml-2" src="ycombinator.svg"></img>
					</div>
				</div>
				<div className="mx-auto mt-16 sm:mt-8">
					<div className="flex-none">
						<img
							src="/homescreen.svg"
							alt="Windmill infrastructure"
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
