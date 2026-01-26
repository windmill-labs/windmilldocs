import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

interface FeaturedPerson {
	name: string;
	role: string;
	linkedin?: string;
	github?: string;
}

interface CaseStudySidebarProps {
	logo: {
		light: string;
		dark: string;
		alt: string;
	};
	industry: string;
	companySize: string;
	description: string;
	useCases: string[];
	selfHosted: boolean;
	workers: number;
	website: {
		url: string;
		label: string;
	};
	featuring: FeaturedPerson;
}

export default function CaseStudySidebar({
	logo,
	industry,
	companySize,
	description,
	useCases,
	selfHosted,
	workers,
	website,
	featuring
}: CaseStudySidebarProps) {
	return (
		<div className="lg:col-span-1">
			<div className="sticky top-32">
				<div className="mb-6">
					<CompanyLogo
						lightSrc={logo.light}
						darkSrc={logo.dark}
						alt={logo.alt}
					/>
				</div>
				<div className="space-y-6">
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							Industry
						</div>
						<div className="text-sm text-gray-900 dark:text-white">
							{industry}
						</div>
					</div>
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							Company Size
						</div>
						<div className="text-sm text-gray-900 dark:text-white">
							{companySize}
						</div>
					</div>
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							What they do
						</div>
						<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							{description}
						</div>
					</div>
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							What they do on Windmill
						</div>
						<div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							<div className="flex flex-wrap gap-2">
								{useCases.map((useCase, index) => (
									<span
										key={index}
										className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
									>
										{useCase}
									</span>
								))}
							</div>
						</div>
					</div>
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							Deployment
						</div>
						<div className="text-sm text-gray-900 dark:text-white">
							<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
								{selfHosted ? 'EE Self-hosted' : 'EE Cloud'}
							</span>
						</div>
					</div>
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							Workers
						</div>
						<div className="text-sm text-gray-900 dark:text-white">
							{workers}
						</div>
					</div>
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							Website
						</div>
						<a
							href={website.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline"
						>
							{website.label}
						</a>
					</div>
					<div>
						<div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
							Featuring
						</div>
						<div className="text-sm text-gray-900 dark:text-white inline-flex items-center gap-2">
							{featuring.name}
							{featuring.linkedin && (
								<a
									href={featuring.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
								>
									<Linkedin className="w-3 h-3" />
								</a>
							)}
							{featuring.github && (
								<a
									href={featuring.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
								>
									<Github className="w-3 h-3" />
								</a>
							)}
						</div>
						<div className="text-sm text-gray-700 dark:text-gray-300">
							{featuring.role}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
