import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import RedoAnimText from './RedoAnimText';
import CursorBlinker from './CursorBlinker';
import React from 'react';

export interface IAnimTextProps {
	delay: number;
	texts: string[];
}

export default function AnimText({ delay, texts }: IAnimTextProps) {
	const [done, setDone] = useState(false);
	const baseText = '';
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const displayText = useTransform(rounded, (latest) => baseText.slice(0, latest));

	useEffect(() => {
		const controls = animate(count, baseText.length, {
			type: 'tween',
			delay: delay,
			duration: 1,
			ease: 'easeInOut',

			onComplete: () => {
				setDone(true);
			}
		});
		return controls.stop;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<motion.span>{displayText}</motion.span>
			<RedoAnimText delay={delay + 1} texts={texts} />
			{!done && <CursorBlinker />}
		</>
	);
}
