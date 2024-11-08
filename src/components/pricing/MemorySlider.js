import React, { useState, useEffect } from 'react';

const ALLOWED_VALUES = [1, 2, 4, 6, 8, 12, 14, 16, 32, 48, 64, 80, 96, 112, 128];
const POSITIONS = ALLOWED_VALUES.map((_, index) => index * (100 / (ALLOWED_VALUES.length - 1)));

function formatMemoryValue(value) {
    if (value < 1) {
        return '512MB';
    }
    return `${value % 1 === 0 ? value : value.toFixed(1)}GB`;
}

function getStepForRange(value) {
    if (value < 4) {
        return 1;
    } else if (value < 16) {
        return 2;
    }
    return 16;
}

function snapToNearestStep(value) {
    if (value < 4) {
        if (value < 1.5) return 1;
        if (value < 2.5) return 2;
        return 4;
    } else if (value < 16) {
        return Math.round(value / 2) * 2;
    }
    return Math.round(value / 16) * 16;
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
    
    if (Math.abs(position - 100) < 1) {
        return 100;
    }
    
    const closestPosition = positions.reduce((prev, curr) => 
        Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    );
    
    return closestPosition;
}

export default function MemorySlider({ min, max, defaultValue, onChange }) {
    const [value, setValue] = useState(defaultValue);
    const [position, setPosition] = useState(valueToPosition(defaultValue));

    useEffect(() => {
        setValue(defaultValue);
        setPosition(valueToPosition(defaultValue));
    }, [defaultValue, min, max]);

    const handleChange = (event) => {
        const rawPosition = parseFloat(event.target.value);
        const snappedPosition = findClosestAllowedPosition(rawPosition, min, max);
        const newValue = positionToValue(snappedPosition);
        setPosition(snappedPosition);
        setValue(newValue);
        onChange(newValue);
    };

    const pos2GB = valueToPosition(2);
    const pos4GB = valueToPosition(4);

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
                        rgb(29, 78, 216) 0%, rgb(29, 78, 216) ${pos2GB}%, 
                        rgb(59, 130, 246) ${pos2GB}%, rgb(59, 130, 246) ${pos4GB}%, 
                        rgb(191, 219, 254) ${pos4GB}%, rgb(191, 219, 254) 100%)`
                }}
            />
        </div>
    );
} 