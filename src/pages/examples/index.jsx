import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import CallToAction from '../../landing/CallToAction';
import RadialBlur from '../../landing/RadialBlur';
import LandingSection from '../../landing/LandingSection';
import ExampleCard from '../../landing/ExampleCard';
import { motion } from 'framer-motion';

const examples = [
	{
		title: 'AI Agent',
		description:
			'Build an AI-powered agent that can interact with your data, answer questions, and automate tasks using LLMs.',
		href: '/examples/ai-agent',
		color: 'purple'
	},
	{
		title: 'Data Pipeline',
		description:
			'Create ETL workflows that extract, transform, and load data across multiple sources with scheduling and monitoring.',
		href: '/examples/data-pipeline',
		color: 'teal'
	},
	{
		title: 'Payment Dashboard',
		description:
			'Track payments, revenue metrics, and financial data with an interactive dashboard connected to your payment provider.',
		href: '/examples/payment-dashboard',
		color: 'blue'
	},
	{
		title: 'Customer Support',
		description:
			'Manage support tickets, track response times, and monitor customer satisfaction with a unified support interface.',
		href: '/examples/customer-support',
		color: 'orange'
	}
];

export default function ExamplesPage() {
	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Examples | Windmill</title>
					<meta name="title" content="Examples | Windmill" />
					<meta
						name="description"
						content="Explore interactive examples built with Windmill. AI agents, data pipelines, dashboards, and more."
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<LandingHeader />
				<RadialBlur fullWidth />

				{/* Hero Section */}
				<div className="max-w-7xl mx-auto px-4 lg:px-8 pt-32 pb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center"
					>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
							Examples
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
							Interactive applications built with Windmill's Raw App Builder.
							Explore what you can create with code-first frontends powered by Windmill.
						</p>
					</motion.div>
				</div>

				{/* Examples Grid */}
				<LandingSection bgClass="">
					<div className="w-full">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
						>
							{examples.map((example, index) => (
								<motion.div
									key={example.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<ExampleCard
										title={example.title}
										description={example.description}
										href={example.href}
										color={example.color}
									/>
								</motion.div>
							))}
						</motion.div>
					</div>
				</LandingSection>

				{/* Call to Action */}
				<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full py-16">
					<CallToAction />
				</div>

				<Footer />
			</main>
		</LayoutProvider>
	);
}
