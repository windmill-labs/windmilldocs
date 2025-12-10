import React from 'react';
import TextImageSection from './TextImageSection';

export default function TextImageSections() {
	return (
		<>
			<TextImageSection
				title="Code to production in minutes"
				description="Run long-running heavy background jobs, script with complex dependencies, endpoints with high rpm or simple one-off tasks without any overhead. Trigger them from a webhook or the auto-generated UI and monitor them easily."
				imageSrc="/img/flow_ui.png"
				imageAlt="Code to production"
				imagePosition="right"
			/>
			<TextImageSection
				title="Second Section Title"
				description="This is the description for the second section. It demonstrates how the component works with the image on the left side."
				imageSrc="/homescreen-app.png"
				imageAlt="Second section"
				imagePosition="left"
			/>
			<TextImageSection
				title="Third Section Title"
				description="This is the description for the third section. It demonstrates how the component works with the image on the right side again."
				imageSrc="/homescreen-app.png"
				imageAlt="Third section"
				imagePosition="right"
			/>
		</>
	);
}
