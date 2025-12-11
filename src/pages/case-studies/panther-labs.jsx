import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import { ArrowLeft } from 'lucide-react';

export default function PantherLabsCaseStudyPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>How Panther Labs escaped vendor lock-in and built a platform-agnostic architecture with Windmill | Windmill Case Studies</title>
					<meta name="title" content="How Panther Labs escaped vendor lock-in and built a platform-agnostic architecture with Windmill" />
					<meta name="description" content="When Airplane.dev shut down, Panther Labs had 30 days to migrate their entire internal operations platform. They chose Windmill for its open-source foundation and platform-agnostic architecture." />
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
											<img
												src="/images/brands/panther-labs-white.png"
												alt="Panther Labs logo"
												className="h-24 w-auto object-contain dark:opacity-100 mb-6"
											/>
										</div>
										<div className="space-y-6">
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Industry
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													Cybersecurity
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Company Size
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													50-200
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													What they do
												</div>
												<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
													Modern cybersecurity SIEM (Security Information and Event Management) platform that helps security teams detect threats at scale.
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Website
												</div>
												<a
													href="https://panther.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline"
												>
													panther.com
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
											How Panther Labs escaped vendor lock-in and built a platform-agnostic architecture with Windmill
										</h1>
										<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
											When Airplane.dev shut down, Panther Labs had 30 days to migrate their entire internal operations platform. They chose Windmill for its open-source foundation and platform-agnostic architecture, achieving true portability while maintaining production reliability for mission-critical cybersecurity operations.
										</p>
										<div className="flex items-center gap-4 flex-wrap">
											<span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
												Cybersecurity & Platform Operations
											</span>
											<div className="flex items-center gap-3">
												<img
													src="/contributors/bj_maldonado.jpeg"
													alt="BJ Maldonado"
													className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
												/>
												<div>
													<p className="text-sm font-medium text-gray-900 dark:text-white">
														BJ Maldonado
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														Platform Manager
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* Content sections */}
									<div className="space-y-12">
								<section>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
										Panther Labs is a modern cybersecurity SIEM (Security Information and Event Management) platform that helps security teams detect threats at scale. Their platform team manages all internal operations—from customer provisioning and AWS account management to infrastructure deployment and alerting systems. As a cybersecurity company handling sensitive data, they require self-hosted solutions on their own AWS infrastructure with full operational control.
									</p>
								</section>

								<section>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Problem</h2>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
										When Airplane.dev was acquired and announced it would shut down, Panther Labs had just 30 days to migrate their entire internal operations platform—or face operational paralysis. All their core processes would stop working: customer provisioning, AWS account management, deployment pipelines, and alerting.
									</p>
									<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
										<p className="text-gray-700 dark:text-gray-300 italic mb-2">
											"We were fully embedded into this platform. Everything was fine. We weren't looking to migrate. They got aqua-killed... we had to migrate to a new platform in 30 days."
										</p>
										<cite className="text-sm text-gray-500 dark:text-gray-400">
											— BJ Maldonado, Platform Manager
										</cite>
									</blockquote>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
										But this wasn't just about finding a replacement. Having been burned by vendor lock-in once, Panther was determined not to repeat the mistake. They needed a solution that would give them:
									</p>
									<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
										<li>Platform independence - Keep business logic separate from the execution platform</li>
										<li>Developer control - Everything-as-code with proper Git workflows</li>
										<li>Production reliability - For mission-critical internal operations</li>
										<li>True portability - Ability to migrate without rewriting everything</li>
									</ul>
									<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
										<p className="text-gray-700 dark:text-gray-300 italic mb-2">
											"We got bit once before... determined not to get bit again by the sun setting of a startup platform."
										</p>
										<cite className="text-sm text-gray-500 dark:text-gray-400">
											— BJ Maldonado
										</cite>
									</blockquote>
								</section>

								<section>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Solution</h2>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
										A senior engineer discovered Windmill through a Hacker News article about Airplane migrations. Panther chose it for four critical capabilities:
									</p>
									
									<div className="space-y-8">
										<div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
												Open Source Foundation
											</h3>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												Windmill's open source architecture (Apache 2.0 licensed on GitHub) meant Panther could never be locked in again. Even in the worst case, they could fork the codebase and maintain it themselves—something impossible with proprietary platforms like Airplane. The transparency of the codebase also gave them confidence in security and reliability for their cybersecurity operations.
											</p>
										</div>

										<div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
												Platform-Agnostic Architecture
											</h3>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												Instead of embedding business logic in the workflow platform, Panther built a separate Python library containing all their core logic. Windmill workflows simply orchestrate by calling functions from this library—acting as an execution layer, not a code repository.
											</p>
											<div className="rounded-lg p-4 my-4 overflow-x-auto">
												<pre className="text-sm text-gray-700 dark:text-gray-300">
													<code>{`# Business logic lives in a separate library

from panther_platform import customer_onboarding

def main(customer_email: str, aws_account_id: str):
    # Windmill just orchestrates
    result = customer_onboarding.provision_account(
        email=customer_email,
        account_id=aws_account_id
    )
    return result`}</code>
												</pre>
											</div>
											<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4">
												<p className="text-gray-700 dark:text-gray-300 italic text-sm">
													"Put the bulk of the business logic inside of a third-party library... just have the platform executors pulling down this library... gives us flexibility to just move our stuff around."
												</p>
												<cite className="text-sm text-gray-500 dark:text-gray-400">
													— BJ Maldonado
												</cite>
											</blockquote>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
												If they ever need to migrate from Windmill, their business logic stays intact—they only rewrite the thin orchestration layer, not their entire platform.
											</p>
										</div>

										<div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
												Developer-First Features
											</h3>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												Windmill's native support for importing any Python package from PyPI and private repositories made their architecture possible immediately. No limitations, no workarounds—full Python language features with proper dependency management and versioning. Everything-as-code with Git sync gave them proper version control and CI/CD workflows.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
												At the same time, Windmill's auto-generated UIs and App Builder meant non-technical team members could still use the platform through graphical interfaces—without requiring the platform team to build custom frontends.
											</p>
										</div>

										<div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
												Self-Hosted Deployment
											</h3>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												As a cybersecurity company, Panther needed to self-host on their own AWS infrastructure. Windmill's Enterprise Edition deployed cleanly into their existing environment with SSO integration. With direct support from Windmill's founder Ruben, they completed the migration within the 30-day deadline.
											</p>
										</div>
									</div>
								</section>

								<section>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Result</h2>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
										Today, 90% of Panther Labs' internal platform runs on Windmill, handling mission-critical operations across their organization:
									</p>
									<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mb-6">
										<li>Customer lifecycle management: Provisioning, onboarding, configuration, and offboarding workflows</li>
										<li>Infrastructure operations: Deployment pipelines, infrastructure management, and automated scaling</li>
										<li>Monitoring and alerting: 90% of all Slack alerts generated through Windmill workflows</li>
										<li>Self-service operations: Graphical apps for non-technical team members to manage complex configurations</li>
									</ul>
									<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
										<p className="text-gray-700 dark:text-gray-300 italic mb-2">
											"Windmill ranks among the most stable components of our infrastructure."
										</p>
										<cite className="text-sm text-gray-500 dark:text-gray-400">
											— BJ Maldonado, Platform Manager
										</cite>
									</blockquote>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
										Windmill has proven rock-solid for Panther's operations. Most importantly, Panther is no longer at risk from vendor decisions. Their business logic is portable, tested, and version-controlled. They've achieved true platform independence while maintaining the developer experience and reliability they need for mission-critical operations.
									</p>
									<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
										<p className="text-gray-700 dark:text-gray-300 italic mb-2">
											"This gives us flexibility to just move our stuff around... determined not to get bit again."
										</p>
										<cite className="text-sm text-gray-500 dark:text-gray-400">
											— BJ Maldonado
										</cite>
									</blockquote>
								</section>

								<section>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
										Panther Labs transformed a crisis into an opportunity by building a platform-agnostic architecture on Windmill. By keeping their business logic in a separate Python library and using Windmill as an orchestration layer, they've protected themselves from future vendor lock-in while gaining the production reliability and developer-first capabilities they need to run their internal operations. Today, with 90% of their platform running on Windmill, they've proven that the right architecture choices—combined with the right tooling—can turn a forced migration into a strategic advantage.
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
