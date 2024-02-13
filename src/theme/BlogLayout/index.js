import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import { twMerge } from 'tailwind-merge';

export default function BlogLayout(props) {
	const { sidebar, toc, children, location, ...layoutProps } = props;
	const hasSidebar = sidebar && sidebar.items.length > 0;
	const isBlogPostPageList = Boolean(toc);
	const isChangelog = location?.pathname?.includes('/changelog');

	return (
		<Layout {...layoutProps}>
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
			</div>
		</Layout>
	);
}
