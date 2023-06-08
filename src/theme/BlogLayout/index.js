import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
//import Footer from './../../landing/Footer';

export default function BlogLayout(props) {
	const { sidebar, toc, children, ...layoutProps } = props;
	const hasSidebar = sidebar && sidebar.items.length > 0;

	const isBlogPostPageList = Boolean(toc);

	return (
		<Layout {...layoutProps}>
			{!isBlogPostPageList && (
				<div className="bg-white w-full">
					<div className="">
						<div className="relative isolate overflow-hidden bg-gray-900 p-16 shadow-2xl sm:px-16">
							<h1 className="tracking-tight container leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-200 to-blue-500">
								Blog
							</h1>
							<p className="mt-4 text-lg leading-8 text-gray-300 container">
								Discover the latest news, updates, and articles from the team and community
							</p>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1024 1024"
								className="absolute top-0 right-0 -z-10 h-[64rem] w-[64rem] "
								aria-hidden="true"
							>
								<circle
									cx={512}
									cy={512}
									r={512}
									fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
									fillOpacity="0.7"
								/>
								<defs>
									<radialGradient
										id="827591b1-ce8c-4110-b064-7cb85a0b1217"
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
			<div className="container margin-vert--lg">
				<div className="row">
					<BlogSidebar sidebar={sidebar} />
					<main
						className={clsx('col', {
							'col--7': hasSidebar,
							'w-full mx-auto': !hasSidebar && !isBlogPostPageList,
							'max-w-4xl mx-auto': !hasSidebar && isBlogPostPageList
						})}
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
