import React from 'react';

import LandingHeader from '../../landing/LandingHeader';
import Footer from '../../landing/Footer';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import SelfHostHeroAnimationA from '../../components/products/SelfHostHeroAnimationA';
import SelfHostHeroAnimationB from '../../components/products/SelfHostHeroAnimationB';
import SelfHostHeroAnimationA2 from '../../components/products/SelfHostHeroAnimationA2';
import SelfHostHeroAnimationC from '../../components/products/SelfHostHeroAnimationC';

export default function HeroAnimationsPreview() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<RadialBlur />
				<div className="pt-32 max-w-full">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
						<h1 className="!text-4xl sm:!text-5xl !font-semibold !tracking-tight text-gray-900 mb-4 text-center">
							Self-host hero animation
						</h1>
						<p className="text-gray-500 text-center mb-16">3 options for review</p>

						<section className="mb-24">
							<h2 className="text-2xl font-semibold text-gray-800 mb-2">Option A: Deploy Anywhere</h2>
							<p className="text-gray-500 text-sm mb-8">Click deploy, see all the infrastructure providers you can run on.</p>
							<SelfHostHeroAnimationA />
						</section>

						<section className="mb-24">
							<h2 className="text-2xl font-semibold text-gray-800 mb-2">Option A2: Deploy Anywhere (expanded methods)</h2>
							<p className="text-gray-500 text-sm mb-8">Same as A but with ECS, CloudFormation, Terraform, Windows added to deploy methods.</p>
							<SelfHostHeroAnimationA2 />
						</section>

						<section className="mb-24">
							<h2 className="text-2xl font-semibold text-gray-800 mb-2">Option B: Data Sovereignty Shield</h2>
							<p className="text-gray-500 text-sm mb-8">Your data never leaves your infrastructure.</p>
							<SelfHostHeroAnimationB />
						</section>

						<section className="mb-24">
							<h2 className="text-2xl font-semibold text-gray-800 mb-2">Option C: Cloud Agnostic Stack</h2>
							<p className="text-gray-500 text-sm mb-8">Same stack, any infrastructure.</p>
							<SelfHostHeroAnimationC />
						</section>
					</div>
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
