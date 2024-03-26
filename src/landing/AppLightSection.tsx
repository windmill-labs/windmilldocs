import React from 'react';
import LandingSection from './LandingSection';
import CardSection from './cards-v2/CardSection';
import { Code, Gauge, Hand, Palette, Puzzle, LucideIcon } from 'lucide-react';

const features = [
	{
		title: 'Drag and Drop Interface',
		description:
			'Easily assemble apps with a user-friendly drag and drop interface, streamlining app development without deep coding.',
		Icon: Hand
	},

	{
		title: 'Beautiful Components',
		description:
			'Use over 50 built-in components for fast and efficient app development, covering a wide range of functionalities.',

		Icon: Puzzle,
		vertical: true,
		defaultImage: '/illustrations/components.png'
	},
	{
		title: 'High-Performance Apps',
		description:
			'Experience responsive and efficient apps, thanks to a reactive engine that handles complex operations smoothly.',
		Icon: Gauge,
		vertical: true,
		defaultImage: '/illustrations/app_performance.png'
	},
	{
		title: 'Styling and Theming',
		description:
			'Style components and define global themes with CSS or Tailwind, ensuring cohesive and brand-aligned designs effortlessly.',
		Icon: Palette,
		defaultImage: '/illustrations/styling.png'
	},
	{
		title: 'Developer Friendly',
		description:
			'Run scripts in Python, Go, Bash, SQL, and TypeScript directly within the app editor.',
		Icon: Code,
		defaultImage: '/illustrations/developer_friendly.png'
	}
] as {
	title: string;
	description: string;
	images: string[];
	span: string;
	height: number;
	noAnimation?: boolean;
	lottieData?: unknown;
	Icon: LucideIcon;
	vertical?: boolean;
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
