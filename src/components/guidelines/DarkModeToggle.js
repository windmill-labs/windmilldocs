import React from 'react';

const DarkModeToggle = ({ isDarkMode, onToggle, style = {} }) => {
	return (
		<button
			onClick={onToggle}
			style={{
				padding: '8px 16px',
				border: '1px solid #e2e8f0',
				borderRadius: '6px',
				backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
				color: isDarkMode ? '#ffffff' : '#2d3748',
				fontSize: '12px',
				fontWeight: '500',
				cursor: 'pointer',
				transition: 'all 0.2s ease',
				...style
			}}
		>
			{isDarkMode ? '☀️ Light mode' : '🌙 Dark mode'}
		</button>
	);
};

export default DarkModeToggle;
