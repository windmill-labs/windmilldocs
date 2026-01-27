import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import CallToAction from '../../landing/CallToAction';
import RadialBlur from '../../landing/RadialBlur';
import ExampleCard from '../../landing/ExampleCard';
import { examples } from '../../landing/examplesData';
import { motion } from 'framer-motion';

export default function ExamplesPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Examples | Windmill</title>
					<meta name="title" content="Examples | Windmill" />
					<meta
						name="description"
						content="Explore interactive examples built with Windmill. AI agents, data pipelines, dashboards, and more."
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<>
					<RadialBlur />
					<div className="pt-32 max-w-full">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
							{/* Header section */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="text-center mb-16"
							>
								<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
									Examples
								</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
									Interactive applications built with Windmill's Raw App Builder.
									Explore what you can create with code-first frontends powered by Windmill.
								</p>
							</motion.div>

							{/* Examples Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{examples.map((example, index) => (
									<motion.div
										key={example.slug}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<ExampleCard
											title={example.title}
											description={example.shortDescription}
											href={`/examples/${example.slug}`}
										/>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</>

				{/* Call to Action */}
				<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full py-16">
					<CallToAction />
				</div>

				<Footer />
			</main>
		</LayoutProvider>
	);
}
