import React, { useRef, useEffect, useState } from 'react';

export default function LazyVideo({ src, className, loop = true }) {
	const ref = useRef(null);
	const [showControls, setShowControls] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.play().catch(() => {
						setShowControls(true);
					});
				} else {
					el.pause();
				}
			},
			{ threshold: 0.25 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<video
			ref={ref}
			className={className}
			loop={loop}
			muted
			playsInline
			preload="metadata"
			controls={showControls}
			src={src}
		/>
	);
}
