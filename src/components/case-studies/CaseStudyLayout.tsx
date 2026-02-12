import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

interface CaseStudyData {
	company: string;
	title: string;
	description: string;
	author: {
		name: string;
		role: string;
	};
	date?: string;
	category?: string;
	link?: string;
}

interface CaseStudyLayoutProps {
	Content: React.ComponentType<{ title: string; description: string }>;
	frontMatter: {
		title: string;
		description: string;
	};
	caseStudyData?: CaseStudyData;
}

export default function CaseStudyLayout({ Content, frontMatter, caseStudyData }: CaseStudyLayoutProps) {
	const articleSchema = caseStudyData
		? {
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: caseStudyData.title,
				description: caseStudyData.description,
				...(caseStudyData.date && { datePublished: caseStudyData.date }),
				author: {
					'@type': 'Person',
					name: caseStudyData.author.name
				},
				publisher: {
					'@type': 'Organization',
					name: 'Windmill',
					logo: {
						'@type': 'ImageObject',
						url: 'https://www.windmill.dev/img/windmill.svg'
					}
				},
				about: {
					'@type': 'Organization',
					name: caseStudyData.company
				},
				url: `https://www.windmill.dev${caseStudyData.link}`
			}
		: null;

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>{frontMatter.title} | Windmill Case Studies</title>
					<meta name="title" content={frontMatter.title} />
					<meta name="description" content={frontMatter.description} />
					<link rel="icon" href="/img/logo.svg" />
					{articleSchema && (
						<script type="application/ld+json">
							{JSON.stringify(articleSchema)}
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
