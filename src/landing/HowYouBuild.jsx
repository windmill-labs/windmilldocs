import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import LazyVideo from '../components/products/LazyVideo';
import { Copy, Check } from 'lucide-react';

const videos = [
	{
		label: 'Windmill UI',
		src: '/img/platform/script-editor/platform-script-realtime-logs.webm',
		caption: 'Running a script on the Windmill UI',
	},
	{
		label: 'Local editor',
		src: '/img/platform/app-builder/platform-app-builder-local-dev.webm',
		caption: 'Building a full code app locally using the CLI and Claude Code',
	},
];

function CliSnippet() {
	const cmd = 'npm install -g windmill-cli';
	const [copied, setCopied] = useState(false);
	const copy = () => {
		navigator.clipboard.writeText(cmd);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	return (
		<div className="inline-flex items-center gap-3 rounded-lg bg-[#0d1117] px-4 py-2.5 font-mono text-sm">
			<span className="text-gray-500">$</span>
			<span className="text-blue-400">{cmd}</span>
			<button onClick={copy} className="p-0.5 ml-1 cursor-pointer" style={{ border: 'none', background: 'none' }}>
				{copied
					? <Check className="w-3.5 h-3.5 text-blue-400" />
					: <Copy className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 transition-colors" />
				}
			</button>
		</div>
	);
}

export default function HowYouBuild() {
	const [active, setActive] = useState(0);

	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Build from the Windmill UI or locally
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
						Windmill provides built-in <Link to="/platform/script-editor" className="text-blue-600 dark:text-blue-400 hover:underline">script editor</Link>, <Link to="/platform/flow-editor" className="text-blue-600 dark:text-blue-400 hover:underline">flow editor</Link> and <Link to="/platform/app-builder" className="text-blue-600 dark:text-blue-400 hover:underline">app builder</Link> to build directly from the browser.
					</p>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
						To <Link to="/platform/local-dev" className="text-blue-600 dark:text-blue-400 hover:underline">build locally</Link> with Claude Code or Codex, use the CLI and built-in AI skills. You can then deploy your work to your remote workspace with <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">wmill sync push</code>.
					</p>
					<CliSnippet />
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
						Self-hosting? <Link to="/platform/self-host" className="text-blue-600 dark:text-blue-400 hover:underline">Deploy on Docker first</Link>.
					</p>
				</div>
				<div>
					<div className="flex gap-1 mb-3">
						{videos.map((v, i) => (
							<button
								key={v.label}
								onClick={() => setActive(i)}
								className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
									i === active
										? 'bg-gray-900 dark:bg-[#0d1117] text-white'
										: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
								}`}
								style={{ border: 'none' }}
							>
								{v.label}
							</button>
						))}
					</div>
					<div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-gray-800">
						<LazyVideo
							key={videos[active].src}
							className="w-full h-full object-cover"
							src={videos[active].src}
							loop={false}
						/>
					</div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 text-center">
						{videos[active].caption}
					</p>
				</div>
			</div>
		</div>
	);
}
