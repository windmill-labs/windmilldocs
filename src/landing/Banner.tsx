import React from 'react';
import { useLocation } from '@docusaurus/router';

export default function Banner() {
	const { pathname } = useLocation();
	if (pathname === '/launch-week-march-2026') return null;

	return (
		<a
			href="/launch-week-march-2026"
			className="group relative block w-full overflow-hidden !no-underline bg-blue-600"
		>
			<div className="flex items-center justify-center gap-3 px-6 py-4">
				<span className="text-base font-semibold text-white">Launch week</span>
				<span className="text-white/60">·</span>
				<span className="text-sm text-white/80">Five new features shipping this week (March 30 – April 3)</span>
				<span className="ml-1 text-white group-hover:translate-x-1 transition-transform">→</span>
			</div>
		</a>
	);
}
