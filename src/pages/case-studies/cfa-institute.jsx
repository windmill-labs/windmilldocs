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

export default function CFAInstituteCaseStudyPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>How CFA Institute migrated from n8n and scaled production-critical monitoring with Windmill | Windmill Case Studies</title>
					<meta name="title" content="How CFA Institute migrated from n8n and scaled production-critical monitoring with Windmill" />
					<meta name="description" content="CFA Institute's SRE team needed to replace n8n with a platform robust enough for production-critical monitoring. After their SRE manager tested Windmill in his home lab for a year, they migrated in early 2025." />
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
												lightSrc="/images/brands/cfa-institute-light.png"
												darkSrc="/images/brands/cfa-institute-dark.png"
												alt="CFA Institute logo"
											/>
										</div>
										<div className="space-y-6">
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Industry
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													Financial Services
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Company Size
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													1000+
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													What they do
												</div>
												<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
													Global association of investment professionals that sets standards and provides education for the financial services industry, serving hundreds of thousands of investment professionals worldwide.
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Website
												</div>
												<a
													href="https://www.cfainstitute.org"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline"
												>
													cfainstitute.org
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
											How CFA Institute migrated from n8n and scaled production-critical monitoring with Windmill
										</h1>
										<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
											CFA Institute's SRE team needed to replace n8n with a platform robust enough for production-critical monitoring. After their SRE manager tested Windmill in his home lab for a year, they migrated in early 2025. Today, Windmill runs 25 synthetic tests every 5 minutes protecting revenue-generating processes, and usage has "exploded" across their IT organization.
										</p>
									</div>

									{/* Content sections */}
									<div className="space-y-12">
										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												CFA Institute is a global association of investment professionals that sets standards and provides education for the financial services industry, serving hundreds of thousands of investment professionals worldwide. Their SRE team needed to replace n8n and scattered AWS Lambda scripts with a platform robust enough to handle production-critical monitoring, complex integrations, and rapid deployment requirements—all while meeting enterprise compliance standards.
											</p>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Problem</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												CFA Institute's SRE team faced a common enterprise dilemma: they needed to automate frequent operational tasks, but their company's maintenance requirements made rapid deployment nearly impossible.
											</p>
											<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
												<p className="text-gray-700 dark:text-gray-300 italic mb-2">
													"Our company has some strict requirements around maintenance and deployment process to get those into production. So it was really difficult for us to get a script up and have it quickly deployed and easily maintained by the team."
												</p>
												<cite className="text-sm text-gray-500 dark:text-gray-400">
													— Cam Barts, SR Manager, SRE
												</cite>
											</blockquote>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												The team had been using a patchwork of solutions—ad hoc scripts deployed as AWS Lambdas or Azure functions, n8n for basic automation workflows, and manual processes that couldn't be quickly automated. While n8n worked for simple automations, the platform hit its limits as their needs grew more complex.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												The critical requirements they needed:
											</p>
											<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
												<li>Real Programming Capabilities - Complex business logic beyond visual workflows</li>
												<li>Production Reliability - Mission-critical monitoring that can't fail</li>
												<li>Rapid Deployment - Bypass enterprise change management for script iterations</li>
												<li>Team Collaboration - Proper version control and Git workflows</li>
												<li>Scale - Handle hundreds of executions per hour with complex orchestration</li>
											</ul>
											<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
												<p className="text-gray-700 dark:text-gray-300 italic mb-2">
													"We needed something that was going to be a lot more robust, something that we could actually write code inside of. Windmill was kind of a natural evolution from n8n."
												</p>
												<cite className="text-sm text-gray-500 dark:text-gray-400">
													— Cam Barts
												</cite>
											</blockquote>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Solution</h2>
											
											<div className="space-y-8">
												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Discovery through open source validation
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
														Cam Barts discovered Windmill through alternativeTo.net while searching for open-source alternatives. As a tech lead who regularly explores projects in his home lab, Cam deployed Windmill and tested it for approximately one year before introducing it to CFA Institute in February 2025.
													</p>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														This "try before you buy" approach was critical. Cam had already proven Windmill's capabilities in his own environment before advocating for enterprise adoption. His journey illustrates an important adoption pattern: personal exploration in a safe environment, proof of concept for team use cases, and organic advocacy that spreads through demonstrated value.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Real code with full language features
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Unlike n8n's visual workflows, Windmill enabled the team to write actual Python code with full language features and library support. This was essential for their most critical use case: synthetic monitoring of revenue-generating processes.
													</p>
													<div className="rounded-lg p-4 my-4 overflow-x-auto">
														<CodeBlock language="python">
															{`# Example CFA Institute synthetic monitoring script

def main(endpoint: str, expected_status: int = 200):
    # Real Python with full ChromeDriver integration
    from selenium import webdriver
    
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    
    try:
        driver.get(endpoint)
        # Complex validation logic here
        return {"status": "success", "timestamp": datetime.now()}
    finally:
        driver.quit()`}
														</CodeBlock>
													</div>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														Today, CFA Institute runs 25 concurrent synthetic tests every 5 minutes—300 executions per hour—using ChromeDriver-based browser automation. These aren't simple uptime checks; they're full user journey simulations that validate every step of their critical revenue processes.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Rapid deployment without change management
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
														Windmill scripts could be deployed immediately without going through CFA Institute's rigid change management process. With Git sync, proper version control, and workspace collaboration features, the entire SRE team could work together seamlessly.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"We were very quickly able to get our scripts out of n8n and transitioned over into Windmill pretty quickly. And then from there our use of Windmill has kind of exploded."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Cam Barts
														</cite>
													</blockquote>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Enterprise-wide integration platform
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Beyond synthetic monitoring, CFA Institute built sophisticated integrations that extended across their organization:
													</p>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														<strong>Microsoft Teams Bot</strong> - Built on Windmill's Teams integration, the bot became "the biggest hit with leadership." Available in every channel, it handles postmortem searches, release status queries, and Jira notifications. Development teams use it for release monitoring, DevOps teams track deployment pipelines, and production support searches historical postmortems—all through natural language queries in Teams.
													</p>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
														<strong>Grafana Data Layer</strong> - Windmill serves as a data processing layer between complex data sources and Grafana. Instead of connecting Grafana directly to sources with limitations (like Jira's 50-ticket pagination limit), Windmill scripts fetch data from multiple sources, perform transformations and merging, apply business logic, and expose clean results via API. Business stakeholders consume integrated data through Grafana dashboards without knowing Windmill powers them behind the scenes.
													</p>
												</div>
											</div>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Result</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												After seven months in production, Windmill usage has "exploded" across CFA Institute's IT organization. What started as a single SRE team pilot has grown into organization-wide demand, with multiple teams actively building and weekly requests for expansion.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												The platform has proven production-stable for their most critical workloads: 25 synthetic tests running every 5 minutes without failures, platform updates every 2 weeks with zero incidents, and mission-critical monitoring that directly protects revenue-generating processes.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												The transition from n8n required only brief training sessions before the entire team became productive and, ultimately, advocates. Business stakeholders and non-technical teams now have access to sophisticated automation through Grafana dashboards, Teams bot queries, and auto-generated UIs—all powered by real code underneath that developers can iterate on rapidly.
											</p>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												CFA Institute's journey from n8n to Windmill demonstrates how the right platform can transform isolated scripts into an enterprise-wide automation layer. By choosing a developer-first platform that supports real code, Git workflows, and production-grade reliability, they've built mission-critical infrastructure that protects revenue while enabling rapid iteration.
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
