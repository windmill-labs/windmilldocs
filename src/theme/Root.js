import React, { useEffect } from 'react';

export default function Root({ children }) {
	let [loaded, setLoaded] = React.useState(false);

	useEffect(() => {
		const url = window.location.href;
		if (!url.includes('/docs/')) {
			document.documentElement.setAttribute('data-theme', 'light');
		}
		setLoaded(true);
	});

	if (!loaded) {
		return <div />;
	}

	return <>{children}</>;
}
