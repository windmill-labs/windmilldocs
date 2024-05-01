import React from 'react';
import LandingSection from '../landing/LandingSection';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import { ArrowRight } from 'lucide-react';
import LayoutProvider from '@theme/Layout/Provider';
import { Helmet } from 'react-helmet-async';
import { useColorMode } from '@docusaurus/theme-common';
import Head from '@docusaurus/Head';


const InteractiveImage = ({ id, src, style, url }) => {
	const { colorMode } = useColorMode();
	const darkSrc = src.replace(/\.(png|jpg|jpeg|svg)$/, '_dark.$1');

	const handleImageError = (e) => {
		e.target.src = src;
	};

	const imageSrc = colorMode === 'dark' ? darkSrc : src;

	return (
		<img
			key={id}
			src={imageSrc}
			style={{ ...style, position: 'absolute' }}
			className={`interactive-image ${src.endsWith('.svg') ? 'svg-image' : ''}`}
			onClick={() => window.open(url, '_blank')}
			alt={id}
			onError={handleImageError}
		/>
	);
};


const interactiveImages = [
	{
	  id: 'Flows',
	  src: '/integrations/visual_elements/flow.png',
	  url: '/docs/flows/flow_editor',
	  style: { top: '124px', left: '67px', width: '234px', height: '292px' }
	},
	{
	  id: 'Apps',
	  src: '/integrations/visual_elements/app.png',
	  url: '/docs/apps/app_editor',
	  style: { top: '67px', left: '246px', width: '393px', height: '180px' }
	},
	{
	  id: 'Runs',
	  src: '/integrations/visual_elements/runs.png',
	  url: '/docs/core_concepts/monitor_past_and_future_runs',
	  style: { top: '362px', left: '293px', width: '260px', height: '160px' }
	},
	{
	  id: 'Schedules',
	  src: '/integrations/visual_elements/schedule.png',
	  url: '/docs/core_concepts/scheduling',
	  style: { top: '224px', left: '314px', width: '160px', height: '92px' }
	},
	{
	  id: 'Webhooks',
	  src: '/integrations/visual_elements/webhook.png',
	  url: '/docs/core_concepts/webhooks',
	  style: { top: '284px', left: '426px', width: '176px', height: '73px' }
	},
	{
		id: 'GitHub',
		src: '/third_party_logos/github.svg',
		url: '/docs/advanced/git_sync',
		style: { top: '455px', left: '95px', width: '42px', height: '42px' }
	},
	{
		id: 'GitLab',
		src: '/third_party_logos/gitlab.svg',
		url: '/docs/advanced/git_sync',
		style: { top: '447px', left: '148px', width: '65px', height: '65px' }
	},
	{
		id: 'VSCode',
		src: '/third_party_logos/vscode.svg',
		url: '/docs/cli_local_dev/vscode-extension',
		style: { top: '455px', left: '220px', width: '42px', height: '42px' }
	}
  ];  


export default function Solution({
	data,
	name,
	color,
	extraBlock,
	website,
	docs
}: {
	data: any;
	name: string;
	color: string;
	extraBlock?: React.ReactNode;
	website: string;
	docs: string;
}) {
	return (
		<LayoutProvider>
			<main>
				<Helmet>
					<title>APIs, workflows and UIs with {name} | Windmill</title>
					<meta name="description" content={data.subtitle} />
				</Helmet>
				<LandingHeader />

				<LandingSection bgClass="relative">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="py-12 md:py-20">
						<div className=" pb-12 md:pb-20">
						<div className="flex items-center mt-2" style={{ alignItems: 'flex-start' }}>
						<div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded p-2">
								<a href={website} target="_blank" rel="noopener noreferrer">
									<img src={data.logo} alt={data.title} style={{ height: '50px', width: 'auto' }}/>
								</a>
								<span className="mx-2"> </span>
								<a href="/" target="_blank" rel="noopener noreferrer">
									<img src='/img/logo.svg' alt="Windmill" style={{ height: '50px', width: 'auto' }} />
								</a>
							</div>
							</div>
							<h1 className="leading-10 mb-2 !text-4xl text-gray-900 dark:text-white mt-3" style={{ color: color }}>
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
											href={`${
												typeof docs !== 'undefined' ? `/docs/integrations/${docs.toLowerCase()}` : `/docs/integrations/${name.toLowerCase()}`
											}`}
											target="_blank"
											className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-gray-900 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
										>
											Documentation
											<ArrowRight className="" aria-hidden="true" />
										</a>
									</div>
								</div>
								<div className="w-full">
						<div className="interactive-image-container" style={{ position: 'relative', width: '663px', height: '551px' }}>
							{interactiveImages.map(image => (
							<InteractiveImage 
								key={image.id} 
								id={image.id} 
								src={image.src} 
								style={image.style} 
								url={image.url} 
							/>
							))}
						</div>
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
													className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400"
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
														className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400"
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
						<div className="flex flex-row gap-2">
							<a
								type="button"
								tag="no_follow"
								href="https://app.windmill.dev/user/login"
								target="_blank"
								className="flex items-center gap-2 rounded-md bg-[#4285F4] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Build your own scripts for {name}
								<ArrowRight className="" aria-hidden="true" />
							</a>
						</div>
					</div>
				</LandingSection>
				<Footer />
				<Head>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
			</main>
		</LayoutProvider>
	);
}
