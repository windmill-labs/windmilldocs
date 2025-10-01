import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

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
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '16px',
					marginBottom: '24px',
					padding: hasToggle && isDarkMode ? '16px' : '0',
					backgroundColor: hasToggle && isDarkMode ? '#2e3440' : 'transparent',
					borderRadius: hasToggle && isDarkMode ? '8px' : '0',
					border: hasToggle && isDarkMode ? '1px solid #3e4c60' : 'none'
				}}
			>
				{currentColors.map((color, index) => (
					<div key={index}>
						<div
							style={{
								width: '100%',
								height: '48px',
								backgroundColor: color.hex,
								borderRadius: '4px',
								marginBottom: '8px',
								border: '1px solid #e2e8f0'
							}}
						></div>
						<div
							style={{
								fontSize: '14px',
								fontWeight: '600',
								marginBottom: '4px',
								color: hasToggle && isDarkMode ? '#f3f4f6' : '#2d3748'
							}}
						>
							{color.name}
						</div>
						<code
							style={{
								fontSize: '12px',
								color: hasToggle && isDarkMode ? '#aab0bb' : '#718096'
							}}
						>
							{color.hex}
						</code>
						{color.description && (
							<div
								style={{
									fontSize: '12px',
									color: hasToggle && isDarkMode ? '#aab0bb' : '#718096',
									marginTop: '4px'
								}}
							>
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
