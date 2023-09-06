import React from 'react';
import TestimonialCard from './TestimonialCard';

export default function LandingSection({
	children,
	bgClass = 'landing-section-gradient-background'
}) {
	return (
<div className={`w-full h-full py-16 overflow-x-hidden ${bgClass}`}>
	<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full ">
		{children}
		<div className="testimonial-section">
			{testimonials.map((testimonial) => (
				<TestimonialCard
					text={testimonial.text}
					author={testimonial.author}
					source={testimonial.source}
				/>
			))}
		</div>
	</div>
</div>
	);
}
