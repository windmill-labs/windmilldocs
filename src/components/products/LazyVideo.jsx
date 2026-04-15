import React, { useRef, useEffect } from 'react';

export default function LazyVideo({ src, className, loop = true }) {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.play().catch(() => {});
				} else {
					el.pause();
				}
			},
			{ threshold: 1.0 }
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
			src={src}
		/>
	);
}
