import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Code, Hand } from 'lucide-react';
import HeroAI from '../landing/HeroAI';

import Section from './../landing/Section';
import { DeveloperModeContext } from './index';

const tabs = [
	{
		label: 'App editor',
		icon: Code,
		id: 'app-editor',
		data: [
			{
				title: 'Generate Windmill-specific code from simple prompt',
				description:
					'The AI-generated script will set to be tested right away, with an auto-generated UI and a dedicated webhook.',
				icon: Hand,
				caption: <div>Code Edition</div>,
				video: {
					videoSrc: '/videos/ai_generation.mp4',
					altText: 'Code Edition',
					videoLength: '21'
				}
			},
			{
				title: 'Code Edition',
				description:
					'Select the code section you want to edit and give instructions to the AI assistant.',
				icon: Hand,
				caption: <div>Code Edition</div>,
				video: {
					videoSrc: '/videos/ai_edit.mp4',
					altText: 'Code Edition',
					videoLength: '21'
				}
			},
			{
				title: 'Code Fixing',
				description:
					'Upon error when executing code, you will be offered to "AI Fix" it. The assistant will automatically read the code, explain what went wrong, and suggest a way to fix it.',
				icon: Hand,
				caption: <div>Code Fixing</div>,
				video: {
					videoSrc: '/videos/ai_fix.mp4',
					altText: 'Code Fixing',
					videoLength: '21'
				}
			}
		]
	}
];

const flowTabs = [
	{
		label: 'Flow editor',
		icon: Code,
		id: 'flow-editor',
		data: [
			{
				title: 'Sequence Flow Generation',
				description:
					'Describe the sequence of actions you wish to execute, and the AI Flow builder will write all the steps, link them together, and allow you to trigger the flow manually.',
				icon: Hand,
				caption: <div>Code Edition</div>,
				video: {
					videoSrc: '/videos/flow_ai.mp4',
					altText: 'Code Edition',
					videoLength: '21'
				}
			},
			{
				title: 'Trigger Flow Generation',
				description:
					'Build a flow with two scripts, one that regularly checks for changes in an external system and a second that is executed for each change using a for-loop. This allows you to avoid relying on webhooks sent by external APIs, which can be tedious to configure.',
				icon: Hand,
				caption: <div>Code Edition</div>,
				video: {
					videoSrc: '/videos/flow_ai_trigger.mp4',
					altText: 'Code Edition',
					videoLength: '21'
				}
			}
		]
	}
];

export default function Windmill_AI() {
	const [developerMode, setDeveloperMode] = useState(false);

	return (
		<DeveloperModeContext.Provider
			value={{
				developerMode: developerMode,
				setDeveloperMode: setDeveloperMode
			}}
		>
			<LayoutProvider>
				<main>
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
						description="Windmill AI for Scripts"
						color="blue"
						key="windmill-ai-script"
						kind="script"
						examples={[]}
						cards={[]}
						shouldShowDevModeSwitch={false}
					/>

					<Section
						title="Windmill AI for flows"
						caption="Build scripts powered by AI in seconds."
						tabs={flowTabs}
						description="Windmill AI for Flows"
						color="teal"
						key="windmill-ai-flows"
						kind="script"
						examples={[]}
						cards={[]}
						shouldShowDevModeSwitch={false}
					/>

					<Footer />
				</main>
			</LayoutProvider>
		</DeveloperModeContext.Provider>
	);
}
