import React, { useState, useEffect } from 'react';

const ALLOWED_VALUES = [1, 2, 4, 6, 8, 12, 14, 16, 32, 48, 64, 80, 96, 112, 128];
const POSITIONS = ALLOWED_VALUES.map((_, index) => index * (100 / (ALLOWED_VALUES.length - 1)));

function getStepForRange(value) {
    if (value < 4) {
        return 1;
    } else if (value < 16) {
        return 2;
    }
    return 16;
}
function valueToPosition(value) {
    const index = ALLOWED_VALUES.indexOf(value);
    return POSITIONS[index];
}

function positionToValue(position) {
    const closestPosition = POSITIONS.reduce((prev, curr) => 
        Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    );
    const index = POSITIONS.indexOf(closestPosition);
    return ALLOWED_VALUES[index];
}

function getAllowedValues(min, max) {
    const values = [];
    let current = min;
    while (current <= max) {
        values.push(current);
        if (current === max) break;
        current += getStepForRange(current);
    }
    return values;
}

function findClosestAllowedPosition(position, min, max) {
    const allowedValues = getAllowedValues(min, max);
    const positions = allowedValues.map(v => valueToPosition(v));
    
    const shiftedPositions = positions.map(p => p * 0.9 + 10);
    
    if (Math.abs(position - 100) < 1) {
        return 100;
    }
    
    const closestPosition = shiftedPositions.reduce((prev, curr) => 
        Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    );
    
    return closestPosition;
}

export default function MemorySlider({ min, max, defaultValue, onChange }) {
    const [value, setValue] = useState(defaultValue);
    const initialPosition = valueToPosition(defaultValue) * 0.9 + 10;
    const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        setValue(defaultValue);
        const newPosition = valueToPosition(defaultValue) * 0.9 + 10;
        setPosition(newPosition);
    }, [defaultValue, min, max]);

    const handleChange = (event) => {
        const rawPosition = parseFloat(event.target.value);
        const snappedPosition = findClosestAllowedPosition(rawPosition, min, max);
        const adjustedPosition = (snappedPosition - 10) / 0.9;
        const newValue = positionToValue(adjustedPosition);
        setPosition(snappedPosition);
        setValue(newValue);
        onChange(newValue);
    };

    const pos1GB = valueToPosition(1) * 0.9 + 10;
    const pos2GB = valueToPosition(2) * 0.9 + 10;

    // Determine thumb color based on position
    const getThumbColor = () => {
        if (position <= pos1GB) return '#1e40af';  // dark blue
        if (position <= pos2GB) return '#2563eb';  // medium blue
        return '#60a5fa';  // light blue
    };

    return (
        <div className="w-full relative">
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={position}
                onChange={handleChange}
                className="w-full h-2 appearance-none rounded-full outline-none accent-blue-500"
                style={{
                    background: `linear-gradient(to right, 
                        #1e40af 0%, #1e40af ${pos1GB}%, 
                        #2563eb ${pos1GB}%, #2563eb ${pos2GB}%, 
                        #60a5fa ${pos2GB}%, #60a5fa 100%)`,
                    '--thumb-color': getThumbColor(),
                }}
                // Add these CSS classes for thumb styling
                className="w-full h-2 appearance-none rounded-full outline-none accent-blue-500 
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[var(--thumb-color)]
                    [&::-moz-range-thumb]:appearance-none
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[var(--thumb-color)]
                    [&::-moz-range-thumb]:border-0"
            />
        </div>
    );
} 