import React from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { Archive, Blocks, Sparkles } from 'lucide-react';
import Head from '@docusaurus/Head';

export default function BlogPostItemContainer({ children, className }) {
	const { frontMatter, assets, isBlogPostPage, metadata } = useBlogPost();
	const { withBaseUrl } = useBaseUrlUtils();
	const image = assets.image ?? frontMatter.image;

	const isChangelog = window.location.pathname.includes('/changelog');

	if (isChangelog) {
		return (
			<div className="w-full">
				<Head>
					<title>{metadata.title}</title>
					<meta name="title" content={metadata.title} />
					<meta property="og:title" content={metadata.title} />
					<meta property="og:description" content={metadata.description} />
					<meta property="og:image" content={metadata.image} />
					<meta property="site_name" content="Windmill" />
					<meta property="og:type" content="changelog" />
					<meta property="og:url" content={window.location.href} />
				</Head>
				<div className="flex flex-row gap-2 items-center mb-4">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white ">{metadata.title}</h3>
					{metadata?.tags.map((tag) => (
						<span
							key={tag}
							className={
								'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ' +
								(tag.label === 'App'
									? 'bg-orange-100 text-orange-800'
									: tag.label === 'Flow'
									? 'bg-emerald-100 text-emerald-800'
									: 'bg-blue-100 text-blue-800')
							}
						>
							{tag.label}
						</span>
					))}
				</div>

				<div className="mb-6">
					<p className="text-base dark:text-gray-300 text-gray-600">
						{new Date(metadata.date).toLocaleDateString()}
					</p>
				</div>
				<img
					className="rounded-lg shadow-lg border h-96 w-full object-cover my-8"
					src={image}
					alt=""
				/>
				<p className="text-base dark:text-gray-200 text-gray-600">{metadata.description}</p>

				{frontMatter?.improvements?.length > 0 && (
					<div className="mt-6">
						<h4 className="text-lg font-medium text-gray-900 dark:text-white flex flex-row gap-1 items-center">
							<Sparkles className="inline-block w-6 h-6 mr-2" />
							Improvements
						</h4>
						<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8 flex flex-col gap-2">
							{frontMatter?.improvements.map((improvement, idx) => (
								<li key={idx} className="list-disc">
									{improvement}
								</li>
							))}
						</ul>
					</div>
				)}
				{frontMatter?.features?.length > 0 && (
					<div className="mt-6">
						<h4 className="text-lg font-medium text-gray-900 dark:text-white flex flex-row gap-1 items-center">
							<Blocks className="inline-block w-6 h-6 mr-2" />
							New Features
						</h4>
						<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8 flex flex-col gap-2">
							{frontMatter?.features.map((newFeature, idx) => (
								<li key={idx} className="list-disc">
									{newFeature}
								</li>
							))}
						</ul>
					</div>
				)}
				{frontMatter?.deprecations?.length > 0 && (
					<div className="mt-6">
						<h4 className="text-lg font-medium text-gray-900 dark:text-white flex flex-row gap-1 items-center">
							<Archive className="inline-block w-6 h-6 mr-2" />
							Deprecations
						</h4>
						<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8 flex flex-col gap-2">
							{frontMatter?.deprecations.map((deprecation, idx) => (
								<li key={idx} className="list-disc">
									{deprecation}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	}
	return (
		<article
			className={clsx(className, {
				'border p-2 rounded-2xl shadow-md hover:border-blue-400 hover:shadow-lg transition-all !mb-4 dark:border-gray-700 dark:hover:border-blue-400':
					!isBlogPostPage
			})}
			itemProp="blogPost"
			itemScope
			itemType="http://schema.org/BlogPosting"
		>
			{image && <meta itemProp="image" content={(withBaseUrl(image), { absolute: true })} />}
			{!isBlogPostPage ? (
				<Link itemProp="url" to={metadata.permalink} className="!no-underline">
					<img src={image} className="h-64 w-full rounded-2xl object-cover" />

					<div className="p-4 flex flex-col h-64 overflow-auto">
						<div className="text-xs font-semibold flex justify-between items-center">
							<div class="flex flex-col">
								{metadata.authors.map((author, index) => (
									<span>
										{index === 0 ? 'by ' : 'and '}
										{author.name}
									</span>
								))}
							</div>

							<span>{Math.ceil(metadata.readingTime)} min read</span>
						</div>

						<h2 className="text-lg leading-6 font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
							{metadata.title}
						</h2>

						<p className="text-gray-600 text-sm h-max dark:text-gray-400">
							{metadata.description ?? frontMatter.description}
						</p>
					</div>
					<div className="flex flex-row gap-2 text-blue-400 font-semibold items-center p-4">
						Read more
						<ArrowRight size={16} className="opacity-50" />
					</div>
				</Link>
			) : (
				children
			)}
		</article>
	);
}
