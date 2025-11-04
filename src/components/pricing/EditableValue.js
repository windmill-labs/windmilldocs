import React, { useState, useRef, useEffect } from 'react';

/**
 * A discreet editable value component that looks like normal text
 * but becomes editable on hover/click
 */
export default function EditableValue({
	value,
	onChange,
	min = 0,
	max = Infinity,
	step = 1,
	formatDisplay = (val) => val.toLocaleString(),
	className = ""
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(value.toString());
	const inputRef = useRef(null);
	const spanRef = useRef(null);

	useEffect(() => {
		if (!isEditing) {
			setInputValue(value.toString());
		}
	}, [value, isEditing]);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.select();
			inputRef.current.focus();
		}
	}, [isEditing]);

	const handleClick = () => {
		setIsEditing(true);
	};

	const handleBlur = () => {
		setIsEditing(false);
		commitValue();
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			setIsEditing(false);
			commitValue();
			inputRef.current?.blur();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setIsEditing(false);
			setInputValue(value.toString());
			inputRef.current?.blur();
		}
	};

	const commitValue = () => {
		let newValue = parseFloat(inputValue);

		// Handle invalid input
		if (isNaN(newValue)) {
			setInputValue(value.toString());
			return;
		}

		// Clamp to min/max
		newValue = Math.max(min, Math.min(max, newValue));

		// Apply step if needed
		if (step > 1) {
			newValue = Math.round(newValue / step) * step;
		}

		// Update
		setInputValue(newValue.toString());
		if (newValue !== value) {
			onChange(newValue);
		}
	};

	if (isEditing) {
		return (
			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				className={`inline-block bg-transparent border-b border-blue-500 outline-none px-0 py-0 m-0 ${className}`}
				style={{
					width: `${Math.max(inputValue.length + 1, 2)}ch`,
					fontSize: 'inherit',
					fontWeight: 'inherit',
					fontFamily: 'inherit',
					lineHeight: 'inherit',
					color: 'inherit',
				}}
			/>
		);
	}

	return (
		<span
			ref={spanRef}
			onClick={handleClick}
			className={`cursor-text hover:border-b hover:border-dashed hover:border-gray-400 dark:hover:border-gray-500 inline-block ${className}`}
			title="Click to edit"
		>
			{formatDisplay(value)}
		</span>
	);
}
