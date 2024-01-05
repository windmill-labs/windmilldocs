import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Banner() {
	return (
		<div className="flex items-center gap-x-6 bg-purple-800 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
			<a
				href="/docs/misc/guides/airplane"
				className="text-sm leading-6 !text-white flex flex-row gap-2 items-center"
			>
				<strong className="font-semibold">Migration from Airplane to Windmill made easy</strong>
				See docs <ArrowRight size={12} />
			</a>
			<div className="flex flex-1 justify-end"></div>
		</div>
	);
}
