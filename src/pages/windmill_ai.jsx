import React from 'react';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
	Code,
	Workflow,
	HeartPulseIcon,
	FileEditIcon,
	Wand2,
	ZapIcon,
	Plug,
	Braces
} from 'lucide-react';
import HeroAI from '../landing/HeroAI';

import Section from './../landing/Section';
import GlobalContextProvider from '../components/GlobalContextProvider';

const tabs = [
	{
		label: 'Code editor',
		icon: Code,
		id: 'code-editor',
		data: [
			{
				title: 'AI Chat',
				description:
					"Get help with coding tasks through the AI Chat. Generate code, fix issues, improve your code, or add documentation with granular control over suggestions. Add context like database schemas or error messages for better assistance.",
				icon: Wand2,
				caption: (
					<div>
						From the{' '}
						<a href="/docs/script_editor" target="_blank">
							script editor
						</a>, press CMD/CTRL + L to open the AI chat panel and write what you want to do.
					</div>
				),
				video: {
					videoSrc: '/videos/ai_chat.mp4',
					altText: 'AI Chat'
				}
			},
			{
				title: 'Code completion',
				description:
					'Press Tab to autocomplete code snippets based on neighboring context, not just at the cursor.',
				icon: FileEditIcon,
				video: {
					videoSrc: '/videos/ai_autocomplete.mp4',
					altText: 'AI Autocomplete'
				}
			},
			{
				title: 'Code Fixing',
				description:
					'Upon error when executing code, you will be offered to "AI Fix" it. The assistant will automatically read the code, explain what went wrong, and suggest a way to fix it.',
				icon: HeartPulseIcon,
				caption: (
					<div>
						The{' '}
						<a href="/docs/core_concepts/ai_generation#code-fixing" target="_blank">
							assistant
						</a>{' '}
						will automatically read the code, explain what went wrong, and suggest a way to fix it.
					</div>
				),
				video: {
					videoSrc: '/videos/ai_fix.mp4',
					altText: 'Code Fixing'
				}
			}
		]
	}
];

const flowTabs = [
	{
		label: 'Flow editor',
		icon: Workflow,
		id: 'flow-editor',
		data: [
			{
				title: 'AI Flow Chat',
				description:
					'Describe what you want to achieve, and the AI will help build or modify your flow by generating or suggesting relevant scripts from your workspace and the hub, while ensuring that all steps are properly connected.',
				icon: Workflow,
				caption: (
					<div>
						Just explain what you want the flow to do, and the{' '}
						<a href="/docs/core_concepts/ai_generation#ai-flow-chat" target="_blank">
							assistant
						</a>{' '}
						will build steps & link them together.
					</div>
				),
				video: {
					videoSrc: 'VIDEO_PLACEHOLDER',
					altText: 'AI Flow Chat'
				}
			},
			{
				title: 'Step Input Copilot',
				description:
					'When adding a new step to a flow, the AI assistant will suggest inputs based on the previous steps` results and flow inputs.',
				icon: Plug,
				caption: (
					<div>
						When adding a new step to a flow, the AI assistant will suggest inputs{' '}
						<a href="/docs/flows/architecture#connecting-flow-steps" target="_blank">
							inputs
						</a>
						.based on the previous steps' results and flow inputs.
					</div>
				),
				video: {
					videoSrc: '/videos/step_input_copilot.mp4',
					altText: 'Step Input Copilot'
				}
			},
			{
				title: 'Predicate expressions Copilot for Branches and For loops',
				description:
					'When adding a for loop or a branch, the AI assistant will suggest iterator expressions based on the previous steps` results or from a prompt.',
				icon: Braces,
				caption: (
					<div>
						When adding a for loop or a branch
						<a href="/docs/flows/flow_loops" target="_blank">
							for loop
						</a>{' '}
						or a{' '}
						<a href="/docs/flows/flow_branches" target="_blank">
							branch
						</a>
						, the AI assistant will suggest iterator expressions based on the previous steps`
						results or from a prompt.
					</div>
				),
				video: {
					videoSrc: '/videos/branch_predicate_copilot.mp4',
					altText: 'Predicate expressions Copilot for Branches and For loops'
				}
			}
		]
	}
];

export default function Windmill_AI() {
	return (
		<LayoutProvider>
			<main>
				<GlobalContextProvider>
					<Head>
						<title>Windmill AI</title>
						<meta name="Windmill AI" content="Windmill Team." />
						<meta
							name="description"
							content="We are a team commited to open source, with a strong will to improve internal tools for everyone."
						/>
					</Head>
					<LandingHeader />
					<HeroAI />

					<Section
						title="Windmill AI for Scripts"
						caption="Build scripts powered by AI in seconds."
						tabs={tabs}
						description=""
						color="blue"
						key="windmill-ai-script"
						kind="script"
						examples={[]}
						cards={[]}
						shouldShowDevModeSwitch={false}
					/>

					<Section
						title="Windmill AI for flows"
						caption="Build flows powered by AI in seconds."
						tabs={flowTabs}
						description=""
						color="teal"
						key="windmill-ai-flows"
						kind="script"
						examples={[]}
						cards={[]}
						shouldShowDevModeSwitch={false}
					/>

					<Footer />
				</GlobalContextProvider>
			</main>
		</LayoutProvider>
	);
}
