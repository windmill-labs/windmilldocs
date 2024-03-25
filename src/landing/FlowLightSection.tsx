import React from 'react';
import LandingSection from './LandingSection';

// @ts-ignore
import approval from '/illustrations/approval.json';
// @ts-ignore
import performance from '/illustrations/performance.json';
import CardSection from './cards-v2/CardSection';
import { ArrowDownUp, CheckCircle, Gauge, TerminalSquare, LucideIcon } from 'lucide-react';

const features = [
	{
		title: 'Approval',
		description:
			'Suspend the execution of a flow and request confirmation from given users before resuming.',
		lottieData: approval,
		url: '/docs/flows/flow_approval',
		Icon: CheckCircle,
		autoplay: true,
		loop: false,
		vertical: true
	},

	{
		title: 'Data pipelines',
		description: 'Orchestrate pipelines & ETLs with observability and control at any step.',

		url: '/docs/core_concepts/data_pipelines',
		Icon: ArrowDownUp,
		vertical: true
	},
	{
		title: 'Advanced Features',
		description:
			'Build powerful flows with advanced features like triggers, error handling, retries, loops and branches',
		url: '/docs/getting_started/trigger_flows#triggers-from-external-events',
		defaultImage: '/illustrations/flows.png',
		vertical: true
	},
	{
		title: 'Performance',
		description: 'The fastest and extremely scalable workflow engine.',
		lottieData: performance,
		vertical: true,
		url: '/docs/misc/benchmarks/competitors',
		Icon: Gauge
	},
	{
		title: 'Workflows as Code',
		description:
			'Flows are not the only way to write distributed programs that execute distinct jobs. Another approach is to write a program that defines the jobs and their dependencies, and then execute that program.			',

		Icon: TerminalSquare
	}
] as {
	title: string;
	description: string;
	images: string[];
	height: number;
	noAnimation?: boolean;
	lottieData?: unknown;
	Icon: LucideIcon;
	url?: string;
	vertical?: boolean;
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
