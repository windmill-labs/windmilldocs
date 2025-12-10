import React from 'react';
import TextImageSection from './TextImageSection';

export default function TextImageSections() {
	return (
		<>
			<TextImageSection
				title="Code to production in minutes"
				description="Run long-running heavy background jobs, script with complex dependencies."
				imageSrc="/img/landing_page_V2/1.png"
				imageAlt="Code to production"
				imagePosition="right"
			/>
			<TextImageSection
				title="Second Section Title"
				description="Run long-running heavy background jobs, script with complex dependencies"
				imageSrc="/img/landing_page_V2/2.png"
				imageAlt="Second section"
				imagePosition="left"
			/>
			<TextImageSection
				title="Third Section Title"
				description="Run long-running heavy background jobs, script with complex dependencies"
				imageSrc="/img/landing_page_V2/3.png"
				imageAlt="Third section"
				imagePosition="right"
			/>
		</>
	);
}
