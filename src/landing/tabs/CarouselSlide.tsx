import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import FeatureCard from '../FeatureCard';
import { useInView } from 'react-intersection-observer';

export default function TabContent({ data, color }) {
	const { ref, inView, entry } = useInView({
		threshold: 0
	});

	const [selectedIndex, setSelectedIndex] = useState(0);
	let timeout = null;
	useEffect(() => {
		timeout = setTimeout(
			() => {},
			data[selectedIndex].video ? data[selectedIndex].video.videoLength * 1000 : 20000
		);
	}, [selectedIndex]);

	function onSelect(index: number) {
		clearTimeout(timeout);
		setSelectedIndex(index);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full " ref={ref}>
			<div className="w-full h-full flex flex-col gap-4 justify-start col-span-2 lg:col-span-1 ">
				{data.map((item, index: number) => (
					<button onClick={() => onSelect(index)} key={index}>
						<FeatureCard
							title={item.title}
							color={color}
							Icon={item.icon}
							index={index}
							selected={index === selectedIndex}
							description={item.description}
						/>
					</button>
				))}
			</div>

			<div className="col-span-2 relative h-full flex items-center w-full ">
				<AnimatePresence mode="sync">
					<motion.div
						key={selectedIndex}
						initial={{ opacity: 0, scale: 0.9, width: '100%' }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9, position: 'absolute' }}
					>
						<CarouselSlide data={data[selectedIndex]} />
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}

function CarouselSlide({ data }) {
	return <p>t</p>;
}
