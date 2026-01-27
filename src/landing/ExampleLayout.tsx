import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import LayoutProvider from '@theme/Layout/Provider';
import LandingHeader from './LandingHeader';
import Footer from './Footer';
import RadialBlur from './RadialBlur';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Example } from './examplesData';

interface ExampleLayoutProps {
	example: Example;
}

function FeaturesList({ features }: { features: string[] }) {
	return (
		<div>
			<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Features</h3>
			<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
				{features.map((feature) => (
					<li key={feature}>{feature}</li>
				))}
			</ul>
		</div>
	);
}

function BuiltWithTags({ tags }: { tags: string[] }) {
	return (
		<div>
			<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Built with</h3>
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span
						key={tag}
						className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}

export default function ExampleLayout({ example }: ExampleLayoutProps) {
	const { title, description, iframeUrl, features, builtWith } = example;

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<Head>
					<title>{title} | Examples | Windmill</title>
					<meta name="title" content={`${title} | Examples | Windmill`} />
					<meta name="description" content={description} />
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<LandingHeader />
				<RadialBlur />

				<div className="pt-32 min-h-screen">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
						{/* Back link */}
						<Link
							href="/examples"
							className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8 !no-underline"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to examples
						</Link>

						{/* Main content */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
							{/* Sidebar */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4 }}
								className="lg:col-span-3"
							>
								<div className="sticky top-24">
									<h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
										{title}
									</h1>
									<p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
										{description}
									</p>

									<div className="space-y-4">
										<FeaturesList features={features} />
										<BuiltWithTags tags={builtWith} />
									</div>

									<div className="mt-6">
										<Link
											href="https://app.windmill.dev/user/login"
											className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors no-underline text-sm"
										>
											Try Windmill
										</Link>
									</div>

									{/* Social share */}
									<div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
										<p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
											Share this example
										</p>
										<div className="flex gap-3">
											<a
												href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
													`Check out this ${title} example built with @WindmillDev`
												)}&url=${encodeURIComponent(
													typeof window !== 'undefined' ? window.location.href : ''
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
											>
												<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
													<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
												</svg>
											</a>
											<a
												href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
													typeof window !== 'undefined' ? window.location.href : ''
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
											>
												<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
													<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
												</svg>
											</a>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Iframe container */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.1 }}
								className="lg:col-span-9"
							>
								<div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
									{/* App header bar */}
									<div className="bg-gray-900 px-4 py-3 flex items-center gap-3">
										<div className="flex gap-1.5">
											<div className="w-3 h-3 rounded-full bg-red-500" />
											<div className="w-3 h-3 rounded-full bg-yellow-500" />
											<div className="w-3 h-3 rounded-full bg-green-500" />
										</div>
										<div className="flex-1 text-center">
											<span className="text-sm text-gray-400">{title}</span>
										</div>
										<a
											href={iframeUrl || '#'}
											target="_blank"
											rel="noopener noreferrer"
											className={`inline-flex items-center gap-1.5 text-xs text-gray-400 transition-colors ${
												iframeUrl ? 'hover:text-white' : 'cursor-not-allowed'
											}`}
											onClick={(e) => !iframeUrl && e.preventDefault()}
										>
											Open in new tab
											<ExternalLink className="w-3.5 h-3.5" />
										</a>
									</div>

									{/* Iframe */}
									<div className="relative" style={{ height: '600px' }}>
										{iframeUrl ? (
											<iframe
												src={iframeUrl}
												className="w-full h-full border-0"
												title={title}
												allow="clipboard-read; clipboard-write"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
												<div className="text-center">
													<p className="text-gray-500 dark:text-gray-400 mb-2">
														App preview placeholder
													</p>
													<p className="text-sm text-gray-400 dark:text-gray-500">
														Iframe URL will be configured here
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				<Footer />
			</main>
		</LayoutProvider>
	);
}
