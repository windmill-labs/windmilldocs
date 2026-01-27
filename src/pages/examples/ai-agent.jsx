import React from 'react';
import ExampleLayout from '../../landing/ExampleLayout';

export default function AIAgentExample() {
	return (
		<ExampleLayout
			title="AI Agent"
			description="An AI-powered agent built with Windmill that can interact with your data, answer questions, and automate tasks. This example demonstrates how to combine LLM capabilities with Windmill's workflow engine to create intelligent automation."
			iframeUrl="" // Placeholder - replace with actual Windmill app URL
		>
			<div className="space-y-4">
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Features
					</h3>
					<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
						<li>Natural language processing</li>
						<li>Context-aware responses</li>
						<li>Integration with external APIs</li>
						<li>Conversation history</li>
					</ul>
				</div>
				<div>
					<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
						Built with
					</h3>
					<div className="flex flex-wrap gap-2">
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							React
						</span>
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							OpenAI
						</span>
						<span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
							Windmill
						</span>
					</div>
				</div>
			</div>
		</ExampleLayout>
	);
}
