import React from 'react';
import TextImageSection from './TextImageSection';
import HomescreenSvg from '../../static/homescreen.svg';
import FlowChart from './FlowChart';

export default function TextImageSections() {
	return (
		<>
			<TextImageSection
				title="Build internal tools 10x faster with full flexibility"
				description="Write scripts in 20+ languages and 100+ integrations, chain them with our workflow engine, and build custom frontends. AI-integrated throughout."
				svgComponent={HomescreenSvg}
				imagePosition="right"
			/>
			<TextImageSection
				title="Deploy at scale with industry-leading performance"
				description="The fastest workflow engine available proven on benchmarks. Auto-scale to thousands of concurrent workers. Process millions of executions with sub-second cold starts and zero infrastructure management."
				chartComponent={FlowChart}
				learnMoreUrl="/docs/misc/benchmarks/competitors"
				imagePosition="left"
			/>
			<TextImageSection
				title="Full visibility across all executions"
				description="Track every job, workflow, and script execution with complete logs. See inputs, outputs, errors, and performance metrics in real-time. Built-in observability with alerts and dashboards—no external monitoring tools needed."
				imageSrc="/illustrations/11.png"
				imageAlt="Third section"
				imagePosition="right"
			/>
		</>
	);
}
