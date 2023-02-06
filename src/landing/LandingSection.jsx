import React from 'react';

export default function LandingSection({
	children,
	bgClass = 'landing-section-gradient-background'
}) {
	return (
		<div className={`w-full h-full ${bgClass} py-16 `}>
			<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full">
				{children}
			</div>
		</div>
	);
}
