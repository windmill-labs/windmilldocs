import React from 'react';

import LandingSection from './LandingSection';

import approval from '/illustrations/approval.json';
import performance from '/illustrations/performance.json';
import triggers from '/illustrations/triggers.json';
import CardSection from './cards-v2/CardSection';
import { Code, Gauge, Hand, Palette, Puzzle } from 'lucide-react';

const features = [
	{
		title: 'Drag and Drop Interface',
		description:
			'Easily assemble apps with a user-friendly drag and drop interface, streamlining app development without deep coding.',
		span: 'col-span-2',
		Icon: Hand
	},

	{
		title: 'Beautiful Components',
		description:
			'Use over 50 built-in components for fast and efficient app development, covering a wide range of functionalities.',
		span: 'col-span-1',
		Icon: Puzzle
	},
	{
		title: 'High-Performance Apps',
		description:
			'Experience responsive and efficient apps, thanks to a reactive engine that handles complex operations smoothly.',
		span: 'col-span-1',
		Icon: Gauge
	},
	{
		title: 'Styling and Theming',
		description:
			'Style components and define global themes with CSS or Tailwind, ensuring cohesive and brand-aligned designs effortlessly.',
		span: 'col-span-2',
		Icon: Palette
	},
	{
		title: 'Developer Friendly',
		description:
			'Run scripts in Python, Go, Bash, SQL, and TypeScript directly within the app editor.',
		span: 'col-span-2',
		Icon: Code
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
	titleColor: 'text-orange-900 dark:text-orange-300',
	textColor: 'text-gray-600 dark:text-gray-100',
	linkColor: 'text-orange-500 dark:text-orange-300'
};

export default function FlowsLightSections() {
	return (
		<LandingSection bgClass="">
			<CardSection
				colors={colors}
				title="Build super fast and powerful apps using drag-and-drop"
				description="Create apps with a user-friendly drag-and-drop interface, streamlining app development without deep coding."
				features={features}
				defaultImage="/illustrations/fond-apps.png"
			/>
		</LandingSection>
	);
}
