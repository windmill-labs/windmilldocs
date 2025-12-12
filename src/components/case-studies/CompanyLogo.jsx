import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function CompanyLogo({ lightSrc, darkSrc, alt, className = 'h-24 w-auto object-contain mb-6' }) {
	const { colorMode } = useColorMode();
	return (
		<img
			src={colorMode === 'light' ? darkSrc : lightSrc}
			alt={alt}
			className={className}
		/>
	);
}
