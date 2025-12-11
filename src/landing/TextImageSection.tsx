import React from 'react';
import classNames from 'classnames';
import { useLottie } from 'lottie-react';
import { ArrowRight } from 'lucide-react';
import Link from '@docusaurus/Link';

interface TextImageSectionProps {
	title: string;
	description: string;
	imageSrc?: string;
	imageAlt?: string;
	imagePosition?: 'left' | 'right';
	svgComponent?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
	lottieData?: unknown;
	autoplay?: boolean;
	loop?: boolean;
	chartComponent?: React.ComponentType;
	learnMoreUrl?: string;
}

export default function TextImageSection({
	title,
	description,
	imageSrc,
	imageAlt = '',
	imagePosition = 'right',
	svgComponent: SvgComponent,
	lottieData,
	autoplay = false,
	loop = true,
	chartComponent: ChartComponent,
	learnMoreUrl
}: TextImageSectionProps) {
	const isImageLeft = imagePosition === 'left';

	const lottieOptions = lottieData
		? {
				animationData: lottieData,
				loop: loop,
				autoplay: autoplay
		  }
		: null;
	const { View: LottieView } = lottieOptions ? useLottie(lottieOptions) : { View: null };

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
							<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
								{description}
							</p>
							{learnMoreUrl && (
								<Link
									to={learnMoreUrl}
									className="text-sm text-blue-600 dark:text-blue-400 flex flex-row items-center gap-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors !no-underline"
								>
									Learn more
									<ArrowRight size={20} />
								</Link>
							)}
						</div>

						{/* Image/Embed Section - 2/3 */}
						<div
							className={classNames(
								'lg:col-span-2',
								isImageLeft && 'lg:order-1'
							)}
						>
							{SvgComponent ? (
								<div className="flex justify-center !rounded-2xl overflow-hidden dark:bg-[#2e344033] bg-[#fbfbfb]">
									<SvgComponent className="scaled-svg" style={{ width: '90%', height: '90%' }} />
								</div>
							) : ChartComponent ? (
								<div className="w-full overflow-x-auto -mx-4 sm:mx-0">
									<div className="px-4 sm:px-0">
										<ChartComponent />
									</div>
								</div>
							) : lottieData && LottieView ? (
								<div className="rounded-lg overflow-hidden h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
									<div className="w-full h-full">{LottieView}</div>
								</div>
							) : (
								<div className="rounded-lg overflow-hidden">
									<img
										src={imageSrc}
										alt={imageAlt}
										className="w-full h-auto object-cover"
										loading="lazy"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
