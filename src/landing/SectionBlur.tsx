import React from 'react';

export default function SectionBlur() {
	return (
		<div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 -z-10 transform-gpu">
			<div className="blur-[106px] h-56 bg-gradient-to-br from-blue-300 to-blue-200" />
			<div className="blur-[106px] h-32 bg-gradient-to-r from-blue-200 to-blue-100" />
		</div>
	);
}
