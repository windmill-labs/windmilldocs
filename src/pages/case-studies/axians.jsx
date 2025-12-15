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
import { axiansCaseStudy } from '../../data/case-studies/axians';

export default function AxiansCaseStudyPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>How Axians scales multi-tenant automation from 14 active customers to 150 with Windmill | Windmill Case Studies</title>
					<meta name="title" content="How Axians scales multi-tenant automation from 14 active customers to 150 with Windmill" />
					<meta name="description" content="Axians is a 500-person managed service provider managing network infrastructure for 150 enterprise customers across Europe. They needed scalable automation infrastructure to gradually onboard customers to self-service automation." />
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
												lightSrc="/images/brands/axians-light.png"
												darkSrc="/images/brands/axians-dark.png"
												alt="Axians logo"
											/>
										</div>
										<div className="space-y-6">
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Industry
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													Managed Service Provider
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Company Size
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													500
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													What they do
												</div>
												<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
													Managed service provider in Rotterdam, Netherlands, managing network infrastructure for government agencies, hospitals, schools, and corporations across Europe.
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													What they do on Windmill
												</div>
												<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
													<div className="flex flex-wrap gap-2">
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Network automation</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Self-healing automation</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Network deployments</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Invoice workflows</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Multi-tenant automation</span>
														<span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Equipment updates</span>
													</div>
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Deployment
												</div>
												<div className="text-sm text-gray-900 dark:text-white">
													<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
														{axiansCaseStudy.selfHosted ? 'EE Self-hosted' : 'EE Cloud'}
													</span>
												</div>
											</div>
											<div>
												<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
													Website
												</div>
												<a
													href="https://www.axians.com"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline"
												>
													axians.com
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
											How Axians scales multi-tenant automation from 14 active customers to 150 with Windmill
										</h1>
										<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
											Axians is a 500-person managed service provider managing network infrastructure for 150 enterprise customers across Europe. They needed scalable automation infrastructure to gradually onboard these customers to self-service automation. Today, 14 customers actively use Windmill for network automation, with the remaining customers in the onboarding pipeline.
										</p>
									</div>

									{/* Content sections */}
									<div className="space-y-12">
										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												Axians is a 500-person managed service provider in Rotterdam, Netherlands, managing network infrastructure for 150 enterprise customers across Europe including government agencies, hospitals, schools, and corporations. They needed scalable automation infrastructure to gradually onboard these customers to self-service automation. Today, 14 customers actively use Windmill for network automation, with the remaining customers in the onboarding pipeline. The challenge was finding a platform with the right architecture and economics to support this scaling journey.
											</p>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The problem</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												Ben Willems, Product Owner of Axians' Automation Team, faced a scaling challenge: how to provide automation capabilities to 150 enterprise customers without massive upfront costs.
											</p>
											<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
												<p className="text-gray-700 dark:text-gray-300 italic mb-2">
													"We manage Wi-Fi and LAN networks for our customers like the government, schools, hospitals, large corporations. They say here is my entire network, just fix it for me. Instead of spending €100 an hour for an engineer to do something which can easily be automated, we want to enable our engineers to build scripts for themselves in a managed, secure, and compliant environment."
												</p>
												<cite className="text-sm text-gray-500 dark:text-gray-400">
													— Ben Willems, Product Owner, Automation Team
												</cite>
											</blockquote>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
												The mission: become a data-driven managed service provider by gathering information, transforming it into insights, and automating actions at scale. But the path to scale was the problem—customers would onboard gradually, not all at once. The infrastructure needed to support this growth pattern:
											</p>
											<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
												<li>Multi-tenant architecture - Separate isolated environments for each customer</li>
												<li>Gradual scaling - Start with early adopters, expand as adoption spreads</li>
												<li>Usage-based economics - Pay for what you use, not fixed enterprise licensing</li>
												<li>Compliance-ready - ISO and IC certifications require auditing and logging</li>
											</ul>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 mt-4">
												Axians evaluated over 10 platforms including Kestra, Ansible Automation Platform, and N8N. Ansible Automation Platform was technically solid but economically impossible for gradual scaling: "We would have to pay over a million euros a year to use it and our business case could not cover that."
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												Fixed enterprise licensing meant paying for 150 customers upfront, even if only 14 were actively using it. That economics didn't work.
											</p>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The solution</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												Windmill scored 8.9 out of 10 in proof of concept testing. The decision came down to architecture that enables gradual scaling.
											</p>
											
											<div className="space-y-8">
												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Multi-tenant architecture that scales with adoption
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Windmill's workspace model solved Axians' core challenge: start with early adopters and scale as customers onboard, without massive upfront costs.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"You have a separate environment just for one customer and you can build all your applications, all your flows in that. We use Windmill Hub Private to share scripts between customers when appropriate."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Ben Willems
														</cite>
													</blockquote>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														Ben's platform team manages Windmill hosted in Azure. Customer teams—network engineers managing specific client accounts—build and maintain their own automations within their workspaces. The platform team provides infrastructure; the customer teams own their automation scripts.
													</p>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														This model scales efficiently. Axians doesn't need to hire developers to build automation for every customer. Early adopters build scripts, other teams adopt them, and the automation library grows organically.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Economics that support gradual growth
													</h3>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"The fact that you also pay really on the value you get is attractive to our needs."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Ben Willems
														</cite>
													</blockquote>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Windmill's usage-based pricing meant Axians could start with 14 active customers and add more as they onboard—paying proportionally rather than facing fixed licensing costs for 150 customers upfront. This changes the economics of providing automation-as-a-service.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"Usually it's the concept of a developer has to build the script and nobody wants to pay the hours. They just want to use the script."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Ben Willems
														</cite>
													</blockquote>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														Once early adopters create value, others follow. Windmill's pricing supports this adoption pattern.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Compliance that drives centralization
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Axians' ISO and IC certifications require strict auditing. This compliance requirement actually accelerates adoption.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"We don't want anyone to run scripts on their own laptop anymore. We want to have in a central orchestration platform which is Windmill. Everything that you do in Windmill is audited, is registered, and logged."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Ben Willems
														</cite>
													</blockquote>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														As more customers onboard, they inherit the compliance foundation from day one.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Real-world transformation
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														A network engineer managing infrastructure for a major energy supplier needed internet connectivity at 180 substation locations. Previously, each deployment took 4 hours. The engineer taught himself to code and built an Ansible script in Windmill. Deployment now takes 5-10 minutes per location.
													</p>
													<div className="rounded-lg p-4 my-4 overflow-x-auto">
														<CodeBlock language="python">
															{`# Example: Self-healing network automation

def remediate_network_issue(device_id: str, issue_type: str):
    status = check_device_health(device_id)
    
    if issue_type == "access_point_down":
        restart_device(device_id)
        log_to_servicenow(device_id, "auto_restart_completed")
    elif issue_type == "outdated_firmware":
        schedule_update(device_id)
        notify_team(device_id, "update_scheduled")
    
    return {"device": device_id, "action": "remediated", "logged": True}`}
														</CodeBlock>
													</div>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														Scripts like this get built by early adopter customers, then shared and adopted by customers onboarding later. The platform's value compounds as adoption grows.
													</p>
												</div>
											</div>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The result</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												Axians started with early adopters and is now scaling across their customer base. Fourteen customers actively automate with Windmill, with the remaining customers onboarding as adoption spreads.
											</p>
											<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
												<p className="text-gray-700 dark:text-gray-300 italic mb-2">
													"You see the adoption is increasing now. Instead of last year where primarily technical people were using it, now you see a lot more business people also pushing for a script or an automation."
												</p>
												<cite className="text-sm text-gray-500 dark:text-gray-400">
													— Ben Willems
												</cite>
											</blockquote>
											
											<div className="space-y-6">
												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Transformational efficiency at the active customers
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
														For the 14 customers actively using the platform, the results are dramatic. Network deployments that took 4 hours now complete in 5-10 minutes. Self-healing automation restarts failed access points automatically. Network equipment updates happen on schedule. Invoice workflows run end-to-end from quote to payment.
													</p>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Economics that enable the scaling journey
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														Axians avoided the €1 million+ annual cost of enterprise platforms by choosing usage-based pricing. As they scale from 14 to 150 customers, costs grow proportionally rather than in large licensing steps. This makes the business case work.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"We've asked to add Ansible to the platform and within like two weeks you guys built it. Heads off for the speed on that."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Ben Willems
														</cite>
													</blockquote>
												</div>

												<div>
													<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
														Organic growth through network effects
													</h3>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
														The platform enables network engineers to solve their own problems. Once early adopters build scripts, other teams adopt them. The automation library grows as more customers onboard.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"Usually it's the concept of a developer has to build the script and nobody wants to pay the hours. They just want to use the script."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Ben Willems
														</cite>
													</blockquote>
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
														With everything centralized, Axians passes ISO and IC audits without manual documentation. Every automation is logged, every execution traced. As the remaining customers onboard, they inherit this compliance foundation.
													</p>
													<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6">
														<p className="text-gray-700 dark:text-gray-300 italic mb-2">
															"As far as we can see, an ideal platform for use cases like this."
														</p>
														<cite className="text-sm text-gray-500 dark:text-gray-400">
															— Ben Willems
														</cite>
													</blockquote>
												</div>
											</div>
										</section>

										<section>
											<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
												Axians demonstrates how managed service providers can scale automation-as-a-service using Windmill's architecture. Starting with 14 active customers and growing toward 150, they needed infrastructure that could scale gradually without massive upfront costs.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
												Windmill's workspace isolation provides multi-tenancy, usage-based pricing enables proportional growth, and audit logs ensure compliance. For MSPs scaling automation across dozens or hundreds of customers, this architecture makes the economics work. After evaluating 10+ platforms, Windmill scored 8.9 out of 10—nearly double the next competitor.
											</p>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
												The lesson for MSPs: choose platforms that support your growth trajectory, not just your current state.
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
