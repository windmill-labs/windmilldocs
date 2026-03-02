import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function AnimationTest() {
	return (
		<Layout title="Animation test" description="Test page for animation variant">
			<BrowserOnly>
				{() => {
					const CompleteAnimation = require('../landing/CompleteAnimation').default;
					return (
						<div className="bg-[#0a0f18] min-h-screen flex items-center justify-center py-16">
							<div className="w-full max-w-xl px-4">
								<CompleteAnimation />
							</div>
						</div>
					);
				}}
			</BrowserOnly>
		</Layout>
	);
}
