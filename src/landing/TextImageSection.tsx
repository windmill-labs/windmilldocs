import React from 'react';
import classNames from 'classnames';

interface TextImageSectionProps {
	title: string;
	description: string;
	imageSrc: string;
	imageAlt?: string;
	imagePosition?: 'left' | 'right';
}

export default function TextImageSection({
	title,
	description,
	imageSrc,
	imageAlt = '',
	imagePosition = 'right'
}: TextImageSectionProps) {
	const isImageLeft = imagePosition === 'left';

	return (
		<div className="py-8 sm:py-8">
			<div className="mx-auto max-w-7xl px-2 lg:px-8">
				<div className="rounded-md bg-gray-50 dark:bg-gray-900 p-8 lg:p-12 shadow-sm">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center rounded-md">
						{/* Text Section - 1/3 */}
						<div
							className={classNames(
								'lg:col-span-1',
								isImageLeft && 'lg:order-2'
							)}
						>
							<h2 className="text-4xl sm:text-3xl font-normal tracking-tight leading-tight mb-4 text-gray-900 dark:text-white">
								{title}
							</h2>
							<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
								{description}
							</p>
						</div>

						{/* Image/Embed Section - 2/3 */}
						<div
							className={classNames(
								'lg:col-span-2',
								isImageLeft && 'lg:order-1'
							)}
						>
							<div className="rounded-lg overflow-hidden">
								<img
									src={imageSrc}
									alt={imageAlt}
									className="w-full h-auto object-cover"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
