import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function CallToAction({ color }) {
	const { colorMode } = useColorMode();

	const colorMap = {
		blue: {
			light: '#bfdbfe',
			dark: '#3b82f6'
		},
		orange: {
			light: '#fb923c',
			dark: '#7c2d12'
		},
		green: {
			light: '#bbf7d0',
			dark: '#10b981'
		}
	};

	const c = colorMap[color ?? 'blue'][colorMode];

	return (
		<div className="w-full py-16">
			<div className="">
				<div className="relative isolate overflow-hidden bg-gray-900 dark:bg-white px-6 py-24 text-center rounded-3xl sm:px-16">
					<h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white dark:text-gray-900">
						Build endpoints, workflows & ETLs, UIs with code only where it matters
					</h2>
					<p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-gray-300 dark:text-gray-600">
						Get started building your internal tool in under 10 minutes
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<a
							href="https://app.windmill.dev/user/login"
							onClick={() => window.plausible('try-cloud')}
							data-analytics='"try-cloud"'
							className="rounded-md bg-white px-3.5 py-1.5 text-base hover:text-blue-500 font-semibold leading-7 text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white !no-underline"
							rel="nofollow"
						>
							Get started for free
						</a>
						<a
							href="https://www.windmill.dev/book-demo"
							data-analytics='"schedule-demo"'
							onClick={() => window.plausible('schedule-demo')}
							className="text-base font-semibold leading-7 text-white !no-underline dark:text-gray-900"
						>
							Schedule a demo <span aria-hidden="true">→</span>
						</a>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1024 1024"
						className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
						aria-hidden="true"
					>
						<circle
							cx={512}
							cy={512}
							r={512}
							fill="url(#827591b1-ce8c-4110-b064-7cb85a0b12171)"
							fillOpacity="0.7"
						/>
						<defs>
							<radialGradient
								id="827591b1-ce8c-4110-b064-7cb85a0b12171"
								cx={0}
								cy={0}
								r={1}
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(512 512) rotate(90) scale(512)"
							>
								<stop stopColor={c} />
								<stop offset={1} stopColor={c} stopOpacity={0} />
							</radialGradient>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	);
}
