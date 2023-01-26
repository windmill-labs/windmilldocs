import React from 'react';

export default function LandingSection({
	children,
	bgClass = 'landing-section-gradient-background'
}) {
	return (
		<div className={`w-full h-full ${bgClass} py-16 px-8`}>
			<div className="max-w-6xl mx-auto flex justify-center items-center h-full">{children}</div>
		</div>
	);
}
