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
	// Get the current month and year
	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
	const currentYear = currentDate.getFullYear();
	const currentMonthYear = `${currentMonth} ${currentYear}`;

	// Group items by month and find the latest version for each month
	const groupedItems = items.reduce((acc, item) => {
		const date = new Date(item.content.metadata.date);
		const month = date.toLocaleString('default', { month: 'long' });
		const year = date.getFullYear();
		const dateStr = `${month} ${year}`;

		if (!acc[dateStr]) {
			acc[dateStr] = { items: [], latestVersion: '' };
		}

		acc[dateStr].items.push(item);

		// Update latest version if needed
		const version = item.content.frontMatter.version;
		if (
			dateStr !== currentMonthYear &&
			(!acc[dateStr].latestVersion || acc[dateStr].latestVersion < version)
		) {
			acc[dateStr].latestVersion = version;
		}

		return acc;
	}, {});

	return (
		<div className="flex flex-col gap-4 max-w-sm w-full">
			{Object.keys(groupedItems).map((dateStr) => {
				const isCurrentMonth = dateStr === currentMonthYear;
				const header = isCurrentMonth
					? dateStr
					: `${dateStr} - ${groupedItems[dateStr].latestVersion}`;

				return (
					<div key={dateStr}>
						<h3 className="text-lg font-bold">{header}</h3>
						<ul className="flex flex-col gap-2">
							{groupedItems[dateStr].items.map((item) => (
								<li key={item.content.metadata.permalink}>
									<a
										href={item.content.metadata.permalink}
										className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
									>
										{item.content.frontMatter.title}
									</a>
								</li>
							))}
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
