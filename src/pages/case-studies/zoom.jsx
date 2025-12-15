import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import { ArrowLeft } from 'lucide-react';
import CompanyLogo from '../../components/case-studies/CompanyLogo';

export default function ZoomCaseStudyPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>How Zoom built their enterprise demo platform with Windmill | Windmill Case Studies</title>
					<meta name="title" content="How Zoom built their enterprise demo platform with Windmill" />
					<meta name="description" content="Zoom's Global Architecture division built a centralized demo platform on Windmill, enabling 80+ Global Architects to contribute workflows in multiple languages, supporting 400+ solution engineers and 2,000 account managers." />
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<>
					<RadialBlur />
					<div className="pt-32 max-w-full">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
							{/* Back button */}
							<Link
								to="/case-studies"
								className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8 !no-underline"
							>
								<ArrowLeft className="w-4 h-4" />
								Back to Case Studies
							</Link>

							{/* Two-column layout */}
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
								{/* Left column - Company information */}
								<div className="lg:col-span-1">
									<div className="sticky top-32">
										<div className="mb-6">
											<CompanyLogo
												lightSrc="/images/brands/zoom-light.png"
												darkSrc="/images/brands/zoom-dark.png"
												alt="Zoom logo"
											/>
										</div>
										<div className="space-y-6">
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Industry
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													Enterprise software
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Company Size
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													5000+
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													What they do
												</div>
												<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
													Leading enterprise video communications platform offering meetings, phone systems, chat, and contact centers to millions of users globally.
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													What they do on Windmill
												</div>
												<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
													<div className="flex flex-wrap gap-2">
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Demo platform</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Account provisioning</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Account hydration</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Job scheduling</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">API orchestration</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Multi-language support</span>
													</div>
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Website
												</div>
												<a
													href="https://www.zoom.us"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline"
												>
													zoom.us
												</a>
											</div>
										</div>
									</div>
								</div>

								{/* Right column - Main content */}
								<div className="lg:col-span-2">
									{/* Header section */}
									<div className="mb-12">
										<div className="mb-6">
											<span className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
												Case Study
											</span>
										</div>
										<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
											How Zoom built their enterprise demo platform with Windmill
										</h1>
										<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
											Zoom's Global Architecture division supports 400+ solution engineers and 2,000 account managers who demonstrate interconnected products to enterprise customers. They built a centralized demo platform on Windmill, enabling 80+ Global Architects to contribute workflows in multiple languages, all self-hosted on AWS EKS.
										</p>
									</div>

									{/* Content sections */}
									<div className="space-y-12">
										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												Zoom is a leading enterprise video communications platform offering meetings, phone systems, chat, and contact centers to millions of users globally. Their Global Architecture division supports 400+ solution engineers and 2,000 account managers who demonstrate these interconnected products to enterprise customers. With multiple products that rely on real-time APIs and complex integrations, the team needed a scalable way to create consistent, high-quality demo environments that could showcase Zoom's full capabilities to prospective enterprise buyers.
											</p>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Problem</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												Zoom is not a simple product to demonstrate. Unlike tools where you can quickly spin up a sandbox environment, Zoom is a comprehensive platform with meetings, phone systems, chat, contact centers, and dozens of features—all interconnected and dependent on real-time APIs.
											</p>
											<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
												<p className="text-gray-700 dark:text-gray-300 italic mb-2">
													"Zoom can be a very complicated app to demo. There's a lot of moving parts. It's SaaS, which always makes things a little harder to demonstrate because it's not particularly easy to just build a complete sandbox."
												</p>
												<cite className="text-sm text-gray-500 dark:text-gray-400">
													— Frederick Loucks, Technical Leader, Demo Platform
												</cite>
											</blockquote>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												The traditional approach was unsustainable: every solution engineer built their own demo environment, manually creating accounts and maintaining configurations. This led to inconsistent quality, impossible scaling challenges, and valuable selling time wasted on demo infrastructure instead of closing deals.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												Frederick's team was tasked with building a centralized internal demo platform, but the requirements were demanding:
											</p>
											<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
												<li>Complex API Orchestration - Interact with 4 different Zoom API types (public, private web, back-office on-premise, browser automation)</li>
												<li>Polyglot Language Support - Support Python, TypeScript, PowerShell, Bash, and Ansible for varied technical backgrounds</li>
												<li>Robust Job Scheduling - Handle time-delayed tasks to create realistic content delivery</li>
												<li>Self-Hosted on Kubernetes - Complete control in their AWS EKS environment</li>
												<li>Everything-as-Code - Git-backed workflows with proper version control</li>
											</ul>
											<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
												<p className="text-gray-700 dark:text-gray-300 italic mb-2">
													"We needed something that could help us sit right in the middle of lots of different people needing to contribute, different languages being used, lots of CIS admin languages being used."
												</p>
												<cite className="text-sm text-gray-500 dark:text-gray-400">
													— Frederick Loucks
												</cite>
											</blockquote>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Solution</h2>
											
											<div className="space-y-8">
												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Polyglot language support for varied technical backgrounds
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Zoom's Global Architecture division includes experienced engineers who know PowerShell better than Python because they've been CIS admins or technical sales their whole careers. Windmill's support for Python, TypeScript, Go, Bash, PowerShell, and other languages meant the team could leverage existing scripts with minimal refactoring.
													</p>
													<div className="rounded-lg p-4 my-4 overflow-x-auto">
														<CodeBlock language="python">
															{`# Example: Existing internal library wrapped in Windmill

from zoom_platform_lib import account_provisioning

def main(account_email: str, license_type: str):
    # Business logic lives in separate library
    # Windmill orchestrates
    result = account_provisioning.create_account(
        email=account_email,
        license=license_type
    )
    return result`}
														</CodeBlock>
													</div>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Advanced job scheduling for realistic demo environments
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Zoom's most innovative use case—"drip hydration"—required sophisticated job scheduling. Unlike databases where you can insert data instantly, Zoom's real-time APIs require sequential message sending with realistic delays to create compelling demos that feel authentic.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"We actually use Windmill's job engine to do all that heavy lifting for us. We schedule jobs into Windmill's job engine into the future to handle these drip hydration tasks."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Frederick Loucks
														</cite>
													</blockquote>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														When a solution engineer schedules a demo for next Tuesday, they kick off account hydration on Friday. Over the weekend, Windmill's job engine delivers 50+ pieces of content at realistic intervals—chat messages trickle in, voicemails arrive, documents get shared. By Tuesday, the account looks like it's been actively used for weeks.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Windmill as central orchestration layer
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Windmill sits "at the center of everything" in Zoom's demo platform architecture, self-hosted in AWS EKS. The platform consists of a React front-end portal with Windmill Apps embedded via iframe, allowing rapid feature deployment without front-end code changes.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"We can build things very quickly in Windmill, iterate very quickly, and we can ship them into a nice front end without needing to really modify the front-end code in any way."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Frederick Loucks
														</cite>
													</blockquote>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														This architecture enables self-service account creation (which took a year to build and "couldn't have been done without Windmill"), realistic account hydration through scheduled job execution, and citizen developer enablement for 80+ Global Architects who can now contribute tools and workflows in their preferred languages.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Git-backed workflows for team collaboration
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
														With 80+ Global Architects contributing to the platform, version control and rollback capabilities were non-negotiable. Windmill's bidirectional Git sync provides both a system of record and the ability to revert commits when needed—critical for managing contributions from a large, distributed team.
													</p>
												</div>
											</div>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Result</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												After over a year in production, Windmill has proven rock-solid for handling mission-critical workflows that support Zoom's entire sales organization. Today, 80+ Global Architects contribute workflows and tools, supporting 400+ solution engineers who use the platform for demos daily and 2,000 account managers with demo capabilities—all self-hosted on AWS EKS with complete infrastructure control.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												The platform has automated the entire demo lifecycle: account creation and configuration, content hydration and population, API orchestrations across four paradigms, and custom tooling that enables citizen developers to build the tools they need. Zoom's sales organization can now deliver consistent, high-quality demos across 400+ solution engineers, scale demo capabilities without scaling manual effort, and iterate rapidly on new features—directly supporting Zoom's revenue by ensuring every customer interaction showcases the product at its best.
											</p>
										</section>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
