import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import LayoutProvider from '@theme/Layout/Provider';
import LandingHeader from './LandingHeader';
import Footer from './Footer';
import RadialBlur from './RadialBlur';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Play, Code, ChevronRight, ChevronDown, FileCode, Folder, Github, Copy, Check } from 'lucide-react';
import { Example } from './examplesData';

interface ExampleLayoutProps {
	example: Example;
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
					<div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
						<div className="p-3 border-b border-gray-200 dark:border-gray-700">
							<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Repository
							</p>
						</div>
						<div className="py-1">
							<button
								onClick={handleCopy}
								className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
							>
								{copied ? (
									<Check className="w-4 h-4 text-green-500" />
								) : (
									<Copy className="w-4 h-4 text-gray-400" />
								)}
								{copied ? 'Copied!' : 'Copy git clone command'}
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

interface FileTreeItem {
	name: string;
	type: 'file' | 'folder';
	children?: FileTreeItem[];
	active?: boolean;
}

const mockFileTree: FileTreeItem[] = [
	{
		name: 'src',
		type: 'folder',
		children: [
			{
				name: 'components',
				type: 'folder',
				children: [
					{ name: 'ChatInterface.tsx', type: 'file' },
					{ name: 'MessageList.tsx', type: 'file' },
					{ name: 'InputArea.tsx', type: 'file' },
				],
			},
			{
				name: 'hooks',
				type: 'folder',
				children: [
					{ name: 'useAgent.ts', type: 'file', active: true },
					{ name: 'useMessages.ts', type: 'file' },
				],
			},
			{ name: 'App.tsx', type: 'file' },
			{ name: 'index.tsx', type: 'file' },
		],
	},
	{
		name: 'windmill',
		type: 'folder',
		children: [
			{ name: 'agent.flow.yaml', type: 'file' },
			{ name: 'process_message.ts', type: 'file' },
			{ name: 'call_llm.ts', type: 'file' },
		],
	},
];

const mockCode = `import { useState, useCallback } from 'react';
import * as wmill from 'windmill-client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call Windmill flow to process the message
      const result = await wmill.runScript({
        path: 'f/examples/ai_agent/process_message',
        args: {
          message: content,
          history: messages,
        },
      });

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to process message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, sendMessage, isLoading };
}`;

function FileTreeNode({ item, depth = 0 }: { item: FileTreeItem; depth?: number }) {
	const [isOpen, setIsOpen] = useState(true);
	const isFolder = item.type === 'folder';

	return (
		<div>
			<div
				className={`flex items-center gap-1 py-1 px-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
					item.active ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
				}`}
				style={{ paddingLeft: `${depth * 12 + 8}px` }}
				onClick={() => isFolder && setIsOpen(!isOpen)}
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
						<FileTreeNode key={index} item={child} depth={depth + 1} />
					))}
				</div>
			)}
		</div>
	);
}

function MockCodeEditor() {
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
					{mockFileTree.map((item, index) => (
						<FileTreeNode key={index} item={item} />
					))}
				</div>
			</div>

			{/* Code editor */}
			<div className="flex-1 overflow-auto">
				{/* File tab */}
				<div className="flex items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
					<div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
						<FileCode className="w-4 h-4 text-blue-500" />
						<span className="text-sm text-gray-700 dark:text-gray-300">useAgent.ts</span>
					</div>
				</div>

				{/* Code content */}
				<div className="p-4 font-mono text-sm">
					<pre className="text-gray-800 dark:text-gray-200 leading-relaxed">
						<code>
							{mockCode.split('\n').map((line, index) => (
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
			</div>
		</div>
	);
}

function highlightCode(line: string): string {
	return line
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/(import|from|export|function|const|let|var|return|try|catch|finally|async|await|interface|type)/g, '<span class="text-purple-600 dark:text-purple-400">$1</span>')
		.replace(/('.*?'|".*?"|`.*?`)/g, '<span class="text-green-600 dark:text-green-400">$1</span>')
		.replace(/\b(true|false|null|undefined|new)\b/g, '<span class="text-orange-600 dark:text-orange-400">$1</span>')
		.replace(/(\/\/.*$)/g, '<span class="text-gray-400 dark:text-gray-500">$1</span>')
		.replace(/\b(\d+)\b/g, '<span class="text-blue-600 dark:text-blue-400">$1</span>');
}


export default function ExampleLayout({ example }: ExampleLayoutProps) {
	const { title, description, iframeUrl, repoUrl, builtWith } = example;
	const [activeView, setActiveView] = useState<'app' | 'code'>('app');

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<Head>
					<title>{title} | Examples | Windmill</title>
					<meta name="title" content={`${title} | Examples | Windmill`} />
					<meta name="description" content={description} />
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<LandingHeader />
				<RadialBlur />

				<div className="pt-32 min-h-screen">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
						{/* Back link */}
						<Link
							href="/examples"
							className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8 !no-underline"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to examples
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
									Try Windmill
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
								<div className="relative" style={{ height: '70vh', minHeight: '500px' }}>
									{activeView === 'app' ? (
										iframeUrl ? (
											<iframe
												src={iframeUrl}
												className="w-full h-full border-0"
												title={`${title} - App`}
												allow="clipboard-read; clipboard-write"
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
										)
									) : (
										<MockCodeEditor />
									)}
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
