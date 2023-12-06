import React from 'react';
import LandingSection from '../landing/LandingSection';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import { ArrowRight } from 'lucide-react';
import LayoutProvider from '@theme/Layout/Provider';
import { Helmet } from 'react-helmet-async';
import { useColorMode } from '@docusaurus/theme-common';
import SolutionSVG from './SolutionSVG.svg';

function Screenshot({ darkScreenshot, lightScreenshot }) {
	const { colorMode } = useColorMode();
	const screenshot = colorMode === 'dark' ? darkScreenshot : lightScreenshot;

	return <img src={screenshot} className="w-full rounded-lg" />;
}

export default function Solution({
	data,
	name,
	color,
	extraBlock
}: {
	data: any;
	name: string;
	color: string;
	extraBlock?: React.ReactNode;
}) {
	return (
		<LayoutProvider>
			<main>
				<Helmet>
					<title>{name} | Windmill</title>
					<meta name={data.title} content={data.subtitle} />
					<meta name={data.title} content={data.subtitle} />
				</Helmet>
				<LandingHeader />

				<LandingSection bgClass="relative">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="py-12 md:py-20">
							<div className=" pb-12 md:pb-20">
								<h1
									className="leading-10 mb-2 !text-4xl text-gray-900 dark:text-white"
									style={{
										color: color
									}}
								>
									{data.title}
								</h1>
								<p className="text-md text-gray-600 dark:text-gray-400">{data.subtitle}</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<div className="flex items-start flex-col justify-center gap-6">
									<div className="text-lg font-normal text-gray-800 dark:text-gray-200">
										{data.description}
									</div>
									<div className="flex flex-row gap-2">
										<a
											type="button"
											tag="no_follow"
											href="https://app.windmill.dev/user/login"
											target="_blank"
											className="flex items-center gap-2 rounded-md bg-[#4285F4] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Start building with {name}
											<ArrowRight className="" aria-hidden="true" />
										</a>
										<a
											type="button"
											href={`/docs/integrations/${name.toLowerCase()}`}
											target="_blank"
											className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
										>
											Documentation
											<ArrowRight className="" aria-hidden="true" />
										</a>
									</div>
								</div>
								<div className="w-full">
									<Screenshot
										lightScreenshot={data.lightScreenshot}
										darkScreenshot={data.darkScreenshot}
									/>
								</div>
							</div>
						</div>

						<div className="py-12 md:py-20">
							<h2 className="leading-8 mb-8">
								<p>
									Scripts for
									<span style={{ color }}> {name}</span>
								</p>
								<p className="text-sm font-normal text-gray-500 dark:text-gray-400">
									{data.integrations_sub_title}
								</p>
							</h2>
							<div className="mx-auto w-full">
								<dl className="grid grid-cols-1 lg:grid-cols-3 border border-gray-50 dark:border-gray-900">
									{data.hubIntegrations.map((integration) => (
										<div
											key={integration.title}
											className="flex flex-col border p-8 hover:bg-gray-50 border-gray-50 dark:border-gray-900 dark:hover:bg-gray-800"
										>
											<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
												<integration.icon
													className="h-5 w-5 flex-none text-blue-600"
													aria-hidden="true"
												/>
												{integration.title}
											</dt>
											<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-200">
												<p className="flex-auto">{integration.description}</p>
												<p className="mt-6">
													<a
														href={integration.link}
														target="_blank"
														className="text-base font-semibold leading-7 text-blue-600"
													>
														View on the Hub <span aria-hidden="true">→</span>
													</a>
												</p>
											</dd>
										</div>
									))}
								</dl>
							</div>

							{extraBlock}
						</div>
					</div>
				</LandingSection>
				<div className="svg-container">
                	<SolutionSVG className="scaled-svg" style={{ width: '60%', height: '60%' }} />
            	</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
