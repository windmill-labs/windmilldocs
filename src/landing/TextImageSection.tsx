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
		<div className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="card card--large card--feature grid-cursor col-span-full row-span-full gap-y-0 max-lg:grid-rows-subgrid rounded-lg bg-gray-50 dark:bg-gray-900 p-8 lg:p-12">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
						{/* Text Section - 1/3 */}
						<div
							className={classNames(
								'lg:col-span-1',
								isImageLeft && 'lg:order-2'
							)}
						>
							<h2 className="text-4xl sm:text-5xl font-normal tracking-tight leading-tight mb-4 text-gray-900 dark:text-white">
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
