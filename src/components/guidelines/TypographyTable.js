import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { getTextClass, getSurfaceClass } from '../../utils/themeColors';

const TypographyTable = ({ lightExamples, darkExamples }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const currentExamples = isDarkMode ? darkExamples : lightExamples;

	return (
		<div>
			<div style={{ marginBottom: '16px' }}>
				<DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
			</div>

			<div className={`p-4 rounded-lg ${getSurfaceClass('primary', isDarkMode)}`}>
				<table className="w-full border-collapse overflow-hidden">
					<thead>
						<tr>
							<th
								className={`text-left py-3 px-2 text-xs font-semibold ${getTextClass('primary', isDarkMode)}`}
							>
								Style
							</th>
							<th
								className={`text-left py-3 px-2 text-xs font-semibold ${getTextClass('primary', isDarkMode)}`}
							>
								Example
							</th>
							<th
								className={`text-left py-3 px-2 text-xs font-semibold ${getTextClass('primary', isDarkMode)}`}
							>
								Specifications
							</th>
							<th
								className={`text-left py-3 px-2 text-xs font-semibold ${getTextClass('primary', isDarkMode)}`}
							>
								Usage
							</th>
						</tr>
					</thead>
					<tbody>
						{currentExamples.map((row, index) => (
							<tr key={index}>
								<td
									className={`py-3 px-2 text-xs font-medium ${getTextClass('primary', isDarkMode)}`}
								>
									<strong>{row.style}</strong>
								</td>
								<td className="py-3 px-2">{row.example}</td>
								<td className={`py-3 px-2 text-2xs ${getTextClass('primary', isDarkMode)}`}>
									{row.specifications}
								</td>
								<td className={`py-3 px-2 text-2xs ${getTextClass('primary', isDarkMode)}`}>
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
