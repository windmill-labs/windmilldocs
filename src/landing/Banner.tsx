import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Banner() {
	return (
		<div className="flex items-center gap-x-6 bg-teal-700 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
			<a
				href="/blog/launch-week-1"
				className="text-sm leading-6 !text-white flex flex-row gap-2 items-center"
			>
				<strong className="font-semibold">Windmill Launch Week #1</strong>
				Join us week of November 20 for exciting announcements! <ArrowRight size={12} />
			</a>
			<div className="flex flex-1 justify-end"></div>
		</div>
	);
}
