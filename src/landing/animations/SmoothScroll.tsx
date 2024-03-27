import { useTransform, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import ScrollContext from './ScrollContext';
import { flowScrollCount, scriptScrollCount, appScrollCount } from './useAnimateScroll';

export default function SmoothScrol({ children, skipped, skipDown, skipUp }) {
	const targetRef = useRef(null);
	const [hasReachedEnd, setHasReachedEnd] = useState(false);
	const { scrollYProgress } = useScroll({
		target: targetRef
	});

	const calculateAdjustedRange = () => {
		const totalScrollCount = scriptScrollCount + flowScrollCount + appScrollCount;

		return [0, totalScrollCount];
	};

	const x = useTransform(scrollYProgress, [0, 1], calculateAdjustedRange());

	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange((value) => {
			if (value >= 0.95 && !hasReachedEnd) {
				setHasReachedEnd(true);
			}
		});
		return () => unsubscribe();
	}, [scrollYProgress, hasReachedEnd]);

	return (
		<ScrollContext.Provider value={x}>
			<section
				ref={targetRef}
				className="relative max-w-7xl px-6 lg:px-8 mx-auto w-full"
				style={{
					height: 15000
				}}
			>
				<div
					className="sticky"
					style={{
						top: (window.innerHeight - 800) / 2
					}}
				>
					<div className="h-[800px] w-full">{children} </div>
				</div>
			</section>
		</ScrollContext.Provider>
	);
}
