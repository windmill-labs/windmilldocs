import React from 'react';
import LandingSection from './LandingSection';

export default function HubExamples({ examples, title, description }) {
	return (
		<LandingSection bgClass="">
			<div className="flex flex-col min-w-full">
				<div className={`text-5xl max-w-2xl font-normal tracking-tight leading-12 mb-4 pt-8`}>
					{title ?? 'Hub'}
				</div>
				<span className={`text-lg max-w-2xl mb-12 font-normal`}>
					{description ??
						'Explore over 5k curated scripts from the Windmill Hub. Use them as they are or edit them to your needs.'}
				</span>

				<div className="grid grid-cols-1 md:grid-cols-6 gap-8 w-full">
					{examples.map((example) => (
						<a
							key={example.title}
							href={example.link}
							target="_blank"
							className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 w-full col-span-2 cursor-pointer hover:bg-opacity-50 !text-gray-900 dark:!text-white !no-underline"
						>
							<h3 className="text-base font-normal">{example.title}</h3>
						</a>
					))}
				</div>
			</div>
		</LandingSection>
	);
}
