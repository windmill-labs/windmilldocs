import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import { twMerge } from 'tailwind-merge';
import { useLocation } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import Footer from '../../landing/Footer';
import Roadmap from '../../components/roadmap';

export default function BlogLayout(props) {
	const { sidebar, toc, children, ...layoutProps } = props;
	const hasSidebar = sidebar && sidebar.items.length > 0;
	const isBlogPostPageList = Boolean(toc);
	const location = useLocation();

	const isChangelogHomepage = location?.pathname?.endsWith('/changelog');
	const isChangelog = location?.pathname?.includes('/changelog');
	const title = 'Changelog | Windmill';
	const description = 'See the latest changes to Windmill';
	const image = '../../img/changelog.png';

	return (
		<Layout {...layoutProps}>
			{isChangelogHomepage && (
				<Head>
					<title>{title}</title>
					<meta name="title" content={title} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={image} />
					<meta property="site_name" content="Windmill" />
					<meta property="og:type" content="changelog" />
				</Head>
			)}

			{!isBlogPostPageList && (
				<div className={twMerge('w-full mx-auto', isChangelog ? 'max-w-6xl' : 'max-w-7xl ')}>
					<div className="">
						<div className="relative pt-16 pb-8 overflow-hidden">
							<h1 className="tracking-tight container leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 dark:from-blue-300 dark:to-blue-500">
								{isChangelog ? 'Changelog' : 'Blog'}
							</h1>
							<p className="mt-4 text-lg leading-8 container">
								{isChangelog
									? "See what's new with Windmill."
									: 'Discover the latest news, updates, and articles from the team and community.'}
							</p>
							{isChangelog && (
								<div className="container mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
									<h3 className="text-lg font-semibold">
										Watch latest Windmill weekly keynotes
									</h3>
									<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
										<li>
											<a
												href="https://www.youtube.com/watch?v=3mNZ_rINuS0"
												target="_blank"
												rel="noopener noreferrer"
											>
												Feb 20, 2026
											</a>
										</li>
										<li>
											<a
												href="https://www.youtube.com/watch?v=QgGsxeH0CyU"
												target="_blank"
												rel="noopener noreferrer"
											>
												Feb 13, 2026
											</a>
										</li>
										<li>
											<a
												href="https://www.youtube.com/watch?v=2dGd9TdT8xs"
												target="_blank"
												rel="noopener noreferrer"
											>
												Feb 6, 2026
											</a>
										</li>
									</ul>
									<p className="mt-4 text-md leading-8 container">
										Weekly keynotes are hosted on{' '}
										<a
											href="https://discord.com/channels/930051556043276338/1278977038430240813"
											target="_blank"
											rel="noopener noreferrer"
										>
											Discord
										</a>{' '}
										and{' '}
										<a
											href="https://www.youtube.com/@WindmillDev"
											target="_blank"
											rel="noopener noreferrer"
										>
											Youtube
										</a>{' '}
										on Friday at 5:45 pm CET+1.
									</p>
									<h3 className="text-lg font-semibold mt-6 mb-4">
										See the Windmill roadmap and what's coming next
									</h3>
									<a 
										href="/roadmap" 
										className="inline-flex items-center px-3 py-1.5 bg-blue-100 hover:bg-blue-50 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 text-primary font-medium rounded-md transition duration-150 ease-in-out shadow-md hover:no-underline text-sm"
									>
										Roadmap
									</a>
								</div>
							)}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1024 1024"
								className="absolute -top-80 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2"
								aria-hidden="true"
							>
								<circle
									cx={512}
									cy={512}
									r={512}
									fill="url(#827591b1-ce8c-4110-b064-7cb85a0b121745)"
									fillOpacity="0.7"
								/>
								<defs>
									<radialGradient
										id="827591b1-ce8c-4110-b064-7cb85a0b121745"
										cx={0}
										cy={0}
										r={1}
										gradientUnits="userSpaceOnUse"
										gradientTransform="translate(512 512) rotate(90) scale(512)"
									>
										<stop stopColor="#3b82f6" />
										<stop offset={1} stopColor="#3b82f6" stopOpacity={0} />
									</radialGradient>
								</defs>
							</svg>
						</div>
					</div>
				</div>
			)}
			<div
				className={twMerge(
					' w-full mx-auto margin-vert--lg bg-transparent',
					isChangelog ? 'max-w-6xl  px-4' : 'max-w-7xl container'
				)}
			>
				<div className="row">
					<BlogSidebar sidebar={sidebar} />
					{toc && <div className="col col--2"></div>}
					<main
						className={clsx(
							'col',
							{
								'col--7': hasSidebar,
								'w-full mx-auto': !hasSidebar && !isBlogPostPageList,
								'max-w-3xl mx-auto': !hasSidebar && isBlogPostPageList
							},
							isChangelog ? 'mt-0' : 'mt-12'
						)}
						itemScope
						itemType="http://schema.org/Blog"
					>
						{children}
					</main>
					{toc && <div className="col col--2">{toc}</div>}
				</div>
				<div className="mt-4 text-lg leading-8 container">
					<a
						href={isChangelog ? '/changelog/archive' : '/blog/archive'}
						target="_blank"
						className="text-sm"
					>
						{isChangelog ? 'Changelog archive' : 'Blog archive'}
					</a>
				</div>
			</div>

			<Footer />
		</Layout>
	);
}
