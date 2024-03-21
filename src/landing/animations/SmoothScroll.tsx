import { motion, useTransform, useScroll } from 'framer-motion';
import React, { Children, useRef } from 'react';
import ScrollContext from './ScrollContext';

const HorizontalScrollCarousel = ({ children }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef
	});

	const x = useTransform(scrollYProgress, [0, 1], [0, 6500]);

	return (
		<ScrollContext.Provider value={x}>
			<section
				ref={targetRef}
				className="relative max-w-7xl px-6 lg:px-8 mx-auto w-full h-[300vh] "
			>
				<div className="sticky top-0 flex h-screen items-center overflow-hidden">{children}</div>
			</section>
		</ScrollContext.Provider>
	);
};

export default HorizontalScrollCarousel;
