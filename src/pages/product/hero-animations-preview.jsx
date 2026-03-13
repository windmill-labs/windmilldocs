import React from 'react';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import RbacHeroAnimation from '../../components/products/RbacHeroAnimation';

export default function HeroAnimationsPreview() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<RadialBlur />
				<div className="pt-32 max-w-full">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
						<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 mb-4 text-center">
							RBAC hero animation
						</h1>
						<p className="text-gray-500 text-center mb-16">Live audit trail (light mode)</p>

						<section className="mb-24">
							<RbacHeroAnimation />
						</section>
					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
