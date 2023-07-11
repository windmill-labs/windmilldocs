import React from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }) {
	// Temporary fix for:
	// https://github.com/facebook/docusaurus/issues/7986
	// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution-9

	const location = useLocation();
	const isDocs = location.pathname.includes('/docs/');
	const [hasMounted, setHasMounted] = React.useState(isDocs);

	React.useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <>{children}</>;
}
