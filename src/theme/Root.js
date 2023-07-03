import React from 'react';

export default function Root({ children }) {
	// Temporary fix for:
	// https://github.com/facebook/docusaurus/issues/7986
	// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution-9
	const [hasMounted, setHasMounted] = React.useState(false);

	React.useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <>{children}</>;
}
