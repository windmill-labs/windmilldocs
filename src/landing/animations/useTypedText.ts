import React, { useState, useEffect, useCallback } from 'react';

export default function useTypewriter({ sourceText, targetText }) {
	const [currentText, setCurrentText] = useState(sourceText);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const play = useCallback(() => {
		setIsPlaying(true);
		// Initialize currentIndex based on the first differing character
		// This logic remains the same but will consider line returns as part of the comparison
		const diffIndex = [...sourceText].findIndex((char, index) => char !== targetText[index]);
		if (diffIndex !== -1) {
			setCurrentIndex(diffIndex);
		} else {
			setCurrentIndex(sourceText.length);
		}
	}, [sourceText, targetText]);

	useEffect(() => {
		if (!isPlaying) return;

		if (currentIndex >= targetText.length) {
			setIsPlaying(false);
			return; // Stop if we've reached the end of the targetText
		}

		const timeoutId = setTimeout(() => {
			// Update the current text by merging the unchanged part with the next character from targetText
			// This update considers line breaks by working with the full strings directly

			const newCurrentText =
				targetText.substring(0, currentIndex + 1) + sourceText.substring(currentIndex + 1);

			setCurrentText(newCurrentText);
			setCurrentIndex(currentIndex + 1);
		}, 10); // Delay between character updates

		return () => clearTimeout(timeoutId);
	}, [currentIndex, isPlaying, sourceText, targetText]);

	return { currentText, play };
}
