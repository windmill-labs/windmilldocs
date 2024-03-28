'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode | any;
};

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export default function Tabs({
	tabs: propTabs,
	containerClassName,
	activeTabClassName,
	tabClassName,
	contentClassName,
	activeStep
}: {
	tabs: Tab[];
	containerClassName?: string;
	activeTabClassName?: string;
	tabClassName?: string;
	contentClassName?: string;
	activeStep: number;
}) {
	const [active, setActive] = useState<Tab>(propTabs[0]);
	const [tabs, setTabs] = useState<Tab[]>(propTabs);

	useEffect(() => moveSelectedTabToTop(activeStep), [activeStep]);

	const moveSelectedTabToTop = (idx: number) => {
		const newTabs = [...propTabs];
		const selectedTab = newTabs.splice(idx, 1);
		newTabs.unshift(selectedTab[0]);
		setTabs(newTabs);
		setActive(newTabs[0]);
	};

	const [hovering, setHovering] = useState(false);

	return (
		<>
			<FadeInDiv
				tabs={tabs}
				active={active}
				key={active.value}
				hovering={hovering}
				className={cn(contentClassName)}
			/>
		</>
	);
}

export const FadeInDiv = ({
	className,
	tabs,
	hovering
}: {
	className?: string;
	key?: string;
	tabs: Tab[];
	active: Tab;
	hovering?: boolean;
}) => {
	const isActive = (tab: Tab) => {
		return tab.value === tabs[0].value;
	};
	return (
		<div className="relative w-full h-full">
			{tabs.map((tab, idx) => (
				<motion.div
					key={tab.value}
					layoutId={tab.value}
					style={{
						scale: 1 - idx * 0.1,
						top: hovering ? idx * -50 : 0,
						zIndex: -idx,
						opacity: idx < 3 ? 1 - idx * 0.1 : 0
					}}
					animate={{
						y: isActive(tab) ? [0, 40, 0] : 0
					}}
					className={cn('w-full absolute top-0 left-0', className)}
				>
					{tab.content}
				</motion.div>
			))}
		</div>
	);
};
