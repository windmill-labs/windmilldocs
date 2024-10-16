import { useTransform, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import ScrollContext from './ScrollContext';
import { flowScrollCount, scriptScrollCount, appScrollCount } from './useAnimateScroll';

export default function SmoothScrol({ children, onReachEnd, animationEnabled, count }) {
	const targetRef = useRef(null);
	const [hasReachedEnd, setHasReachedEnd] = useState(false);
	const { scrollYProgress } = useScroll({
		target: targetRef
	});

	useEffect(() => {
		if (animationEnabled && hasReachedEnd) {
			setHasReachedEnd(false);
		}
	}, [animationEnabled, hasReachedEnd]);

	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange((value) => {
			const coef = count === 1 ? 3 : 1;

			if (value * coef >= 0.999 && !hasReachedEnd) {
				setHasReachedEnd(true);
				onReachEnd();
				window.scrollTo({
					top: 0,
					behavior: 'instant'
				});

				window.scrollTo({
					top: targetRef.current.offsetTop,
					behavior: 'instant'
				});

				window.scrollTo({
					top: targetRef.current.offsetTop + 250,
					behavior: 'smooth'
				});
			}
		});
		return () => unsubscribe();
	}, [scrollYProgress, hasReachedEnd]);

	const calculateAdjustedRange = () => {
		const totalScrollCount = scriptScrollCount + flowScrollCount + appScrollCount;
		return [0, totalScrollCount];
	};

	const x = useTransform(scrollYProgress, [0, 1], calculateAdjustedRange());

	return (
		<ScrollContext.Provider value={x}>
			<section
				ref={targetRef}
				className="relative max-w-7xl px-4 lg:px-8 mx-auto w-full"
				style={{
					height: hasReachedEnd ? '100vh' : 5000 * count
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
