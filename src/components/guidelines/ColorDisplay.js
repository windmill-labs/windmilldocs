import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { getTextClass, getSurfaceClass, getBorderClass } from '../../utils/themeColors';

const ColorDisplay = ({ colors, darkColors }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const currentColors = isDarkMode && darkColors ? darkColors : colors;
	const hasToggle = darkColors && darkColors.length > 0;

	return (
		<div>
			{hasToggle && (
				<div style={{ marginBottom: '16px' }}>
					<DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
				</div>
			)}
			<div className={`grid gap-4 mb-6 p-4 rounded-md border ${getSurfaceClass('primary', isDarkMode)} ${getBorderClass('light', isDarkMode)}`} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
				{currentColors.map((color, index) => (
					<div key={index}>
						<div
							className={`w-full h-12 rounded mb-2 border ${getBorderClass('light', isDarkMode)}`}
							style={{ backgroundColor: color.hex }}
						></div>
						<div className={`text-sm font-semibold mb-1 ${getTextClass('emphasis', isDarkMode)}`}>
							{color.name}
						</div>
						<code className={`text-xs ${getTextClass('secondary', isDarkMode)}`}>
							{color.hex}
						</code>
						{color.description && (
							<div className={`text-xs mt-1 ${getTextClass('secondary', isDarkMode)}`}>
								{color.description}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ColorDisplay;
