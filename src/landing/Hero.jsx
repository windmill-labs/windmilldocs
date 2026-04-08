import React, { useState } from 'react';
import GithubStarCount from './GithubStarCount';
import RadialBlur from './RadialBlur';
import HomescreenSvg from '../../static/homescreen.svg';
import Link from '@docusaurus/Link';
import { Copy, Check } from 'lucide-react';
import HeroCTAButtons from '../components/products/HeroCTAButtons';

function CliSnippet() {
	const cmd = 'npm install -g windmill-cli';
	const [copied, setCopied] = useState(false);
	const copy = () => {
		navigator.clipboard.writeText(cmd);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	return (
		<div className="mt-6 inline-flex items-center gap-3 rounded-md border border-gray-700 dark:border-gray-600 bg-gray-900/50 dark:bg-white/5 px-4 py-2.5 font-mono text-sm">
			<span className="text-gray-500 dark:text-gray-400">$</span>
			<span className="text-blue-400">{cmd}</span>
			<button onClick={copy} className="p-0.5 ml-1">
				{copied
					? <Check className="w-3.5 h-3.5 text-blue-400" />
					: <Copy className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 transition-colors" />
				}
			</button>
		</div>
	);
}

export default function Hero() {

	return (
		<div className="relative rounded-none mx-auto max-w-screen-2xl overflow-hidden 2xl:rounded-3xl pt-32">
			<RadialBlur />

			<div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 max-w-7xl px-8 mx-auto py-16">
				<div>
					<div className="flex flex-row items-end gap-8">
						<GithubStarCount />
					</div>
					<h1 className="mt-4 !text-4xl text-slate-750 !tracking-tight !font-semibold sm:!text-6xl">
						Code-first orchestration platform for{' '}
						<span className="text-blue-500 dark:text-blue-450">
							enterprises
						</span>
					</h1>
					<div className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-100">
						Built for teams to create and share their internal software. Loved by engineers for full code flexibility and control over their infrastructure.
					</div>
					<div className="mt-8 flex flex-col gap-3">
						<div className="flex items-center gap-3 text-base text-gray-600 dark:text-gray-100">
							<span className="text-blue-500 font-bold">✓</span>
							<span><span className="text-blue-500">Open-source</span> and easy to <Link to="/platform/self-host" className="underline">self-host</Link></span>
						</div>
						<div className="flex items-center gap-3 text-base text-gray-600 dark:text-gray-100">
							<span className="text-blue-500 font-bold">✓</span>
							<span>Workflows, internal apps and data pipelines in one platform</span>
						</div>
						<div className="flex items-center gap-3 text-base text-gray-600 dark:text-gray-100">
							<span className="text-blue-500 font-bold">✓</span>
							<span>Full flexibility of code and Git-based collaboration</span>
						</div>
						<div className="flex items-center gap-3 text-base text-gray-600 dark:text-gray-100">
							<span className="text-blue-500 font-bold">✓</span>
							<span>Zero-ops infra powered by the{' '}
								<Link 
									href="/docs/misc/benchmarks/competitors"
									className="underline"
								>
									fastest job orchestrator and workflow engine
								</Link>
							</span>
						</div>
					</div>
					<div className="mt-10">
						<HeroCTAButtons />
					</div>
					{/* <CliSnippet /> */}
				</div>
				<div>
					<div className="flex  justify-center !rounded-2xl overflow-hidden dark:bg-[#2e344033] bg-[#fbfbfb]">
						<HomescreenSvg className="scaled-svg" style={{ width: '90%', height: '90%' }} />
					</div>
				</div>
			</div>
		</div>
	);
}
