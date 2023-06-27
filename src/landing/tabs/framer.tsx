import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tab } from './useTabs';

const transition = {
	type: 'tween',
	ease: 'easeOut',
	duration: 0.25
};

type Props = {
	selectedTabIndex: number;
	tabs: Tab[];
	setSelectedTab: (input: [number, number]) => void;
	color: 'blue' | 'teal' | 'orange' | 'slate';
};

const Tabs = ({ tabs, selectedTabIndex, setSelectedTab, color = 'blue' }: Props): JSX.Element => {
	const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>([]);

	const bgByColor = {
		blue: 'bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-white',
		teal: 'bg-teal-200 text-teal-800 dark:bg-teal-800 dark:text-white',
		orange: 'bg-orange-200 text-orange-800 dark:bg-orange-600 dark:text-white',
		slate: 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-white'
	};

	const bgLowByColor = {
		blue: 'bg-blue-100 dark:bg-blue-900/50',
		teal: 'bg-teal-100 dark:bg-teal-900',
		orange: 'bg-orange-100 dark:bg-orange-900',
		slate: 'bg-slate-100 dark:bg-slate-900'
	};

	const bgHighByColor = {
		blue: 'bg-blue-100 dark:bg-blue-900/50',
		teal: 'bg-teal-100 dark:bg-teal-800',
		orange: 'bg-orange-100 dark:bg-orange-800',
		slate: 'bg-slate-100 dark:bg-slate-800'
	};

	useEffect(() => {
		setButtonRefs((prev) => prev.slice(0, tabs.length));
	}, [tabs.length]);

	const navRef = useRef<HTMLDivElement>(null);
	const navRect = navRef.current?.getBoundingClientRect();
	const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();
	const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
	const hoveredRect = buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

	return (
		<nav
			ref={navRef}
			className="flex relative z-0 mt-4 py-2 gap-4 h-16"
			onPointerLeave={(e) => setHoveredTabIndex(null)}
		>
			{tabs.map((item, i) => {
				return (
					<motion.button
						key={i}
						className={classNames(
							'relative rounded-md font-semibold flex items-center px-4 z-20 cursor-pointer select-none transition-colors',

							selectedTabIndex === i
								? bgByColor[color]
								: 'text-gray-500 hover:text-gray-700 dark:text-white',
							'px-3 py-2 font-medium text-lg rounded-md flex flex-row gap-2'
						)}
						ref={(el) => (buttonRefs[i] = el)}
						onPointerEnter={() => {
							setHoveredTabIndex(i);
						}}
						onFocus={() => {
							setHoveredTabIndex(i);
						}}
						onClick={() => {
							setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
						}}
					>
						<item.icon className="w-5 h-5" aria-hidden="true" />

						{item.label}
					</motion.button>
				);
			})}
			<AnimatePresence>
				{hoveredRect && navRect && (
					<motion.div
						key={'hover'}
						className={classNames('absolute z-10 top-0 left-0 rounded-md', bgLowByColor[color])}
						initial={{
							x: hoveredRect.left - navRect.left,
							y: hoveredRect.top - navRect.top,
							width: hoveredRect.width,
							height: hoveredRect.height,
							opacity: 0
						}}
						animate={{
							x: hoveredRect.left - navRect.left,
							y: hoveredRect.top - navRect.top,
							width: hoveredRect.width,
							height: hoveredRect.height,
							opacity: 1
						}}
						exit={{
							x: hoveredRect.left - navRect.left,
							y: hoveredRect.top - navRect.top,
							width: hoveredRect.width,
							height: hoveredRect.height,
							opacity: 0
						}}
						transition={transition}
					/>
				)}
			</AnimatePresence>
			{selectedRect && navRect && (
				<motion.div
					className={classNames('absolute z-10 top-0 left-0 rounded-md ', bgHighByColor[color])}
					initial={false}
					animate={{
						width: selectedRect.width,
						height: selectedRect.height,

						x: selectedRect.left - navRect.left,
						y: selectedRect.top - navRect.top,
						opacity: 1
					}}
					exit={{
						x: selectedRect.left - navRect.left,
						y: selectedRect.top - navRect.top,
						width: selectedRect.width,
						height: selectedRect.height,
						opacity: 0
					}}
					transition={transition}
				/>
			)}
		</nav>
	);
};

const Content = ({
	children,
	selectedTabIndex,
	direction,
	width
}: {
	direction: number;
	selectedTabIndex: number;
	children: ReactNode;
	className?: string;
	width?: string;
}): JSX.Element => {
	return (
		<AnimatePresence custom={direction}>
			<motion.div
				className="flex flex-row w-full overflow-visible"
				key={selectedTabIndex}
				variants={{
					enter: (direction) => ({
						opacity: 0,
						x: direction > 0 ? 32 : -32,
						width
					}),
					center: {
						opacity: 1,
						x: 0,
						width
					},
					exit: (direction) => ({
						opacity: 0,
						x: direction > 0 ? -32 : 32,
						position: 'absolute',
						width
					})
				}}
				transition={{ duration: 0.25 }}
				initial={'enter'}
				animate={'center'}
				exit={'exit'}
				custom={direction}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export const Framer = { Tabs, Content };
