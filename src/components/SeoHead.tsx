import React from 'react';
import Head from '@docusaurus/Head';

interface SeoHeadProps {
	title?: string;
	description?: string;
	url?: string;
	image?: string;
}

export default function SeoHead({
	title = 'Windmill | Build, deploy and monitor internal software at scale',
	description = 'Open-source workflow engine to build workflows, data pipelines and internal tools at scale. Self-hostable, for developers and AI, with enterprise security.',
	url = 'https://www.windmill.dev/',
	image = 'https://www.windmill.dev/img/og_preview.png'
}: SeoHeadProps) {
	return (
		<Head>
			<title>{title}</title>

			{/* Standard meta tags */}
			<meta name="title" content={title} />
			<meta name="description" content={description} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

			<link rel="icon" href="/img/logo.svg" />
		</Head>
	);
}
