import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Window({
	name,
	icon,
	children,
	shouldRender
}: {
	name: string;
	icon: string;
	children: React.ReactNode;
	shouldRender: boolean;
}) {
	return (
		<AnimatePresence mode="popLayout">
			{shouldRender && (
				<motion.div
					initial={{ opacity: 0, y: '-20px' }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: '20px' }}
					transition={{ delay: 0.5 }}
					className="bg-gray-900 border w-full h-[500px] shadow-2xl rounded-lg border-gray-950 overflow-hidden"
				>
					<div className="h-8 w-full border-b border-gray-950 bg-gray-900 px-2 py-1 flex flex-row items-center overflow-hidden text-gray-300 text-xs font-semibold gap-2">
						<img src={icon} alt={name} className="h-4 w-4" />
						{name}
					</div>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
