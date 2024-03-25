import React, { useEffect, useContext, useRef, useState } from 'react';
import ScrollContext from './ScrollContext';

export default function useAnimateScroll(
	active: boolean,
	steps: any[],
	maxQuantity: number,
	offset = 0
) {
	const x = useContext(ScrollContext);
	const triggeredStepsRef = useRef([]);
	const lastScrollRef = useRef(0);
	const [progress, setProgress] = useState(0);
	const debounceTimerRef = useRef(null);

	function debounce(func: () => void, delay: number) {
		if (debounceTimerRef.current !== null) {
			clearTimeout(debounceTimerRef.current);
		}
		debounceTimerRef.current = setTimeout(func, delay);
	}

	useEffect(() => {
		if (!active) return;

		const handler = () => {
			const latestAsNumber = x.getPrevious() - offset; // Assuming x.value is your latest scroll position
			setProgress(latestAsNumber);

			// Determine scroll direction
			const scrollingDown = latestAsNumber > lastScrollRef.current;

			// Update last scroll position
			lastScrollRef.current = latestAsNumber;

			if (scrollingDown) {
				// Handle scrolling down (trigger callbacks)
				steps.forEach((step, index) => {
					const stepScroll = (step.scroll * maxQuantity) / 100;
					if (latestAsNumber >= stepScroll && !triggeredStepsRef.current.includes(index)) {
						step.callback();
						triggeredStepsRef.current.push(index);
					}
				});
			} else {
				// Handle scrolling up (trigger rollbacks)
				for (let i = steps.length - 1; i >= 0; i--) {
					const step = steps[i];
					const stepScroll = (step.scroll * maxQuantity) / 100;

					if (latestAsNumber < stepScroll && triggeredStepsRef.current.includes(i)) {
						if (step.rollback) step.rollback();
						triggeredStepsRef.current = triggeredStepsRef.current.filter((index) => index !== i);
					}
				}
			}
		};

		const debouncedHandler = () => debounce(handler, 20);

		x.onChange(debouncedHandler);
	}, [active, steps, x, offset]); // Only re-run effect if these values change

	return { progress };
}

const scriptScrollCount = 4000;
const flowScrollCount = 4000;
const appScrollCount = 2000;

export { scriptScrollCount, flowScrollCount, appScrollCount };
