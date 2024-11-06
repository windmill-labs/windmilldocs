import React, { useState, useEffect } from 'react';

function formatMemoryValue(value) {
    if (value < 1) {
        return `${Math.round(value * 1024)}MB`;
    }
    return `${value}GB`;
}

function getStepForRange(value) {
    if (value < 4) {
        return 0.512;
    } else if (value < 16) {
        return 2;
    }
    return 16;
}

function snapToNearestStep(value) {
    if (value < 4) {
        // Special handling for values approaching 2GB from above only
        if (value > 1.75 && value <= 2.512) {  // If we're approaching 2GB from above
            return 2;
        }
        // Snap to multiples of 0.512, but if we're close to 4, snap to 4
        if (value > 3.75) {  // If we're within ~0.25 of 4GB
            return 4;
        }
        return Math.round(value / 0.512) * 0.512;
    } else if (value < 16) {
        // Snap to multiples of 2
        return Math.round(value / 2) * 2;
    }
    // Snap to multiples of 16
    return Math.round(value / 16) * 16;
}

function valueToPosition(value, min, max) {
    // Convert the non-linear memory value to a linear position
    let position = 0;
    
    if (value <= 4) {
        // Linear scaling for 0-4GB range
        position = (value / 4) * 33.33;
    } else if (value <= 16) {
        // Linear scaling for 4-16GB range
        position = 33.33 + ((value - 4) / 12) * 33.33;
    } else {
        // Linear scaling for 16GB+ range
        position = 66.66 + ((value - 16) / (max - 16)) * 33.34;
    }
    
    return position;
}

function positionToValue(position, min, max) {
    // Convert the linear slider position to the non-linear memory value
    let value;
    if (position <= 33.33) {
        // 0.512-4GB range (changed from 0-4GB)
        value = Math.max(0.512, (position / 33.33) * 4);
    } else if (position <= 66.66) {
        // 4-16GB range
        value = 4 + ((position - 33.33) / 33.33) * 12;
    } else {
        // 16GB+ range
        value = 16 + ((position - 66.66) / 33.34) * (max - 16);
    }
    return snapToNearestStep(value);
}

function getAllowedValues(min, max) {
    const values = [];
    let current = min;
    while (current <= max) {
        values.push(current);
        current += getStepForRange(current);
    }
    return values;
}

function findClosestAllowedPosition(position, min, max) {
    const allowedValues = getAllowedValues(min, max);
    const positions = allowedValues.map(v => valueToPosition(v, min, max));
    return positions.reduce((prev, curr) => 
        Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    );
}

export default function MemorySlider({ min, max, defaultValue, onChange }) {
    const [value, setValue] = useState(defaultValue);
    const [position, setPosition] = useState(valueToPosition(defaultValue, min, max));

    useEffect(() => {
        setValue(defaultValue);
        setPosition(valueToPosition(defaultValue, min, max));
    }, [defaultValue, min, max]);

    const handleChange = (event) => {
        const rawPosition = parseFloat(event.target.value);
        const snappedPosition = findClosestAllowedPosition(rawPosition, min, max);
        const newValue = positionToValue(snappedPosition, min, max);
        setPosition(snappedPosition);
        setValue(newValue);
        onChange(newValue);
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
                className="w-full h-2 appearance-none bg-gray-300 rounded-full outline-none accent-blue-500"
                style={{
                    background: `linear-gradient(to right, blue 0%, blue ${position}%, #CBD5E0 ${position}%, #CBD5E0 100%)`
                }}
            />
        </div>
    );
} 