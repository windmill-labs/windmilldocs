import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const TypographyTable = ({ lightExamples, darkExamples }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const currentExamples = isDarkMode ? darkExamples : lightExamples;

	return (
		<div>
			<div style={{ marginBottom: '16px' }}>
				<DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
			</div>

			<div
				style={{
					padding: isDarkMode ? '16px' : '0',
					backgroundColor: isDarkMode ? '#2e3440' : 'transparent',
					borderRadius: isDarkMode ? '8px' : '0'
				}}
			>
				<table
					style={{
						width: '100%',
						borderCollapse: 'collapse',
						overflow: 'hidden'
					}}
				>
					<thead>
						<tr>
							<th
								style={{
									textAlign: 'left',
									padding: '12px 8px',
									fontSize: '12px',
									fontWeight: '600',
									color: isDarkMode ? '#D4D8DD' : '#4A5568'
								}}
							>
								Style
							</th>
							<th
								style={{
									textAlign: 'left',
									padding: '12px 8px',
									fontSize: '12px',
									fontWeight: '600',
									color: isDarkMode ? '#D4D8DD' : '#4A5568'
								}}
							>
								Example
							</th>
							<th
								style={{
									textAlign: 'left',
									padding: '12px 8px',
									fontSize: '12px',
									fontWeight: '600',
									color: isDarkMode ? '#D4D8DD' : '#4A5568'
								}}
							>
								Specifications
							</th>
							<th
								style={{
									textAlign: 'left',
									padding: '12px 8px',
									fontSize: '12px',
									fontWeight: '600',
									color: isDarkMode ? '#D4D8DD' : '#4A5568'
								}}
							>
								Usage
							</th>
						</tr>
					</thead>
					<tbody>
						{currentExamples.map((row, index) => (
							<tr key={index}>
								<td
									style={{
										padding: '12px 8px',
										fontSize: '12px',
										fontWeight: '500',
										color: isDarkMode ? '#D4D8DD' : '#4A5568'
									}}
								>
									<strong>{row.style}</strong>
								</td>
								<td
									style={{
										padding: '12px 8px'
									}}
								>
									{row.example}
								</td>
								<td
									style={{
										padding: '12px 8px',
										fontSize: '11px',
										color: isDarkMode ? '#aab0bb' : '#718096'
									}}
								>
									{row.specifications}
								</td>
								<td
									style={{
										padding: '12px 8px',
										fontSize: '11px',
										color: isDarkMode ? '#aab0bb' : '#718096'
									}}
								>
									{row.usage}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TypographyTable;
