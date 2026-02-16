import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import SeoHead from '../SeoHead';
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
	const pageUrl = useCaseData
		? `https://www.windmill.dev${useCaseData.link}`
		: 'https://www.windmill.dev';

	const pageSchema = useCaseData
		? {
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: useCaseData.name,
				headline: useCaseData.headline,
				description: useCaseData.description,
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Web',
				offers: [
					{
						'@type': 'Offer',
						name: 'Community Edition',
						price: '0',
						priceCurrency: 'USD'
					}
				],
				publisher: {
					'@type': 'Organization',
					name: 'Windmill',
					logo: {
						'@type': 'ImageObject',
						url: 'https://www.windmill.dev/img/windmill.svg'
					}
				},
				url: pageUrl
			}
		: null;

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<SeoHead
					title={`${frontMatter.title} | Windmill`}
					description={frontMatter.description}
					url={pageUrl}
				/>
				{pageSchema && (
					<Head>
						<script type="application/ld+json">
							{JSON.stringify(pageSchema)}
						</script>
					</Head>
				)}
				<>
					<RadialBlur />
					<Content title={frontMatter.title} description={frontMatter.description} />
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
