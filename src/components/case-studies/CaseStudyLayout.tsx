import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

interface CaseStudyLayoutProps {
	Content: React.ComponentType<{ title: string; description: string }>;
	frontMatter: {
		title: string;
		description: string;
	};
}

export default function CaseStudyLayout({ Content, frontMatter }: CaseStudyLayoutProps) {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>{frontMatter.title} | Windmill Case Studies</title>
					<meta name="title" content={frontMatter.title} />
					<meta name="description" content={frontMatter.description} />
					<link rel="icon" href="/img/logo.svg" />
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
