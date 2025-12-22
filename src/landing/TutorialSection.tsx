import React from 'react';
import {
	Activity,
	GitCompareArrows,
	Server,
	ArrowRight
} from 'lucide-react';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import deployAtScale from '/illustrations/deploy_at_scale.json';
import { ArrowLongDownIcon } from '@heroicons/react/20/solid';

export default function TutorialSection() {
	const features = [
		{
			title: 'Build',
			description: 'Develop scripts locally with your favorite code editor, preview them locally and deploy them with the CLI, sync them with Git. Iterate quickly with our VS Code extension. From LSP support to AI code generation, Windmill provides a powerful IDE for your scripts.',
			icon: GitCompareArrows,
			href: '/docs/core_concepts/draft_and_deploy#diff-viewer',
			image: '/illustrations/diff.png',
			imageAlt: 'Build',
			mt: 'mt-24'
		},
		{
			title: 'Review',
			description: 'Use the built-in diff viewer, GitHub PRs or GitLab MRs to review changes.',
			icon: GitCompareArrows,
			href: '/docs/core_concepts/draft_and_deploy#diff-viewer',
			image: '/illustrations/diff.png',
			imageAlt: 'Review'
		},
		{
			title: 'Deploy at scale',
			description: 'Deploy with ease on our infrastructure or your own infrastructure, on bare VMs with docker-compose, ecs, or large Kubernetes clusters with up to 1000 workers and even remote agents.',
			icon: Server,
			href: '/docs/advanced/deploy_to_prod',
			lottieData: deployAtScale
		},
		{
			title: 'Monitor',
			description: 'Keep track of your scripts, flows, and apps with detailed logs and metrics.',
			icon: Activity,
			image: '/illustrations/11.png',
			imageAlt: 'Monitor'
		}
	];

	const ArrowSeparator = () => (
							<div className="h-20 w-full flex justify-center my-2 py-2">
								<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
							</div>
	);

	const FeatureCard = ({ feature, index }) => {
		const Icon = feature.icon;
		const ContentWrapper = feature.href ? 'a' : 'div';
		const wrapperProps = feature.href
			? {
					href: feature.href,
					target: '_blank',
					className:
						'col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center'
				}
			: {
					className: 'col-span-2 group text-black dark:text-white cursor-pointer flex flex-col justify-center'
				};

		return (
			<>
				<div
					className={`dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8 ${feature.mt || ''}`}
				>
					<ContentWrapper {...wrapperProps}>
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2">
							<Icon size={20} />
							{feature.title}
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{feature.description}
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</ContentWrapper>
					<div className="col-span-3">
						{feature.lottieData ? (
							<Lottie lottieData={feature.lottieData} autoplay loop />
						) : (
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
								<img src={feature.image} alt={feature.imageAlt || feature.title} />
						</div>
						)}
					</div>
				</div>
				{index < features.length - 1 && <ArrowSeparator />}
			</>
		);
	};

	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{features.map((feature, index) => (
					<FeatureCard key={feature.title} feature={feature} index={index} />
				))}
			</div>
		</div>
	);
}
