import React from 'react';
import BlogPostItemHeaderTitle from './Title';
import BlogPostItemHeaderInfo from './Info';
import BlogPostItemHeaderAuthors from './Authors';

export default function BlogPostItemHeader() {
	return (
		<header>
			<BlogPostItemHeaderTitle />
			<BlogPostItemHeaderInfo />
			<BlogPostItemHeaderAuthors />
		</header>
	);
}
