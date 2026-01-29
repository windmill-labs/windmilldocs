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

interface FileTreeItem {
	name: string;
	type: 'file' | 'folder';
	children?: FileTreeItem[];
}

const fileTree: FileTreeItem[] = [
	{
		name: 'frontend',
		type: 'folder',
		children: [
			{ name: 'App.tsx', type: 'file' },
			{ name: 'index.tsx', type: 'file' },
			{ name: 'index.css', type: 'file' },
			{ name: 'wmill.ts', type: 'file' },
			{ name: 'package.json', type: 'file' },
		],
	},
	{
		name: 'backend',
		type: 'folder',
		children: [
			{ name: 'getMarketingActivations', type: 'file' },
			{ name: 'getSalesMetrics', type: 'file' },
		],
	},
];

const fileContents: Record<string, string> = {
	'App.tsx': `import React, { useState, useEffect, useRef } from 'react'
import { backend } from './wmill'
import './index.css'

type Message = { role: "user" | "assistant"; content: string; timestamp?: Date; toolsUsed?: string[] };

const SYSTEM_PROMPT = \`You are Boris, the internal AI assistant for Acme Corporation...

## Company Overview
- **Company Name**: Acme Corporation
- **CEO**: Sarah Johnson
- **Number of Employees**: 450+

## Key Contacts
- **HR Director**: Maria Garcia (maria.garcia@acme.com)
- **IT Support**: helpdesk@acme.com or ext. 5555

## Payroll & Compensation
- **Pay Schedule**: Bi-weekly, every other Friday
- **Annual Raises**: Performance reviews in March, raises effective April 1st

## Time Off & Leave
- **PTO Policy**: 20 days per year for all full-time employees
- **Sick Leave**: 10 days per year (separate from PTO)
- **Parental Leave**: 16 weeks paid for primary caregivers\`;

const SUGGESTIONS = [
  "When is payday?",
  "Who is in charge of HR?",
  "How many sales did we make this week?",
  "Which marketing campaign had the highest ROI?",
];

type Tool = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  backendMethod: string;
};

const TOOLS: Tool[] = [
  {
    id: 'get_sale_metrics',
    name: 'Sales Metrics',
    description: 'Triggers a script that gets sales metrics from the last 30 days',
    enabled: true,
    backendMethod: 'c',
  },
  {
    id: 'get_marketing_activations',
    name: 'Marketing Activations',
    description: 'Triggers a script that gets marketing activations from the last 30 days',
    enabled: true,
    backendMethod: 'b',
  },
];

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'context' | 'tools'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);

    try {
      const response = await backend.d({
        session_id: sessionId,
        message: userMessage,
        system_prompt: SYSTEM_PROMPT
      });
      const content = typeof response === 'string' ? response : response.content;
      const toolsUsed = response?.tool_calls as string[] | undefined;
      setMessages(prev => [...prev, { role: 'assistant', content, timestamp: new Date(), toolsUsed }]);
    } catch (e) {
      console.error('Failed to send message:', e);
    }
    setLoading(false);
  }

  return (
    <div className="chat-app">
      <div className="chat-container">
        <header className="chat-header">
          <div className="header-left">
            <div className="bot-avatar"><BotIcon /></div>
            <div className="header-info">
              <h1>Boris</h1>
              <span className="subtitle">AI Assistant</span>
            </div>
          </div>
        </header>

        <div className="tabs">
          <button className={\\\`tab \\\${activeTab === 'chat' ? 'active' : ''}\\\`} onClick={() => setActiveTab('chat')}>
            Chat
          </button>
          <button className={\\\`tab \\\${activeTab === 'context' ? 'active' : ''}\\\`} onClick={() => setActiveTab('context')}>
            Knowledge Base
          </button>
          <button className={\\\`tab \\\${activeTab === 'tools' ? 'active' : ''}\\\`} onClick={() => setActiveTab('tools')}>
            Tools
          </button>
        </div>

        {activeTab === 'chat' && (
          <main className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <h2>Hi, I'm Boris!</h2>
                <p>Ask me anything about your company</p>
                <div className="suggestions">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button key={idx} className="suggestion-btn" onClick={() => setInput(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg, idx) => (
                  <div key={idx} className={\\\`message-wrapper \\\${msg.role}\\\`}>
                    <div className="message-bubble">
                      <div className="message-content">{msg.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  )
}

export default App`,

	'index.tsx': `import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)`,

	'index.css': `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #18181b;
  --bg-main: #f8fafc;
  --bg-chat: #ffffff;
  --bg-user: #18181b;
  --bg-assistant: #f1f5f9;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border: #e2e8f0;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-main);
  color: var(--text-primary);
}

.chat-app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.chat-container {
  width: 100%;
  max-width: 1000px;
  height: calc(100vh - 40px);
  background: var(--bg-chat);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.bot-avatar {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--primary), #09090b);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}`,

	'wmill.ts': `// THIS FILE IS READ-ONLY
// GENERATED AUTOMATICALLY FROM YOUR RUNNABLES

export declare const backend: {
  sendAiMessage: (args: {}) => Promise<any>;
  getSalesMetrics: (args: {}) => Promise<any>;
  getMarketingActivations: (args: {}) => Promise<any>;
};

export declare const backendAsync: {
  sendAiMessage: (args: {}) => Promise<string>;
  getSalesMetrics: (args: {}) => Promise<string>;
  getMarketingActivations: (args: {}) => Promise<string>;
};

export type Job = {
  type: "QueuedJob" | "CompletedJob";
  id: string;
  created_at: number;
  started_at: number | undefined;
  duration_ms: number;
  success: boolean;
  args: any;
  result: any;
};

export declare function waitJob(id: string): Promise<Job>;
export declare function getJob(id: string): Promise<Job>;
export declare function streamJob(id: string, onUpdate?: (data: any) => void): Promise<any>;`,

	'package.json': `{
  "dependencies": {
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "windmill-client": "^1"
  },
  "devDependencies": {
    "@types/react-dom": "^19.0.0",
    "@types/react": "^19.0.0"
  }
}`,

	'getMarketingActivations': `// Returns marketing activations with dates, budgets, and reach
// Allows the AI to correlate marketing efforts with sales

export async function main() {
  const today = new Date();

  const campaigns = [
    { daysAgo: 28, name: "Monthly Newsletter", type: "email", budget: 500, reach: 15000 },
    { daysAgo: 25, name: "Instagram Ads", type: "social_media", budget: 1200, reach: 45000 },
    { daysAgo: 21, name: "Google Search Ads", type: "paid_search", budget: 800, reach: 8000 },
    { daysAgo: 17, name: "Influencer Partnership", type: "influencer", budget: 2000, reach: 120000 },
    { daysAgo: 14, name: "Flash Sale Newsletter", type: "email", budget: 300, reach: 18000 },
    { daysAgo: 10, name: "TikTok Campaign", type: "social_media", budget: 1500, reach: 85000 },
  ];

  return campaigns.map(c => ({
    date: new Date(today.getTime() - c.daysAgo * 86400000).toISOString().split('T')[0],
    name: c.name,
    type: c.type,
    budget: c.budget,
    reach: c.reach
  }));
}`,

	'getSalesMetrics': `// Give sales metrics, and allow you to manipulate them on specific date ranges.
// We use mock data to keep things simple for this example
// But you can can easily create a script that gets this data from your own database

export async function main() {
  const today = new Date();
  const results = [];

  // Sales values that create realistic patterns (weekends lower, some spikes for promotions)
  const baseSales = [1200, 850, 720, 1150, 1180, 1220, 1190, 3850, 3620, 3290,
                     1450, 1280, 890, 1100, 6420, 5890, 5240, 1520, 1380, 1050,
                     920, 1180, 1240, 1210, 1290, 1350, 1180, 1220, 1340, 1410];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    results.push({
      date: dateStr,
      sales: baseSales[29 - i]
    });
  }

  return results;
}`
};

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

function MockCodeEditor() {
	const [selectedFile, setSelectedFile] = useState('App.tsx');
	const code = fileContents[selectedFile] || '';

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

			{/* Code editor */}
			<div className="flex-1 overflow-auto">
				{/* File tab */}
				<div className="flex items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
					<div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
						<FileCode className="w-4 h-4 text-blue-500" />
						<span className="text-sm text-gray-700 dark:text-gray-300">{selectedFile}</span>
					</div>
				</div>

				{/* Code content */}
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
										<MockCodeEditor />
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
