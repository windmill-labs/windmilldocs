import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import LayoutProvider from '@theme/Layout/Provider';
import LandingHeader from './LandingHeader';
import Footer from './Footer';
import RadialBlur from './RadialBlur';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Play, Code, ChevronRight, ChevronDown, FileCode, Folder, Github, Copy, Check } from 'lucide-react';
import { PublicApp } from './publicAppsData';
import { FileTreeItem, FlowStep } from './public-apps/types';

interface PublicAppLayoutProps {
	publicApp: PublicApp;
}

function GitHubDropdown({ repoUrl }: { repoUrl: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const cloneCommand = `git clone ${repoUrl}.git`;

	const handleCopy = () => {
		navigator.clipboard.writeText(cloneCommand);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
			setIsOpen(false);
		}, 1500);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
			>
				<Github className="w-4 h-4" />
				GitHub
				<ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
					<div className="absolute right-0 mt-2 w-max min-w-[280px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
						<div className="p-3 border-b border-gray-200 dark:border-gray-700">
							<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Repository
							</p>
						</div>
						<div className="py-1">
							<button
								onClick={handleCopy}
								className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
							>
								{copied ? (
									<Check className="w-4 h-4 text-green-500 flex-shrink-0" />
								) : (
									<Copy className="w-4 h-4 text-gray-400 flex-shrink-0" />
								)}
								<code className="text-xs text-gray-600 dark:text-gray-400 font-mono">
									{copied ? 'Copied!' : cloneCommand}
								</code>
							</button>
							<a
								href={repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
								onClick={() => setIsOpen(false)}
							>
								<ExternalLink className="w-4 h-4 text-gray-400" />
								Open in GitHub
							</a>
						</div>
					</div>
				</>
			)}
		</div>
	);
}


function FileTreeNode({
	item,
	depth = 0,
	selectedFile,
	onSelectFile
}: {
	item: FileTreeItem;
	depth?: number;
	selectedFile: string;
	onSelectFile: (name: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(true);
	const isFolder = item.type === 'folder';
	const isSelected = item.name === selectedFile;

	const handleClick = () => {
		if (isFolder) {
			setIsOpen(!isOpen);
		} else {
			onSelectFile(item.name);
		}
	};

	return (
		<div>
			<div
				className={`flex items-center gap-1 py-1 px-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
					isSelected ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
				}`}
				style={{ paddingLeft: `${depth * 12 + 8}px` }}
				onClick={handleClick}
			>
				{isFolder ? (
					<>
						{isOpen ? (
							<ChevronDown className="w-4 h-4 text-gray-400" />
						) : (
							<ChevronRight className="w-4 h-4 text-gray-400" />
						)}
						<Folder className="w-4 h-4 text-yellow-500" />
					</>
				) : (
					<>
						<span className="w-4" />
						<FileCode className="w-4 h-4 text-blue-500" />
					</>
				)}
				<span className="ml-1">{item.name}</span>
			</div>
			{isFolder && isOpen && item.children && (
				<div>
					{item.children.map((child, index) => (
						<FileTreeNode
							key={index}
							item={child}
							depth={depth + 1}
							selectedFile={selectedFile}
							onSelectFile={onSelectFile}
						/>
					))}
				</div>
			)}
		</div>
	);
}

function FlowStepBox({ step }: { step: FlowStep }) {
	if (step.type === 'input' || step.type === 'output') {
		return (
			<div className="px-20 py-3 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-lg font-medium">
				{step.label}
			</div>
		);
	}

	const iconClass = "w-6 h-6 flex-shrink-0";
	const Icon = step.type === 'ai' ? (
		<svg className={`${iconClass} text-violet-500`} viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5z"/>
		</svg>
	) : step.type === 'return' ? (
		<svg className={`${iconClass} text-blue-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<polyline points="14 2 14 8 20 8" />
		</svg>
	) : (
		<svg className={`${iconClass} text-blue-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
		</svg>
	);

	const isParallelScript = step.type === 'script' && !step.tag;

	return (
		<div className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-lg ${step.type === 'ai' ? 'border-l-4 border-l-violet-400' : ''} ${isParallelScript ? 'w-40 justify-center' : ''}`}>
			{Icon}
			<span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">{step.label}</span>
			{step.tag && (
				<span className={`ml-2 px-3 py-1 rounded-md text-sm font-medium ${step.type === 'ai' ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
					{step.tag}
				</span>
			)}
		</div>
	);
}

function FlowViewer({ steps, fileName, flowDescriptions }: { steps: FlowStep[]; fileName: string; flowDescriptions?: Record<string, string[]> }) {
	const description = flowDescriptions?.[fileName];

	return (
		<div className="h-full flex flex-col bg-gradient-to-br from-indigo-50/50 to-slate-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
			{/* Description */}
			{description && (
				<div className="px-6 py-4 bg-white/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 font-mono">
					{description.map((line, i) => (
						<p key={i} className="text-sm text-gray-500 dark:text-gray-400">{line}</p>
					))}
				</div>
			)}
			{/* Flow diagram */}
			<div className="flex-1 flex items-center justify-center">
				<div className="flex flex-col items-center">
				{steps.map((step, index) => (
					<React.Fragment key={step.id}>
						{/* Parallel steps */}
						{step.parallel ? (
							<div className="flex items-center gap-4">
								{step.parallel.map((pStep) => (
									<FlowStepBox key={pStep.id} step={pStep} />
								))}
							</div>
						) : (
							<FlowStepBox step={step} />
						)}
						{/* Connecting line */}
						{index < steps.length - 1 && (
							<div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
						)}
					</React.Fragment>
				))}
				</div>
			</div>
		</div>
	);
}

interface MockCodeEditorProps {
	fileTree: FileTreeItem[];
	fileContents: Record<string, string>;
	flowData?: Record<string, FlowStep[]>;
	flowDescriptions?: Record<string, string[]>;
}

function MockCodeEditor({ fileTree, fileContents, flowData, flowDescriptions }: MockCodeEditorProps) {
	const [selectedFile, setSelectedFile] = useState('App.tsx');
	const code = fileContents[selectedFile] || '';
	const isFlow = flowData && selectedFile in flowData;

	return (
		<div className="flex h-full bg-white dark:bg-gray-900">
			{/* File tree sidebar */}
			<div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-800">
				<div className="p-3 border-b border-gray-200 dark:border-gray-700">
					<span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
						Files
					</span>
				</div>
				<div className="py-2">
					{fileTree.map((item, index) => (
						<FileTreeNode
							key={index}
							item={item}
							selectedFile={selectedFile}
							onSelectFile={setSelectedFile}
						/>
					))}
				</div>
			</div>

			{/* Code editor / Flow viewer */}
			<div className="flex-1 overflow-auto">
				{/* Content - either flow or code */}
				{isFlow && flowData ? (
					<FlowViewer steps={flowData[selectedFile]} fileName={selectedFile} flowDescriptions={flowDescriptions} />
				) : (
					<div className="p-4 font-mono text-sm">
						<pre className="text-gray-800 dark:text-gray-200 leading-relaxed">
							<code>
								{code.split('\n').map((line, index) => (
									<div key={index} className="flex">
										<span className="w-8 text-right pr-4 text-gray-400 dark:text-gray-500 select-none">
											{index + 1}
										</span>
										<span
											dangerouslySetInnerHTML={{
												__html: highlightCode(line),
											}}
										/>
									</div>
								))}
							</code>
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}

function highlightCode(line: string): string {
	// Escape HTML first
	let result = line
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	// Use placeholders to avoid regex conflicts with class names
	const replacements: string[] = [];
	const placeholder = (content: string, className: string) => {
		const idx = replacements.length;
		replacements.push(`<span class="${className}">${content}</span>`);
		return `__HIGHLIGHT_${idx}__`;
	};

	// Process in order: comments, strings, keywords, booleans, numbers
	result = result.replace(/(\/\/.*$)/g, (match) => placeholder(match, 'text-gray-500'));
	result = result.replace(/('.*?'|".*?")/g, (match) => placeholder(match, 'text-green-600 dark:text-green-400'));
	result = result.replace(/\b(import|from|export|function|const|let|var|return|try|catch|finally|async|await|interface|type)\b/g, (match) => placeholder(match, 'text-purple-600 dark:text-purple-400'));
	result = result.replace(/\b(true|false|null|undefined|new)\b/g, (match) => placeholder(match, 'text-orange-600 dark:text-orange-400'));
	result = result.replace(/\b(\d+)\b/g, (match) => placeholder(match, 'text-blue-600 dark:text-blue-400'));

	// Replace placeholders with actual spans
	replacements.forEach((span, idx) => {
		result = result.replace(`__HIGHLIGHT_${idx}__`, span);
	});

	return result;
}


export default function PublicAppLayout({ publicApp }: PublicAppLayoutProps) {
	const { title, description, iframeUrl, repoUrl, builtWith, codeData } = publicApp;
	const [activeView, setActiveView] = useState<'app' | 'code'>('app');

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<Head>
					<title>{title} | Public Apps | Windmill</title>
					<meta name="title" content={`${title} | Public Apps | Windmill`} />
					<meta name="description" content={description} />
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<LandingHeader />
				<RadialBlur />

				<div className="pt-32 min-h-screen">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
						{/* Back link */}
						<Link
							href="/public-apps"
							className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8 !no-underline"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to public apps
						</Link>

						{/* Header section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							className="mb-8"
						>
							<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
								{title}
							</h1>
							<p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
								{description}
							</p>

							<div className="flex flex-wrap items-center gap-6">
								<div className="flex flex-wrap gap-2">
									{builtWith.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
								<Link
									href="https://app.windmill.dev/user/login"
									className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors no-underline text-sm"
								>
									Add to my workspace
								</Link>
							</div>
						</motion.div>

						{/* Iframe container */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.1 }}
						>
							<div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
								{/* App header bar */}
								<div className="bg-gray-900 px-4 py-3 flex items-center gap-3">
									<div className="flex gap-1.5">
										<div className="w-3 h-3 rounded-full bg-red-500" />
										<div className="w-3 h-3 rounded-full bg-yellow-500" />
										<div className="w-3 h-3 rounded-full bg-green-500" />
									</div>

									{/* View toggle */}
									<div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
										<button
											onClick={() => setActiveView('app')}
											className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
												activeView === 'app'
													? 'bg-gray-700 text-white'
													: 'text-gray-400 hover:text-gray-200'
											}`}
										>
											<Play className="w-3.5 h-3.5" />
											App
										</button>
										<button
											onClick={() => setActiveView('code')}
											className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
												activeView === 'code'
													? 'bg-gray-700 text-white'
													: 'text-gray-400 hover:text-gray-200'
											}`}
										>
											<Code className="w-3.5 h-3.5" />
											Code
										</button>
									</div>

									<div className="flex-1 text-center">
										<span className="text-sm text-gray-400">{title}</span>
									</div>
									{activeView === 'app' ? (
										<a
											href={iframeUrl || '#'}
											target="_blank"
											rel="noopener noreferrer"
											className={`inline-flex items-center gap-1.5 text-xs text-gray-400 transition-colors ${
												iframeUrl ? 'hover:text-white' : 'cursor-not-allowed'
											}`}
											onClick={(e) => !iframeUrl && e.preventDefault()}
										>
											Open in new tab
											<ExternalLink className="w-3.5 h-3.5" />
										</a>
									) : repoUrl ? (
										<GitHubDropdown repoUrl={repoUrl} />
									) : null}
								</div>

								{/* Content */}
								<div className="relative" style={{ height: '80vh', minHeight: '600px' }}>
									{/* App view */}
									<div className={`absolute inset-0 ${activeView === 'app' ? 'block' : 'hidden'}`}>
										{iframeUrl ? (
											<iframe
												src={iframeUrl}
												className="w-full h-full border-0"
												title={`${title} - App`}
												allow="clipboard-read; clipboard-write"
												tabIndex={-1}
												onLoad={() => window.scrollTo(0, 0)}
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
												<div className="text-center">
													<p className="text-gray-500 dark:text-gray-400 mb-2">
														App preview placeholder
													</p>
													<p className="text-sm text-gray-400 dark:text-gray-500">
														App URL will be configured here
													</p>
												</div>
											</div>
										)}
									</div>
									{/* Code view */}
									<div className={`absolute inset-0 ${activeView === 'code' ? 'block' : 'hidden'}`}>
										{codeData ? (
											<MockCodeEditor
												fileTree={codeData.fileTree}
												fileContents={codeData.fileContents}
												flowData={codeData.flowData}
												flowDescriptions={codeData.flowDescriptions}
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
												<p className="text-gray-500 dark:text-gray-400">
													No code data available for this example
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				<Footer />
			</main>
		</LayoutProvider>
	);
}
