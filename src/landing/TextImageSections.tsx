import React from 'react';
import TextImageSection from './TextImageSection';

export default function TextImageSections() {
	return (
		<>
			<TextImageSection
				title="Develop internal tools"
				description="Workflow engine for backend, raw app builder for frontend. Integrate with your existing infrastructure."
				imageSrc="/img/landing_page_V2/1.png"
				imageAlt="Code to production"
				imagePosition="right"
			/>
			<TextImageSection
				title="Deploy at scale"
				description="Best performance, enterprise-grade scalability"
				imageSrc="/img/landing_page_V2/2.png"
				imageAlt="Second section"
				imagePosition="left"
			/>
			<TextImageSection
				title="Monitor executions"
				description="Logs, metrics, alerts, and more. All in one place."
				imageSrc="/img/landing_page_V2/3.png"
				imageAlt="Third section"
				imagePosition="right"
			/>
		</>
	);
}
