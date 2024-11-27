import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

import styles from './styles.module.css';

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
	const { selectMessage } = usePluralForm();
	return (readingTimeFloat) => {
		const readingTime = Math.ceil(readingTimeFloat);
		return selectMessage(
			readingTime,
			translate(
				{
					id: 'theme.blog.post.readingTime.plurals',
					description:
						'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
					message: 'One min read|{readingTime} min read'
				},
				{ readingTime }
			)
		);
	};
}
function ReadingTime({ readingTime }) {
	const readingTimePlural = useReadingTimePlural();
	return <>{readingTimePlural(readingTime)}</>;
}
function Date({ date, formattedDate }) {
	// Add null check for date prop
	if (!date) {
		return null;
	}
	
	// If formattedDate is provided, use it directly
	if (formattedDate) {
		return (
			<time dateTime={date} itemProp="datePublished">
				{formattedDate}
			</time>
		);
	}

	// Convert YYYY-MM-DD to Month DD, YYYY
	const months = {
		'01': 'Jan',
		'02': 'Feb',
		'03': 'Mar',
		'04': 'Apr',
		'05': 'May',
		'06': 'Jun',
		'07': 'Jul',
		'08': 'Aug',
		'09': 'Sep',
		'10': 'Oct',
		'11': 'Nov',
		'12': 'Dec'
	};

	const [year, month, day] = date.split('-');
	const displayDate = `${months[month]} ${parseInt(day)}, ${year}`;
	
	return (
		<time dateTime={date} itemProp="datePublished">
			{displayDate}
		</time>
	);
}

function Spacer() {
	return <>{' · '}</>;
}

export default function BlogPostItemHeaderInfo({ className }) {
	const blogPostContext = useBlogPost();
	console.log('BlogPost context:', blogPostContext);
	
	if (!blogPostContext?.metadata) {
		console.warn('No metadata available');
		return null;
	}

	const { date, formattedDate, readingTime } = blogPostContext.metadata;
	return (
		<div className={clsx(styles.container, 'margin-vert--md', className)}>
			{date && <Date date={date} formattedDate={formattedDate} />}
			{typeof readingTime !== 'undefined' && (
				<>
					<Spacer />
					<ReadingTime readingTime={readingTime} />
				</>
			)}
		</div>
	);
}
