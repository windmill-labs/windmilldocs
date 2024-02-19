import React from 'react';
import LandingSection from './LandingSection';
import { motion } from 'framer-motion';
export default function ScriptSection() {
	return (
		<LandingSection bgClass="">
			<div className="w-full gap-8 flex flex-col">
				<div className="text-4xl font-medium text-blue-950">Scripts</div>
				<div className="text-lg text-gray-600">Code to production in minutes</div>
				<div className="grid grid-cols-2 gap-8">
					<motion.div
						className="bg-blue-100/40 dark:bg-blue-500/20 p-8 rounded-lg h-[400px] overflow-hidden"
						initial={{ opacity: 0, y: 32 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeIn' }}
					>
						<div className="font-medium text-xl mb-4 text-blue-950">Windmill Smart IDE</div>
						<div className="text-sm mb-4">
							From LSP support to AI code generation, Windmill provides a powerful IDE for your
							scripts.
						</div>

						<img src="/images/script-1.png" alt="Web IDE" className="rounded-lg shadow-md" />
					</motion.div>
					<motion.div
						className="bg-blue-100/40 dark:bg-blue-500/20 p-8 rounded-lg h-[400px] overflow-hidden"
						initial={{ opacity: 0, y: 64 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeIn' }}
					>
						<div className="font-medium text-xl mb-4">Polyglott</div>
						<div className="text-sm mb-4">
							From Typescript to Python, Windmill supports a wide range of languages. Dependencies
							are automatically managed.
						</div>
						<img src="/images/script-2.png" alt="Web IDE" className="rounded-lg shadow-md" />
					</motion.div>
					<motion.div
						className="bg-blue-100/40 dark:bg-blue-500/20 p-8 rounded-lg h-[400px] overflow-hidden"
						initial={{ opacity: 0, y: 64 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeIn' }}
					>
						<div className="font-medium text-xl mb-4">Resources and variables</div>
						<div className="text-sm mb-4">
							Easily share third-party API keys and other sensitive data with your team.
						</div>
					</motion.div>

					<motion.div
						className="bg-blue-100/40 dark:bg-blue-500/20 p-8 rounded-lg h-[400px] overflow-hidden"
						initial={{ opacity: 0, y: 96 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeIn' }}
					>
						<div className="font-medium text-xl mb-4">Triggers</div>
						<div className="text-sm mb-4">
							Trigger scripts from webhooks, schedules, CLI, Slack, and more.
						</div>
						<img src="/images/script-1.png" alt="Web IDE" className="rounded-lg shadow-md" />
					</motion.div>
					<div className="bg-blue-100/40 dark:bg-blue-500/20 p-8 rounded-lg h-[360px] overflow-hidden col-span-2">
						<div className="font-medium text-xl mb-4">Developer first</div>
						<div className="text-sm mb-4 max-w-xl">
							Develop scripts locally with your favorite code editor, preview them locally and
							deploy them with the CLI, sync them with Git. VS Code extension available.
						</div>
						<div className="grid grid-cols-3 gap-4">
							<img src="/images/script-1.png" alt="Web IDE" className="rounded-lg shadow-md" />

							<img src="/images/script-1.png" alt="Web IDE" className="rounded-lg shadow-md" />
							<img src="/images/script-1.png" alt="Web IDE" className="rounded-lg shadow-md" />
						</div>
					</div>
				</div>
			</div>
		</LandingSection>
	);
}
