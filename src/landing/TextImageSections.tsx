import React from 'react';
import TextImageSection from './TextImageSection';

export default function TextImageSections() {
	return (
		<>
			<TextImageSection
				title="Build internal tools 10x faster with full flexibility"
				description="Write scripts in 20+ languages and 100+ integrations, chain them with our workflow engine, and build custom frontends. AI-integrated throughout."
				imageSrc="/img/landing_page_V2/1.png"
				imageAlt="Code to production"
				imagePosition="right"
			/>
			<TextImageSection
				title="Deploy at scale with industry-leading performance"
				description="The fastest workflow engine available proven on benchmarks. Auto-scale to thousands of concurrent workers. Process millions of executions with sub-second cold starts and zero infrastructure management."
				imageSrc="/img/landing_page_V2/2.png"
				imageAlt="Second section"
				imagePosition="left"
			/>
			<TextImageSection
				title="Full visibility across all executions"
				description="Track every job, workflow, and script execution with complete logs. See inputs, outputs, errors, and performance metrics in real-time. Built-in observability with alerts and dashboards—no external monitoring tools needed."
				imageSrc="/img/landing_page_V2/3.png"
				imageAlt="Third section"
				imagePosition="right"
			/>
		</>
	);
}
