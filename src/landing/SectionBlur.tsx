import React from 'react';

type SectionBlueProps = {
	color?: string;
	position?: string;
};

export default function SectionBlur({
	color = '#bfdbfe',
	position = 'top-0 left-0 -translate-y-96 -translate-x-96'
}: SectionBlueProps) {
	const uuid = Math.random().toString(36).substring(7);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1024 1024"
			className={`absolute -z-10 h-[64rem] w-[64rem] ${position}`}
			aria-hidden="true"
		>
			<circle cx={512} cy={512} r={512} fill={`url(#${uuid})`} fillOpacity="0.7" />
			<defs>
				<radialGradient
					id={uuid}
					cx={0}
					cy={0}
					r={1}
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(512 512) rotate(90) scale(512)"
				>
					<stop stopColor={color} />
					<stop offset={1} stopColor={color} stopOpacity={0} />
				</radialGradient>
			</defs>
		</svg>
	);
}
