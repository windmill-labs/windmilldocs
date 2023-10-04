import React, { useState, useEffect } from 'react';

export default function useContainerDimensions(myRef: React.MutableRefObject<any>) {
	const [dimensions, setDimensions] = useState({ width: 0 });

	useEffect(() => {
		const getDimensions = () => ({
			width: myRef.current.offsetWidth
		});

		const handleResize = () => {
			setDimensions(getDimensions());
		};

		if (myRef.current) {
			setDimensions(getDimensions());
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [myRef]);

	return dimensions;
}
