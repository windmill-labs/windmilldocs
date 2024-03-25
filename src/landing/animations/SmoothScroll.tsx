import { useTransform, useScroll } from 'framer-motion';
import React, { useRef } from 'react';
import ScrollContext from './ScrollContext';
import { flowScrollCount, scriptScrollCount, appScrollCount } from './useAnimateScroll';

const HorizontalScrollCarousel = ({ children }) => {
	const targetRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: targetRef
	});

	const calculateAdjustedRange = () => {
		const totalScrollCount = scriptScrollCount + flowScrollCount + appScrollCount;
		return [0, totalScrollCount];
	};

	const x = useTransform(scrollYProgress, [0, 1], calculateAdjustedRange());

	return (
		<ScrollContext.Provider value={x}>
			<section
				ref={targetRef}
				className="relative max-w-7xl px-6 lg:px-8 mx-auto w-full h-[10000px] "
			>
				<div className="sticky top-0 flex h-[1000px] mt items-center overflow-hidden">
					{children}
				</div>
			</section>
		</ScrollContext.Provider>
	);
};

export default HorizontalScrollCarousel;
