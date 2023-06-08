import React from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';

export default function BlogPostItemContainer({ children, className }) {
	const { frontMatter, assets, isBlogPostPage, metadata } = useBlogPost();
	const { withBaseUrl } = useBaseUrlUtils();
	const image = assets.image ?? frontMatter.image;

	return (
		<article
			className={clsx(className, {
				'border p-2 rounded-2xl shadow-md hover:border-blue-200  transition-all !mb-4':
					!isBlogPostPage
			})}
			itemProp="blogPost"
			itemScope
			itemType="http://schema.org/BlogPosting"
		>
			{image && <meta itemProp="image" content={(withBaseUrl(image), { absolute: true })} />}
			{!isBlogPostPage ? (
				<Link itemProp="url" to={metadata.permalink} className="!no-underline ">
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

						<h2 className="text-lg leading-6 font-semibold mt-4 mb-2 text-gray-900 ">
							{metadata.title}
						</h2>

						<p className="text-gray-600 text-sm h-max">
							{metadata.description ?? frontMatter.description}
						</p>
					</div>
					<div className="flex flex-row gap-2 text-blue-500 font-semibold items-center p-4">
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
