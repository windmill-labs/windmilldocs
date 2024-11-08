import React, { useState, useEffect } from 'react';

function exponentialScale(value, min, max, noExponential = false) {
    if (value <= min) return min;
    const scale = (max - min) / Math.log(max - min + 1);
    let scaledValue = min + Math.round(Math.exp(value / scale) - 1);
    
    // Skip snapping to round numbers if noExponential is true
    if (noExponential) {
        return Math.min(scaledValue, max);
    }

    // Dynamically generate round numbers based on max value
    const roundNumbers = [];
    const magnitude = Math.floor(Math.log10(max));
    const base = Math.pow(10, magnitude);
    
    // For max values like 1000, add steps like [100, 250, 500, 750, 1000]
    // For max values like 100, add steps like [10, 25, 50, 75, 100]
    // For max values like 50, add steps like [5, 10, 15, 25, 35, 50]
    if (max >= base) {
        roundNumbers.push(base * 0.1, base * 0.25, base * 0.5, base * 0.75, base);
    } else {
        const step = Math.max(1, Math.floor(max / 10));
        for (let i = step; i <= max; i += step) {
            roundNumbers.push(i);
        }
    }
    
    const snapThreshold = max * 0.02; // 2% of max value as threshold
    
    for (const round of roundNumbers) {
        if (round > min && round < max && Math.abs(scaledValue - round) < snapThreshold) {
            return round;
        }
    }
    
    return Math.min(scaledValue, max);
}

function inverseExponentialScale(value, min, max) {
    if (value <= min) return min;
    if (value >= max) return max;
    const scale = (max - min) / Math.log(max - min + 1);
    let displayValue = scale * Math.log(value - min + 1);
    return Math.min(displayValue, max); // Ensure the display value does not exceed max
}

export default function Slider({ min, max, step, defaultValue, onChange, noExponential = false }) {
    const [value, setValue] = useState(defaultValue);
    const isExponential = !noExponential && max > 99;

    useEffect(() => {
        setValue((prevValue) => clamp(prevValue, min, max));
    }, [defaultValue, min, max]);

    const handleChange = (event) => {
        let newValue = parseFloat(parseFloat(event.target.value).toFixed(2));
        if (isExponential) {
            newValue = exponentialScale(newValue, min, max, noExponential);
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

// Utility function to clamp a value between min and max
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}