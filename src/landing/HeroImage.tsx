import React from 'react';

interface HeroImageProps {
	imageSrc: string;
	imageAlt?: string;
}

export default function HeroImage({ imageSrc, imageAlt = '' }: HeroImageProps) {
	return (
		<div className="w-full overflow-hidden">
			<div className="mx-auto max-w-7xl px-2 lg:px-8">
				<div className="relative w-full" style={{ aspectRatio: '16/9' }}>
					<img
						src={imageSrc}
						alt={imageAlt}
						className="w-full h-full object-cover rounded-md"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	);
}
