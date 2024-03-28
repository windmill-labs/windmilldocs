import React from 'react';
import LandingSection from './LandingSection';

// @ts-ignore
import approval from '/illustrations/approval.json';
// @ts-ignore
import performance from '/illustrations/performance.json';
import CardSection from './cards-v2/CardSection';
import {
	ArrowDownUp,
	CheckCircle,
	Gauge,
	TerminalSquare,
	LucideIcon,
	Settings
} from 'lucide-react';

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
		vertical: true,
		defaultImage: '/illustrations/data_pipelines.png'
	},
	{
		title: 'Advanced Features',
		description:
			'Build powerful flows with advanced features like triggers, error handling, retries, loops and branches',
		url: '/docs/getting_started/trigger_flows#triggers-from-external-events',
		defaultImage: '/illustrations/flows.png',
		vertical: true,
		Icon: Settings
	},
	{
		title: 'Performance',
		description: 'The fastest and extremely scalable workflow engine.',
		lottieData: performance,
		vertical: true,
		url: '/docs/misc/benchmarks/competitors',
		Icon: Gauge,
		autoplay: true,
		loop: false
	},
	{
		title: 'Workflows as Code',
		description:
			'Build, version, and manage your workflows as code with the Windmill SDK. Use your favorite IDE, version control system, and CI/CD pipeline to manage your workflows.',

		Icon: TerminalSquare,
		defaultImage: '/illustrations/workflow_as_code.png',
		url: '/docs/core_concepts/workflows_as_code'
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
	defaultImage?: string;
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
