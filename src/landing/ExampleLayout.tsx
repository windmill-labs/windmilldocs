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


export default function ExampleLayout({ example }: ExampleLayoutProps) {
	const { title, description, iframeUrl, builtWith } = example;

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

						{/* Header section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							className="mb-8"
						>
							<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
								{title}
							</h1>
							<p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
								{description}
							</p>

							<div className="flex flex-wrap items-center gap-6">
								<div className="flex flex-wrap gap-2">
									{builtWith.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
								<Link
									href="https://app.windmill.dev/user/login"
									className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors no-underline text-sm"
								>
									Try Windmill
								</Link>
							</div>
						</motion.div>

						{/* Iframe container */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.1 }}
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
								<div className="relative" style={{ height: '70vh', minHeight: '500px' }}>
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

				<Footer />
			</main>
		</LayoutProvider>
	);
}
