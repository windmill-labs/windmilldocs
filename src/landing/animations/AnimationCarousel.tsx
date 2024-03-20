import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimationCarousel({ items, currentIndex }) {
	const itemWidth = 900;

	const initialOffsetX = -(currentIndex * itemWidth + currentIndex * 16);

	return (
		<div style={{ position: 'relative', height: '560px', overflow: 'hidden', width: '100%' }}>
			<AnimatePresence initial={false}>
				<motion.div
					key={currentIndex}
					animate={{ x: initialOffsetX }}
					transition={{
						x: { type: 'spring', stiffness: 300, damping: 30 }
					}}
					exit={{
						opacity: 0
					}}
					style={{
						display: 'flex',
						flexDirection: 'row',
						position: 'absolute'
					}}
				>
					{items.map((item, index) => (
						<div
							key={item.key}
							style={{
								width: `${itemWidth}px`,
								marginRight: 16,
								opacity: index === currentIndex ? 1 : 0.2
							}}
						>
							{item.content}
						</div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
