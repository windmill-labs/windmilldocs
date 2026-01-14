import React from 'react';

export default function BackedByInvestors() {
	return (
		<div className="w-full py-8 sm:py-8">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="w-full font-medium text-slate-400 dark:text-slate-500 text-center flex items-center justify-center gap-6 flex-wrap">
					<span>Backed by</span>
					<a
						href="https://www.ycombinator.com/companies/windmill"
						target="_blank"
						rel="noopener noreferrer"
						title="Y-Combinator"
						className="hover:opacity-80 transition-opacity"
					>
						<img 
							src="/images/brands/yc_grey.svg"
							alt="Y Combinator logo"
							width="137"
							height="32"
							className="logo"
						/>
					</a>
					<a
						href="https://www.gradient.com/"
						target="_blank"
						rel="noopener noreferrer"
						title="Gradient Ventures"
						className="hover:opacity-80 transition-opacity"
					>
						<img 
							src="/images/brands/gradient.svg"
							alt="Gradient Ventures logo"
							width="160"
							height="40"
							className="logo"
						/>
					</a>
					<a
						href="https://www.bvp.com/"
						target="_blank"
						rel="noopener noreferrer"
						title="Bessemer Venture Partners"
						className="hover:opacity-80 transition-opacity"
					>
						<img 
							src="/images/brands/bessemer.png"
							alt="Bessemer Venture Partners logo"
							width="90"
							height="27"
							className="logo"
							style={{ filter: 'grayscale(100%) brightness(2)' }}
						/>
					</a>
				</div>
			</div>
		</div>
	);
}
