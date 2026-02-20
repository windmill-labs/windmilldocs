import React from 'react';
import { useLottie } from 'lottie-react';

export default function StaticLottie({ animationData }) {
	const { View, goToAndStop, getDuration } = useLottie({
		animationData,
		loop: false,
		autoplay: false,
	});

	React.useEffect(() => {
		const totalFrames = getDuration(true);
		if (totalFrames > 0) {
			goToAndStop(Math.floor(totalFrames * 0.90), true);
		}
	}, [goToAndStop, getDuration]);

	return View;
}
