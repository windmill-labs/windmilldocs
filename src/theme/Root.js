import React, { useEffect } from 'react';

// Default implementation, that you can customize
export default function Root({ children }) {
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', 'light');
	});
	return <>{children}</>;
}
