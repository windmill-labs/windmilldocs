import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingSection from '../landing/LandingSection';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';

export default function Changelog() {
	const changelogs = [
		{
			title: 'Commit message suggestions',
			description: `In the latest release, I've added support for commit message and description suggestions via an integration with OpenAI. Commit looks at all of your changes, and feeds that into the machine with a bit of prompt-tuning to get back a commit message that does a surprisingly good job at describing the intent of your changes.

			It's also been a pretty helpful way to remind myself what the hell I was working on at the end of the day yesterday when I get back to my computer and realize I didn't commit any of my work.`,
			improvements: [
				'Added commit message and description suggestions powered by OpenAI',
				'Fixed race condition that could sometimes leave you in a broken rebase state',
				'Improved active project detection to try and ignore file changes triggered by the system instead of the user',
				'Fixed bug that sometimes reported the wrong number of changed files'
			],
			newFeatures: [
				'Added commit message and description suggestions powered by OpenAI',
				'Added ability to add a custom commit message prefix'
			],

			deprecations: [],
			image:
				'https://commit.tailwindui.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffirst-release.c5cb86d1.png&w=1200&q=75',
			date: '2021-08-10'
		}
	];

	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Changelog</title>
					<meta name="title" content="Changelog" />
					<meta
						name="description"
						content="We are a team commited to open source, with a strong will to improve internal tools for everyone."
					/>
				</Head>
				<LandingHeader />
				<LandingSection bgClass="relative">
					<div className="flex flex-col mt-12 max-w-3xl">
						<h2 className="text-3xl font-extrabold text-white sm:text-4xl">Changelog</h2>
						<p className="mt-3 text-xl text-gray-300 sm:mt-4">See what's new with Commit.</p>

						<div className="max-w-3xl mx-auto divide-y-2 divide-gray-700">
							{changelogs.map((changelog, idx) => (
								<div key={idx} className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8">
									<div className="md:col-span-12">
										<img className="rounded-lg shadow-lg" src={changelog.image} alt="" />

										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-12 mb-4">
											{changelog.title}
										</h3>
										<div className="mb-6">
											<p className="text-base text-gray-300">Released on {changelog.date}</p>
										</div>

										<p className="text-base dark:text-gray-200 text-gray-600">
											{changelog.description}
										</p>

										<div className="mt-6">
											<h4 className="text-lg font-medium text-gray-900 dark:text-white">
												Improvements
											</h4>
											<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8">
												{changelog.improvements.map((improvement, idx) => (
													<li key={idx} className="list-disc">
														{improvement}
													</li>
												))}
											</ul>
										</div>
										<div className="mt-6">
											<h4 className="text-lg font-medium text-gray-900 dark:text-white">
												New Features
											</h4>
											<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8">
												{changelog.newFeatures.map((newFeature, idx) => (
													<li key={idx} className="list-disc">
														{newFeature}
													</li>
												))}
											</ul>
										</div>

										{changelog.deprecations.length > 0 && (
											<div className="mt-6">
												<h4 className="text-lg font-medium text-gray-900 dark:text-white">
													Deprecations
												</h4>
												<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8">
													{changelog.deprecations.map((deprecation, idx) => (
														<li key={idx} className="list-disc">
															{deprecation}
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</LandingSection>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
