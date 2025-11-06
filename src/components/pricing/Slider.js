import React, { useState, useEffect } from 'react';

function exponentialScale(displayValue, min, max, step = 1) {
    const scale = max / Math.log(max + 1);
    let value = Math.exp(displayValue / scale) - 1;
    
    // If step is provided and greater than 1, ensure we only return values that are multiples of step
    if (step > 1) {
        // Round to the nearest step
        value = Math.round(value / step) * step;
        return Math.min(Math.max(value, min), max);
    }
    
    // Dynamically generate round numbers based on max value (only when step is 1)
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
        if (round > min && round < max && Math.abs(value - round) < snapThreshold) {
            return round;
        }
    }
    
    return Math.min(Math.round(value), max);
}

function inverseExponentialScale(value, min, max) {
    if (value >= max) return max;
    
    const scale = (max) / Math.log(max + 1);
    // Treat 0 like any other value in the visual scale
    let displayValue = scale * Math.log(value + 1);
    
    return Math.min(displayValue, max);
}

export default function Slider({ min, max, step, defaultValue, onChange, noExponential = false, exponential = false }) {
    const [value, setValue] = useState(defaultValue);
    const isExponential = exponential || (!noExponential && max > 99);

    useEffect(() => {
        const clampedValue = clamp(defaultValue, min, max);
        if (clampedValue !== value) {
            setValue(clampedValue);
        }
    }, [defaultValue, min, max, value]);

    const handleChange = (event) => {
        let newValue = parseFloat(parseFloat(event.target.value).toFixed(2));
        if (isExponential) {
            // Convert from visual scale back to actual value and snap to round numbers
            newValue = exponentialScale(newValue, min, max, step);
        } else {
            // For non-exponential sliders, ensure step compliance
            if (step > 1) {
                newValue = Math.round(newValue / step) * step;
            }
        }
        // Ensure value doesn't go below min
        newValue = Math.max(min, newValue);
        setValue(newValue);
        onChange(newValue);
    };

    let displayValue = value;
    if (isExponential) {
        displayValue = inverseExponentialScale(value, min, max);
    }

    // Adjust the gradient calculation to account for the padding
    const gradientPercentage = ((displayValue) / (max)) * 100;

    return (
        <div className="w-full relative">
            <input
                type="range"
                min={0}
                max={max}
                step={isExponential ? (max / 1000) : step}
                value={displayValue}
                onChange={handleChange}
                className="w-full h-2 appearance-none bg-gray-300 rounded-full outline-none accent-blue-500"
                style={{
                    background: `linear-gradient(to right, blue 0%, blue ${gradientPercentage}%, #CBD5E0 ${gradientPercentage}%, #CBD5E0 100%)`
                }}
            />
        </div>
    );
}

// Utility function to clamp a value between min and max
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}