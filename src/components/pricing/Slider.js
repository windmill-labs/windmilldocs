import { useState } from 'react';
import React from 'react';

export default function Slider({ min, max, step, defaultValue, onChange }) {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (event) => {
		setValue(event.target.value);
		onChange(event.target.value);
	};

	return (
		<div className="w-full relative">
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={handleChange}
				className="w-full h-2 appearance-none bg-gray-300 rounded-full outline-none accent-blue-500"
				style={{
					background: `linear-gradient(to right, blue 0%, blue ${
						((value - min) / (max - min)) * 100
					}%, #CBD5E0 ${((value - min) / (max - min)) * 100}%, #CBD5E0 100%)`
				}}
			/>
		</div>
	);
}
