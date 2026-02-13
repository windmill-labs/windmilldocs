import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

interface UseCaseData {
	slug: string;
	name: string;
	headline: string;
	description: string;
	link: string;
}

interface UseCaseLayoutProps {
	Content: React.ComponentType<{ title: string; description: string }>;
	frontMatter: {
		title: string;
		description: string;
	};
	useCaseData?: UseCaseData;
}

export default function UseCaseLayout({ Content, frontMatter, useCaseData }: UseCaseLayoutProps) {
	const pageSchema = useCaseData
		? {
				'@context': 'https://schema.org',
				'@type': 'WebPage',
				name: useCaseData.name,
				headline: useCaseData.headline,
				description: useCaseData.description,
				publisher: {
					'@type': 'Organization',
					name: 'Windmill',
					logo: {
						'@type': 'ImageObject',
						url: 'https://www.windmill.dev/img/windmill.svg'
					}
				},
				url: `https://www.windmill.dev${useCaseData.link}`
			}
		: null;

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>{frontMatter.title} | Windmill</title>
					<meta name="title" content={frontMatter.title} />
					<meta name="description" content={frontMatter.description} />
					<link rel="icon" href="/img/logo.svg" />
					{pageSchema && (
						<script type="application/ld+json">
							{JSON.stringify(pageSchema)}
						</script>
					)}
				</Head>
				<>
					<RadialBlur />
					<Content title={frontMatter.title} description={frontMatter.description} />
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
