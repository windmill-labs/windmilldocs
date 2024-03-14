import React from 'react';

import LandingSection from './LandingSection';

import approval from '/illustrations/approval.json';
import performance from '/illustrations/performance.json';
import triggers from '/illustrations/triggers.json';
import CardSection from './cards-v2/CardSection';

const features = [
	{
		title: 'Approval',
		description:
			'Suspend the execution of a flow and request confirmation from given users before resuming.',
		lottieData: approval,
		span: 'col-span-1'
	},

	{
		title: 'Data pipeline',
		description: 'Orchestrate pipelines & ETLs with observability and control at any step.',
		span: 'col-span-1'
	},
	{
		title: 'Triggers',
		description:
			'Trigger flows from webhooks, schedules, CLI, Slack, and more. Easily integrate with your existing tools.',
		span: 'col-span-1'
	},
	{
		title: 'Performance',
		description: 'The fastest workflow engine',
		lottieData: performance,
		span: 'col-span-1'
	},
	{
		title: 'Workflows as Code',
		description:
			'Flows are not the only way to write distributed programs that execute distinct jobs. Another approach is to write a program that defines the jobs and their dependencies, and then execute that program.			',
		span: 'col-span-2'
	}
] as {
	title: string;
	description: string;
	images: string[];
	span: string;
	height: number;
	noAnimation?: boolean;
	lottieData?: unknown;
}[];

const colors = {
	titleColor: 'text-emerald-900 dark:text-emerald-300',
	textColor: 'text-gray-600 dark:text-gray-100',
	linkColor: 'text-emerald-500 dark:text-emerald-300'
};

export default function FlowsLightSections() {
	return (
		<LandingSection bgClass="">
			<CardSection
				colors={colors}
				title="Build complex flows without complexity"
				description="Build complex Flows from atomic scripts, either from your workspace or the Hub."
				features={features}
				defaultImage="/illustrations/fond-flows.png"
			/>
		</LandingSection>
	);
}
