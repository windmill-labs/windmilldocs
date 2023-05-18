import React from 'react';
import { Circle } from 'lucide-react';

export default function FeatureList({ features, level = 1, id }) {
	return (
		<ul
			className={
				(('mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10', level === 2 ? 'ml-6' : ''),
				level === 1 ? 'h-80' : '')
			}
		>
			{features.map((feature) => (
				<React.Fragment key={level + id + JSON.stringify(feature.text)}>
					<li className="flex gap-x-3 py-1">
						<Circle className="h-2 w-2 flex-none text-blue-600 mt-2" aria-hidden="true" />
						<span>{feature.text}</span>
					</li>
					{feature?.features && feature.features.length > 0 ? (
						<FeatureList features={feature.features} level={level + 1} id={id} />
					) : null}
				</React.Fragment>
			))}
		</ul>
	);
}
