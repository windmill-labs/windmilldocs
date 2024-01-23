import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';

function BlogListPageMetadata(props) {
	const { metadata } = props;
	const {
		siteConfig: { title: siteTitle }
	} = useDocusaurusContext();
	const { blogDescription, blogTitle, permalink } = metadata;
	const isBlogOnlyMode = permalink === '/';
	const title = isBlogOnlyMode ? siteTitle : blogTitle;
	return (
		<>
			<PageMetadata title={title} description={blogDescription} />
			<SearchMetadata tag="blog_posts_list" />
		</>
	);
}

function Sidebar({ items }) {
	const [groupType, setGroupType] = React.useState('version');

	// group items by version
	const groupedItems =
		groupType === 'version'
			? items.reduce((acc, item) => {
					const version = item.content.frontMatter.version;
					if (!acc[version]) {
						acc[version] = [];
					}
					acc[version].push(item);
					return acc;
			  }, {})
			: items.reduce((acc, item) => {
					const date = new Date(item.content.metadata.date);
					const month = date.toLocaleString('default', { month: 'long' });
					const year = date.getFullYear();
					const dateStr = `${month} ${year}`;
					if (!acc[dateStr]) {
						acc[dateStr] = [];
					}
					acc[dateStr].push(item);
					return acc;
			  }, {});

	return (
		<div className="flex flex-col gap-4 w-96">
			<div className="flex flex-row gap-2">
				<button
					className={clsx(
						'px-2 py-1 rounded-md text-xs font-medium ',
						groupType === 'version'
							? 'bg-gray-900 text-white'
							: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
					)}
					onClick={() => setGroupType('version')}
				>
					By Version
				</button>
				<button
					className={clsx(
						'px-2 py-1 rounded-md text-xs font-medium ',
						groupType === 'month'
							? 'bg-gray-900 text-white'
							: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
					)}
					onClick={() => setGroupType('month')}
				>
					By month
				</button>
			</div>

			{Object.keys(groupedItems).map((version) => {
				return (
					<div key={version}>
						<h3 className="text-lg font-bold">{version}</h3>
						<ul className="flex flex-col gap-2">
							{groupedItems[version].map((item) => {
								return (
									<li key={item.content.metadata.permalink}>
										<a
											href={item.content.metadata.permalink}
											className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
										>
											{item.content.frontMatter.title}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}

function BlogListPageContent(props) {
	const { metadata, items, sidebar } = props;

	const isChangelog = window.location.pathname.includes('/changelog');

	return (
		<BlogLayout sidebar={sidebar}>
			<div
				className={
					isChangelog
						? 'flex flex-col gap-16'
						: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
				}
			>
				<div className={isChangelog ? 'flex flex-row gap-2' : ''}>
					{isChangelog && <Sidebar items={items} />}

					<div class="flex flex-col gap-16">
						<BlogPostItems items={items} />
					</div>
				</div>
			</div>

			<BlogListPaginator metadata={metadata} />
		</BlogLayout>
	);
}
export default function BlogListPage(props) {
	return (
		<HtmlClassNameProvider
			className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}
		>
			<BlogListPageMetadata {...props} />
			<BlogListPageContent {...props} />
		</HtmlClassNameProvider>
	);
}
