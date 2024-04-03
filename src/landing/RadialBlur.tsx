import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function RadialBlur({ color }) {
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
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1024 1024"
			className="absolute -top-[256px] left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2"
			aria-hidden="true"
		>
			<circle
				cx={512}
				cy={512}
				r={512}
				fill="url(#827591b1-ce8c-4110-b064-7cb85a0b12172)"
				fillOpacity="0.7"
			/>
			<defs>
				<radialGradient
					id="827591b1-ce8c-4110-b064-7cb85a0b12172"
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
	);
}
