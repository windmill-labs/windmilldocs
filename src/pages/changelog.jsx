import React from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingSection from '../landing/LandingSection';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import RadialBlur from '../landing/RadialBlur';
import { Archive, Blocks, Sparkles } from 'lucide-react';

export default function Changelog() {
	const changelogs = [
		{
			title: 'Database Studio',
			description: `Introducing the Database Studio, a web-based database management tool that leverages Ag Grid for table display and interaction. This component enhances the user's ability to interact with database content in a dynamic and intuitive way.`,
			improvements: [],
			newFeatures: [
				'Table Content Display: Enables viewing the content of a database table in an easily navigable format.',
				'Cell Editing: Allows direct editing of table cells, provided the cells are marked editable.',
				'Row Addition: Facilitates adding new rows to the table. A form for this purpose is auto-generated based on column definitions, complete with default values and presented in a drawer format.',
				"Row Deletion: Offers the functionality to delete rows, with a delete button that appears to the right of each row. This feature is contingent on the 'Allow delete' property being set to true."
			],

			deprecations: [],
			image: '/images/changelog/2024-01-22.png',
			date: '2024-01-22',
			badge: 'App'
		},
		{
			title: 'Rich results render',
			description: 'Added rich results render for arrays of objects and markdown',
			newFeatures: [
				'Support for arrays of objects',
				'Download as CSV and JSON',
				'Pagination',
				'Hide/show columns',
				'Search and filter',
				'Support for markdown'
			],
			image: '/images/changelog/2024-01-21.png',
			badge: 'Script',
			improvements: [],
			deprecations: [],
			date: '2024-01-21'
		},
		{
			title: 'Ag Charts',
			description:
				'The Ag Charts component integrates the Ag Charts library, enabling the visualization of data through various chart types. This component is designed to offer a flexible and powerful way to display data graphically within the application.',
			newFeatures: [
				'Chart Display: Leverages the Ag Charts library to present data in a visually appealing chart format.',
				'Diverse Chart Types: Supports multiple chart types including Bar, Line, Scatter, Area, and Range Bar (exclusive to Enterprise Edition).'
			],
			image: '/images/changelog/2024-01-20.png',
			badge: 'App',
			improvements: [],
			deprecations: [],
			date: '2024-01-20'
		}
	];

	function getCurrentChangelog(changelogs) {
		const hash = window.location.hash;

		const changelogId = decodeURIComponent(hash.substring(1));

		return changelogs.find((changelog) => changelog.date === changelogId);
	}

	const currentChangelog = getCurrentChangelog(changelogs);

	useEffect(() => {
		if (currentChangelog) {
			// Set dynamic document title
			document.title = currentChangelog.title;
		}
	}, [currentChangelog]);

	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>{currentChangelog.title}</title>
					<meta name="title" content={currentChangelog.title} />
					<meta property="og:title" content={currentChangelog.title} />
					<meta property="og:description" content={currentChangelog.description} />
					<meta property="og:image" content={currentChangelog.image} />
				</Head>
				<LandingHeader />
				<LandingSection bgClass="relative">
					<>
						<RadialBlur />
						<div className="space-y-12 pt-32 pb-16">
							<div className="flex flex-col max-w-3xl">
								<h2 className="text-3xl font-extrabold dark:text-white text-gray-900 sm:text-4xl">
									Changelog
								</h2>
								<p className="mt-3 text-xl dark:text-gray-300 text-gray-600 sm:mt-4">
									See what's new with Windmill.
								</p>

								<div className="max-w-3xl mx-auto flex flex-col gap-20">
									{changelogs.length > 0 &&
										changelogs.map((changelog, idx) => (
											<div
												key={idx}
												className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8"
												id={changelog.date}
											>
												<div className="md:col-span-12">
													<div className="flex flex-row gap-1 items-center mt-12 mb-4">
														<h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
															{changelog.title}
														</h3>
														{changelog.badge && (
															<span
																className={
																	'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ' +
																	(changelog.badge === 'App'
																		? 'bg-orange-100 text-orange-800'
																		: changelog.badge === 'Flow'
																		? 'bg-emerald-100 text-emerald-800'
																		: 'bg-blue-100 text-blue-800')
																}
															>
																{changelog.badge}
															</span>
														)}
													</div>
													<div className="mb-6">
														<p className="text-base dark:text-gray-300 text-gray-600">
															{new Date(changelog.date).toLocaleDateString()}
														</p>
													</div>
													<img
														className="rounded-lg shadow-lg border h-96 w-full object-cover my-8"
														src={changelog.image}
														alt=""
													/>

													<p className="text-base dark:text-gray-200 text-gray-600">
														{changelog.description}
													</p>

													{changelog.improvements.length > 0 && (
														<div className="mt-6">
															<h4 className="text-lg font-medium text-gray-900 dark:text-white flex flex-row gap-1 items-center">
																<Sparkles className="inline-block w-6 h-6 mr-2" />
																Improvements
															</h4>
															<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8 flex flex-col gap-2">
																{changelog.improvements.map((improvement, idx) => (
																	<li key={idx} className="list-disc">
																		{improvement}
																	</li>
																))}
															</ul>
														</div>
													)}
													{changelog.newFeatures.length > 0 && (
														<div className="mt-6">
															<h4 className="text-lg font-medium text-gray-900 dark:text-white flex flex-row gap-1 items-center">
																<Blocks className="inline-block w-6 h-6 mr-2" />
																New Features
															</h4>
															<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8 flex flex-col gap-2">
																{changelog.newFeatures.map((newFeature, idx) => (
																	<li key={idx} className="list-disc">
																		{newFeature}
																	</li>
																))}
															</ul>
														</div>
													)}
													{changelog.deprecations.length > 0 && (
														<div className="mt-6">
															<h4 className="text-lg font-medium text-gray-900 dark:text-white flex flex-row gap-1 items-center">
																<Archive className="inline-block w-6 h-6 mr-2" />
																Deprecations
															</h4>
															<ul className="mt-4 text-base dark:text-gray-200 text-gray-600 pl-8 flex flex-col gap-2">
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
						</div>
					</>
				</LandingSection>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
