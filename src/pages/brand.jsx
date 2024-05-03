import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingSection from '../landing/LandingSection';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import RadialBlur from '../landing/RadialBlur';
import { ArrowRight } from 'lucide-react';


export default function About() {
	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Brand | Windmill</title>
					<meta name="title" content="Windmill Brand." />
					<meta
						name="description"
						content="Find information on Windmill as well as brand assets and logos to download."
					/>
				</Head>
				<LandingHeader />
				<LandingSection bgClass="relative">
					<>
						<RadialBlur />
						<div className="space-y-12 text-center pt-32 pb-16">
							<div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
								<h1 className="!text-4xl font-bold tracking-tight sm:!text-5xl mb-8 text-blue-600">
									Brand
								</h1>
								<p className="text-lg">
                                    Find information on Windmill as well as brand assets and logos to download.
								</p>
							</div>
						</div>
					</>
				</LandingSection>
                <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                    <h2 className="leading-9 mb-6 text-3xl">
                        About Windmill
                    </h2>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-200 mt-12">
                        <div className="flex flex-col gap-4">
                            <p>
                                Windmill is an open-source platform to build internal tools from scripts and low code builders.
                            </p>
                            <p>
                                As a solution for building endpoints, workflows, and UIs, Windmill presents itself as an open-source alternative to
                                Retool, Superblocks, n8n, Prefect, Airflow, or Temporal.
                            </p>
                            <p>
                                Windmill was founded in 2022 and is based between San Francisco and Paris.
                            </p>
                        </div>
			        </p>
                </section>
                <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                    <h2 className="leading-9 mb-6 text-3xl">
                        License
                    </h2>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-200 mt-12">
                        <div className="flex flex-col gap-4">
                            <p>
                                Windmill is released under the AGPLv3 license. This means the software is free and open-source. If you make modifications and distribute them, you must also release those changes under the AGPLv3. Significantly, if you run a modified version of Windmill on a server and let others interact with it over a network, you are obligated to provide them a way to access the modified source code. This ensures the software remains transparent and free for all users, even when used in online applications.
                            </p>
                            <p>
                                For businesses or projects with specific requirements, a commercial license for Windmill is available under our <a href="/pricing" target="_blank"> Enterprise plan</a>.
                            </p>
                            <p>
                                At last, Windmill offers <a href="/docs/misc/white_labelling" target="_blank">white labeling capabilities</a>, allowing you to provide Windmill's services and customized the platform to align with your brand.
                            </p>
                        </div>
			        </p>
                    <div className="flex flex-row gap-2 mt-8">
                            <a
                                type="button"
                                tag="no_follow"
                                href="/pricing"
                                target="_blank"
                                className="flex items-center gap-2 rounded-md bg-[#4285F4] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Pricing
                                <ArrowRight className="" aria-hidden="true" />
                            </a>
                            <a
                                type="button"
                                href="/terms"
                                target="_blank"
                                className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            >
                                License Terms
                                <ArrowRight className="" aria-hidden="true" />
                            </a>
                        </div>
                    </section>
                    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                    <h2 className="leading-9 mb-6 text-3xl">
                        Brand Assets
                    </h2>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-200 mt-12">
                        <div className="flex flex-col gap-4">
                            <p>
                                Make sure to use the official Windmill brand assets for your publications.
                            </p>
                        </div>
			        </p>
                    <div className="flex flex-row gap-2 mt-8">
                            <a
                                type="button"
                                tag="no_follow"
                                href="https://drive.google.com/drive/folders/1Zqu-xhVlss1h03idNSWjBSGtJEKqrakc?usp=sharing"
                                target="_blank"
                                className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            >
                                Windmill Logos & Assets
                                <ArrowRight className="" aria-hidden="true" />
                            </a>
                        </div>
                    </section>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
