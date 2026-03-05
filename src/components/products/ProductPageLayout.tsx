import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import SeoHead from '../SeoHead';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

interface ProductData {
	slug: string;
	name: string;
	headline: string;
	description: string;
	link: string;
}

interface ProductPageLayoutProps {
	Content: React.ComponentType<{ title: string; description: string }>;
	frontMatter: {
		title: string;
		description: string;
	};
	productData?: ProductData;
}

export default function ProductPageLayout({ Content, frontMatter, productData }: ProductPageLayoutProps) {
	const pageUrl = productData
		? `https://www.windmill.dev${productData.link}`
		: 'https://www.windmill.dev';

	const pageSchema = productData
		? {
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: `Windmill ${productData.name}`,
				headline: productData.headline,
				description: productData.description,
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Web',
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
