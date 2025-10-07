import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const ExampleImageDisplay = ({
	lightImageSrc,
	darkImageSrc,
	altTextPrefix = 'Example',
	className = '',
	style = {}
}) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// If no dark image provided, use the same image for both themes
	const currentImageSrc = isDarkMode && darkImageSrc ? darkImageSrc : lightImageSrc;
	const currentAltText = `${altTextPrefix} - ${isDarkMode ? 'Dark' : 'Light'} theme`;

	return (
		<div className={className} style={style}>
			<div style={{ marginBottom: '16px' }}>
				<DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
			</div>

			<div style={{
				padding: '16px',
				backgroundColor: isDarkMode ? '#212732' : '#FFFFFF',
				borderRadius: '8px',
				border: `1px solid ${isDarkMode ? '#495A72' : '#e2e8f0'}`,
				marginBottom: '24px'
			}}>
				<img
					src={currentImageSrc}
					alt={currentAltText}
					style={{
						width: '100%',
						height: 'auto',
						borderRadius: '4px'
					}}
				/>
			</div>
		</div>
	);
};

export default ExampleImageDisplay;