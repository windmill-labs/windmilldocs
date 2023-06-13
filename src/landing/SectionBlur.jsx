import React from 'react';

export default function SectionBlur() {
	return (
		<div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 -z-10">
			<div className="blur-[106px] h-56 bg-gradient-to-br from-blue-500 to-blue-400" />
			<div className="blur-[106px] h-32 bg-gradient-to-r from-blue-400 to-blue-300" />
		</div>
	);
}
