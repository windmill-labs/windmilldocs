import React from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { ArrowRight, FileText } from 'lucide-react';
import { Archive, Blocks, Sparkles } from 'lucide-react';
import Head from '@docusaurus/Head';
import { twMerge } from 'tailwind-merge';
import { useLocation } from '@docusaurus/router';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';

export default function BlogPostItemContainer({ children, className }) {
	const { frontMatter, assets, isBlogPostPage, metadata } = useBlogPost();
	const { withBaseUrl } = useBaseUrlUtils();
	const location = useLocation();

	const image = assets.image ?? frontMatter.image;
	const video = assets.video ?? frontMatter.video;

	const isChangelog = location.pathname.includes('/changelog');

	const defaultTitle = 'Changelog | Windmill';
	const defaultDescription = "See what's new with Windmill.";

	const isFeaturePage = !location.pathname.endsWith('/changelog');

	const pageTitle = isFeaturePage ? metadata.title : defaultTitle;
	const pageDescription = isFeaturePage ? metadata.description : defaultDescription;

	const isChangelogDetail = location.pathname.includes(metadata.permalink);

	if (isChangelog) {
		return (
			<>
				{isChangelogDetail && (
					<>
						<Head>
							<title>{metadata.title}</title>
							<title>{pageTitle}</title>
							<meta name="title" content={metadata.title} />
							<meta property="og:title" content={metadata.title} />
							<meta property="og:description" content={pageDescription} />
							<meta property="og:image" content={image ?? '../../img/changelog.png'} />
							<meta property="site_name" content="Windmill" />
							<meta property="og:type" content="changelog" />
						</Head>
					</>
				)}
				<div className="w-full">
					<div className="flex flex-row gap-2 items-center mb-4">
						<h3 className="text-xl font-semibold">
							<a
								href={`/changelog/${frontMatter.slug}`}
								className="text-gray-900 dark:text-white hover:text-blue-600"
							>
								{metadata.title}
							</a>
						</h3>
						{metadata?.tags.map((tag, index) => (
							<span
								key={tag + index}
								className={
									'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ' +
									(tag.label === 'App Editor'
										? 'bg-orange-100 text-orange-800'
										: tag.label === 'Flow Editor'
										? 'bg-emerald-100 text-emerald-800'
										: tag.label === 'Enterprise & Cloud'
										? 'bg-gray-50 text-blue-900'
										: 'bg-blue-100 text-blue-800')
								}
							>
								{tag.label === 'Enterprise & Cloud' ? (
									<a href="/pricing" className="text-blue-900 hover:text-blue-700">
										{tag.label}
									</a>
								) : (
									tag.label
								)}
							</span>
						))}
						<a
							href={`https://github.com/windmill-labs/windmill/releases/tag/${frontMatter.version}`}
							target="_blank"
						>
							<span
								className={twMerge(
									'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium',
									'bg-gray-100 hover:bg-gray-200 text-gray-800'
								)}
							>
								{frontMatter.version}
							</span>
						</a>
					</div>

					<div className="mb-6">
						<div className="flex items-center">
							<p className="text-base dark:text-gray-300 text-gray-600 mr-3">
								{new Date(metadata.date).toLocaleDateString()} |{' '}
							</p>
							{frontMatter.docs && (
								<a
									href={frontMatter.docs}
									className="hover:bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:hover:bg-slate-800 px-2.5 py-1 rounded-xl text-xs text-gray-600 dark:text-gray-200 inline-flex items-center"
								>
									<FileText
										className="mr-2"
										aria-hidden="true"
										style={{ width: '14px', height: '14px' }}
									/>
									<span className="align-middle">Docs</span>
								</a>
							)}
						</div>
					</div>

					{image ? (
						<img
							className="rounded-lg shadow-lg border h-96 w-full object-cover my-8"
							src={image}
							alt=""
						/>
					) : video ? (
						<video
							src={video}
							className="rounded-lg shadow-lg border h-96 w-full object-cover my-8"
							autoPlay
							muted
							loop
							disableRemotePlayback
						/>
					) : (
						''
					)}
					<ReactMarkdown
						className="text-base dark:text-gray-200 text-gray-600"
						rehypePlugins={[rehypeRaw]}
						>
						{metadata.description}
					</ReactMarkdown>

					{frontMatter?.improvements?.length > 0 && (
						<div className="mt-6">
							<h4 className="text-lg font-medium text-gray-900 dark:text-white flex flex-row gap-1 items-center">
								<Sparkles className="inline-block w-6 h-6 mr-2" />
								Improvements
							</h4>
							<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8 flex flex-col gap-2">
								{frontMatter?.improvements.map((improvement, idx) => (
									<li key={idx + 'improvements'} className="list-disc">
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
									<li key={idx + 'features'} className="list-disc">
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
									<li key={idx + 'deprecations'} className="list-disc">
										{deprecation}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</>
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
							<div className="flex flex-col">
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
