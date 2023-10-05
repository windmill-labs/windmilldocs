import React from 'react';
import RadialBlur from './RadialBlur';
import { useColorMode } from '@docusaurus/theme-common';

export default function HeroAI() {
	const { colorMode } = useColorMode();

	return (
		<div className="relative rounded-none mx-auto max-w-screen-2xl overflow-hidden 2xl:rounded-3xl pt-32">
			<RadialBlur />

			<div className="grid gap-4 mx-auto max-w-7xl px-6 gap-y-8 lg:flex lg:px-8 py-16 items-center">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">

					<h1 className="mt-4 !text-4xl tracking-tight sm:!text-5xl text-purple-600 dark:text-purple-400">
						Build internal tools with Windmill AI
					</h1>
					<h2 className="mt-6 text-lg leading-8  font-normal">
						Windmill is a low-code platform for building endpoints, flows, and apps from simple
						scripts. The presence of code at the heart of Windmill offers unlimited possibilities so
						as not to rely solely on pre-built integrations.
					</h2>
					<h2 className="mt-6 text-lg leading-8  font-normal">
						With the integration of AI models within Windmill, your willpower alongside a few prompts can create the
						internal tools you want in just a few seconds.
					</h2>
					<h2 className="mt-6 text-lg leading-8  font-normal">
						The AI generates code that matches Windmill's specifications, especially the interaction
						with external APIs.
					</h2>

					<div className="mt-10 flex items-center gap-x-6">
						<a
							href="https://app.windmill.dev/user/login"
							onClick={() => window.plausible('try-cloud')}
							data-analytics='"try-cloud"'
							className="rounded-md transition-all px-4 py-2 text-base font-semibold leading-7 text-purple-600 hover:!text-purple-900 dark:text-purple-400 hover:!text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 !no-underline"
							rel="nofollow"
						>
							Try Windmill Cloud
						</a>

						<a
							href="https://www.windmill.dev/docs/advanced/self_host"
							onClick={() => window.plausible('self-host')}
							className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200 text !no-underline"
						>
							Self-host yourself <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
				<div className="mt-16 sm:mt-8 h-full rounded-md overflow-hidden">
					<video src="/videos/flow_ai.mp4" autoPlay={true} loop={true} loading="lazy" />
				</div>
			</div>
		</div>
	);
}
