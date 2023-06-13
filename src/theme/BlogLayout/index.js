import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import SectionBlur from '../../landing/SectionBlur';
//import Footer from './../../landing/Footer';

export default function BlogLayout(props) {
	const { sidebar, toc, children, ...layoutProps } = props;
	const hasSidebar = sidebar && sidebar.items.length > 0;

	const isBlogPostPageList = Boolean(toc);

	return (
		<Layout {...layoutProps}>
			{!isBlogPostPageList && (
				<div className="w-full">
					<div className="">
						<div className="relative pt-16 pb-8">
							<h1 className="tracking-tight container leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900">
								Blog
							</h1>
							<p className="mt-4 text-lg leading-8 text-gray-600 container">
								Discover the latest news, updates, and articles from the team and community
							</p>
							<SectionBlur />
						</div>
					</div>
				</div>
			)}
			<div className="container margin-vert--lg bg-transparent">
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
