import React, { useState } from 'react';

function exponentialScale(value, min, max) {
    if (value <= min) return min;
    const scale = (max - min) / Math.log(max - min + 1);
    let scaledValue = min + Math.round(Math.exp(value / scale) - 1);
    return Math.min(scaledValue, max); // Ensure the value does not exceed max
}

function inverseExponentialScale(value, min, max) {
    if (value <= min) return min;
    const scale = (max - min) / Math.log(max - min + 1);
    let displayValue = scale * Math.log(value - min + 1);
    return Math.min(displayValue, max); // Ensure the display value does not exceed max
}

export default function Slider({ min, max, step, defaultValue, onChange }) {
    const [value, setValue] = useState(defaultValue);
    const isExponential = max > 100;
    
    const handleChange = (event) => {
        let newValue = parseFloat(event.target.value);
        if (isExponential) {
            newValue = exponentialScale(newValue, min, max);
        }
        setValue(newValue);
        onChange(newValue);
    };

    let displayValue = value;
    if (isExponential) {
        displayValue = inverseExponentialScale(value, min, max);
    }

    return (
        <div className="w-full relative">
            <input
                type="range"
                min={min}
                max={max}
                step={isExponential ? 1 : step}
                value={displayValue}
                onChange={handleChange}
                className="w-full h-2 appearance-none bg-gray-300 rounded-full outline-none accent-blue-500"
                style={{
                    background: `linear-gradient(to right, blue 0%, blue ${
                        ((displayValue - min) / (max - min)) * 100
                    }%, #CBD5E0 ${((displayValue - min) / (max - min)) * 100}%, #CBD5E0 100%)`
                }}
            />
        </div>
    );
}
