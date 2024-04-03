import React from 'react';
import LandingSection from './LandingSection';

export default function UseCases({ cases, title }) {
	return (
		<LandingSection bgClass="">
			<div className="flex flex-col min-w-full">
				<div className={`text-5xl max-w-2xl font-normal tracking-tight leading-12 mb-4 pt-8`}>
					{title ?? 'Use cases'}
				</div>
				<span className={`text-lg max-w-2xl mb-12 font-normal`}>
					Explore some of the ways you can use Windmill
				</span>

				<div className="grid grid-cols-1 md:grid-cols-6 gap-8 w-full">
					{cases.map((example) => (
						<div
							key={example.title}
							className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 w-full col-span-2 cursor-pointer hover:bg-opacity-50"
						>
							<h3 className="text-base font-normal">{example.title}</h3>
						</div>
					))}
				</div>
			</div>
		</LandingSection>
	);
}
