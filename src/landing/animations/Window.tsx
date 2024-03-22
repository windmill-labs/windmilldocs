import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type WindowProps = {
	name: string;
	icon: string;
	children: React.ReactNode;
	shouldRender: boolean;
	lightMode?: boolean;
};

export default function Window({ name, icon, children, shouldRender, lightMode }: WindowProps) {
	return (
		<AnimatePresence mode="popLayout" initial={false}>
			{shouldRender && (
				<motion.div
					initial={{ opacity: 0, y: '-20px' }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: '20px' }}
					transition={{ delay: 0.2 }}
					className={twMerge(
						'border w-full h-[500px] shadow-2xl rounded-lg border-gray-950 overflow-hidden',
						lightMode ? 'bg-white' : 'bg-gray-900'
					)}
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
