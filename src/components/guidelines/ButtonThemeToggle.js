import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const ButtonThemeToggle = ({ buttonType, title, description }) => {
	const [isDark, setIsDark] = useState(false);

	const getImageSrc = (type, theme) => {
		return `/img/brand/buttons/${type}-${theme}.svg`;
	};

	return (
		<div className="my-6">
			<div className="flex items-center justify-between mb-2">
				<h4 className="text-base font-medium">{title}</h4>
				<button
					onClick={() => setIsDark(!isDark)}
					className="flex items-center gap-2 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
				>
					<span>{isDark ? '☀️' : '🌙'}</span>
					{isDark ? 'Light' : 'Dark'}
				</button>
			</div>

			<div
				className={twMerge(
					'border border-gray-200 p-4 rounded-lg overflow-hidden mb-2 flex justify-start h-fit',
					isDark ? 'bg-[#3B4252]' : 'bg-[#FBFBFD]'
				)}
			>
				<img
					src={getImageSrc(buttonType, isDark ? 'dark' : 'light')}
					alt={`${title} examples in ${isDark ? 'dark' : 'light'} mode showing text, icon+text, and icon-only variants`}
					className="max-w-md"
				/>
			</div>

			<p className="text-sm text-gray-600">{description}</p>
		</div>
	);
};

const ButtonShowcase = () => {
	return (
		<div className="space-y-8">
			<ButtonThemeToggle
				buttonType="accent"
				title="Accent Button"
				description="Use only for the most important action of the page/CTA. Avoid having multiple accent buttons in the same view."
			/>

			<ButtonThemeToggle
				buttonType="default"
				title="Default Button"
				description="Use for most actions. This is your primary button type for standard interactions."
			/>

			<ButtonThemeToggle
				buttonType="subtle"
				title="Subtle Button"
				description="Use with care, only in areas where it is clear that the element is a button, next to other buttons for example."
			/>
		</div>
	);
};

export default ButtonShowcase;
