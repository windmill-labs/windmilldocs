import React from 'react';

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
			<div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-20 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
					<h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Turn scripts into internal workflows and UIs in minutes
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Easily create internal tools and customer apps with code where it matters. Open source,
						scalable, reliable, and blazingly fast.
					</p>
					<div className="mt-10 flex items-center gap-x-6">
						<a
							href="#"
							className="rounded-md bg-blue-600 px-4 py-2 text-base font-semibold leading-7 text-white shadow-xl hover:bg-blue-500 hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
						>
							Try Windmill for Free
						</a>
						<a href="#" className="text-base font-semibold leading-7 text-gray-900">
							Documentation <span aria-hidden="true">→</span>
						</a>
					</div>
					<div className="w-full text-center mt-16">
						Backed by <img className="inline ml-2" src="ycombinator.svg"></img>
					</div>
				</div>
				<div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
					<div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
						<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
							<img
								src="homescreen.png"
								alt="App screenshot"
								width={2432}
								height={1442}
								className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
