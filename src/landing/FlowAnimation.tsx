import React, { useEffect, useMemo } from 'react';

import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AnimText from './animations/AnimText';
import Window from './animations/Window';
import { ChevronRight, GitBranch, Mail } from 'lucide-react';
import { SiGmail, SiSlack, SiStripe } from 'react-icons/si';
import useAnimateScroll from './animations/useAnimateScroll';
import ReactFlow, { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { twMerge } from 'tailwind-merge';

function Node({ data }) {
	return (
		<>
			<Handle type="target" position={Position.Top} />
			<div
				className={twMerge(
					'h-8 w-48  rounded-md flex items-center gap-4 justify-start px-4',
					data.color ? data.color : data.control ? 'bg-gray-950' : 'bg-gray-900'
				)}
			>
				{data.icon && <data.icon className="h-4 w-4" />}
				{data.label}
			</div>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	);
}

const xOffset = 25;
const initialY = 50;
const deltaY = 75;

const initialEdges = [
	{ id: '1-2', source: '1', target: '2' },
	{ id: '2-3', source: '2', target: '3' },
	{ id: '2-4', source: '2', target: '4' },
	{ id: '3-5', source: '3', target: '5' },
	{ id: '4-6', source: '4', target: '6' },
	{ id: '5-7', source: '5', target: '7' },
	{ id: '6-7', source: '6', target: '7' }
];

export default function FlowAnimation({ active }) {
	const [initialNodes, setInitialNodes] = React.useState<
		Array<{
			id: string;
			type: string;
			position: { x: number; y: number };
			data: { label: string; control: boolean; icon?: any; color?: string };
		}>
	>([
		{
			id: '1',
			type: 'textUpdater',
			position: { x: 100 + xOffset, y: initialY },
			data: { label: 'Input', control: true }
		},
		{
			id: '2',
			type: 'textUpdater',
			position: { x: 100 + xOffset, y: initialY + deltaY },
			data: { label: 'Run one branch', control: false, icon: GitBranch }
		},
		{
			id: '3',
			type: 'textUpdater',
			position: { x: xOffset, y: initialY + deltaY * 2 },
			data: { label: 'Default branch', control: true, icon: GitBranch }
		},
		{
			id: '4',
			type: 'textUpdater',
			position: { x: 200 + xOffset, y: initialY + deltaY * 2 },
			data: { label: 'Branch 1', control: true }
		},
		{
			id: '5',
			type: 'textUpdater',
			position: { x: xOffset, y: initialY + deltaY * 3 },
			data: { label: 'Send email', control: false, icon: Mail }
		},
		{
			id: '6',
			type: 'textUpdater',
			position: { x: 200 + xOffset, y: initialY + deltaY * 3 },
			data: { label: 'Send email', control: false, icon: Mail }
		},
		{
			id: '7',
			type: 'textUpdater',
			position: { x: 100 + xOffset, y: initialY + deltaY * 4 },
			data: { label: 'Result', control: true }
		}
	]);

	const [step, setStep] = React.useState(0);
	const [bgColor, setBgColor] = React.useState('black');
	const [scriptStep, setScriptStep] = React.useState(0);
	const nodeTypes = useMemo(() => ({ textUpdater: Node }), []);
	const steps = [
		{
			scroll: 500,
			callback: () => {
				setStep(1);
			},
			rollback: () => {
				setStep(0);
			}
		},
		{
			scroll: 1000,
			callback: () => {
				setStep(0);
			},
			rollback: () => {
				setStep(1);
			}
		},
		{
			scroll: 1500,
			callback: () => {
				setScriptStep(5);
			},
			rollback: () => {
				setScriptStep(0);
			}
		},
		{
			scroll: 1700,
			callback: () => {
				// modify the first node by adding the key color with value green
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 1 ? { ...node, data: { ...node.data, color: 'bg-green-600' } } : node
					)
				);
			},
			rollback: () => {
				setInitialNodes((nodes) =>
					// delete the key color from the first node
					nodes.map((node, i) =>
						i === 1 ? { ...node, data: { ...node.data, color: undefined } } : node
					)
				);
			}
		},
		{
			scroll: 1800,
			callback: () => {
				// modify the first node by adding the key color with value green
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 4 ? { ...node, data: { ...node.data, color: 'bg-green-600' } } : node
					)
				);
			},
			rollback: () => {
				setInitialNodes((nodes) =>
					// delete the key color from the first node
					nodes.map((node, i) =>
						i === 4 ? { ...node, data: { ...node.data, color: undefined } } : node
					)
				);
			}
		},
		{
			scroll: 1900,
			callback: () => {
				// modify the first node by adding the key color with value green
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 6 ? { ...node, data: { ...node.data, color: 'bg-green-600' } } : node
					)
				);
			},
			rollback: () => {
				setInitialNodes((nodes) =>
					// delete the key color from the first node
					nodes.map((node, i) =>
						i === 6 ? { ...node, data: { ...node.data, color: undefined } } : node
					)
				);
			}
		}
	];

	useAnimateScroll(active, steps, 2000);

	const currentText = `import Stripe from 'stripe';
			
type StripeResource = { token: string }
	
export async function main(
	resource: StripeResource, 
	charge: string,
	amount: number
) {
	const stripe = new Stripe(resource.token);

	try {
		const refund = await stripe.refunds.create({
			charge, amount
		});

		console.log('Refund created:', refund);
	} catch (error) {
		console.error('Error creating refund:', error);
	};
}`;

	return (
		<div className=" bg-gradient-to-br from-green-200 to-emerald-400 dark:from-green-500 dark:to-emerald-600 w-full rounded-lg p-6 shadow-inner overflow-hidden h-[550px]">
			<Window shouldRender={step === 0} name="Firefox" icon="/third_party_logos/firefox.svg">
				<div className="flex flex-row h-full relative">
					<div className="h-full border-r border-gray-950 bg-gray-900 px-2 py-1 flex flex-row items-start overflow-hidden text-gray-300 text-xs font-semibold gap-2">
						<img src="/img/windmill.svg" alt="Firefox" className="h-6 w-6" />
					</div>
					<div className={twMerge('flex flex-col w-full ', scriptStep >= 5 ? 'opacity-45' : '')}>
						<div className="text-sm p-1 border-b border-gray-950 flex flex-row items-center justify-between w-full h-10">
							<div>Path: f/folder/your_flow</div>
							<div className="flex flex-row gap-1 items-center">
								<button className="text-white rounded-md w-full text-lg bg-black px-2 py-0.5 h-full whitespace-nowrap">
									Test flow
								</button>
								<button className="text-white rounded-md w-full text-lg bg-black px-2 py-0.5 h-full whitespace-nowrap">
									Deploy
								</button>
							</div>
						</div>
						<div className="grid grid-cols-6 h-full w-full">
							<div className="col-span-3 !bg-gray-800 w-full border-r border-gray-900 relative h-full">
								<div className="flex justify-center items-center w-full h-full overflow-hidden">
									<ReactFlow
										nodes={initialNodes}
										edges={initialEdges}
										nodeTypes={nodeTypes}
										nodesDraggable={false}
										nodesConnectable={false}
										nodesFocusable={false}
										edgesFocusable={false}
										elementsSelectable={false}
										panOnDrag={false}
										zoomOnScroll={false}
									/>
								</div>
							</div>
							<div className="flex flex-col col-span-3 w-full">
								<SyntaxHighlighter
									language="javascript"
									style={dark}
									className="rounded-none text-sm h-1/2 !bg-gray-800 w-full !overflow-hidden"
									startingLineNumber
									showLineNumbers
								>
									{currentText}
								</SyntaxHighlighter>
								<div className="col-span-1 flex flex-col h-full w-full">
									<form className="p-2 h-64">
										<div>
											<motion.button
												className="text-white rounded-md px-2 py-0.5 h-8 text-md"
												animate={{ backgroundColor: bgColor }}
												transition={{ duration: 0.5 }}
											>
												Test this step
											</motion.button>
										</div>

										<label className="text-sm font-semibold">resource</label>
										<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
											u/user/stripe_resource
										</div>
										<label className="text-sm font-semibold">charge</label>
										<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
											CHE_1NirD82eZvKYlo2CIvbtLWuY
										</div>
										{scriptStep >= 2 && (
											<motion.div
												animate={{ opacity: 1 }}
												transition={{ duration: 0.5 }}
												initial={{ opacity: 0 }}
											>
												<label className="text-sm font-semibold">amount</label>
												<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
													{scriptStep >= 3 && <AnimText texts={['299']} delay={1} />}
												</div>
											</motion.div>
										)}
									</form>
									<div className="border-t border-gray-950 p-2 text-xs text-gray-300 h-20 ">
										{scriptStep >= 4 && (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.5 }}
											>
												<span>job 018e5751 on worker 2</span>
												<span>--- BUN INSTALL --- bun install v1.0.29</span>
												<span>
													Saved lockfile + stripe@14.21.0 18 packages installed [518.00ms]
												</span>
											</motion.div>
										)}
									</div>
									<div className="border-t border-gray-950 p-2 text-sm text-gray-300 flex flex-col">
										Result
										{scriptStep >= 4 && <AnimText texts={['Refund created: ']} delay={1} />}
									</div>
								</div>
							</div>
						</div>
					</div>

					<motion.div
						initial={{ width: 0 }}
						animate={{ width: scriptStep >= 5 ? '95%' : '0%' }}
						transition={{ duration: 0.5 }}
						className="absolute bottom-0 top-0 right-0 z-50 bg-gray-800 border-l shadow-lg border-gray-950 grid grid-cols-2 divide-x divide-gray-950"
					>
						<div className="flex justify-center items-center w-full h-full overflow-hidden col-span-1">
							<ReactFlow
								nodes={initialNodes}
								edges={initialEdges}
								nodeTypes={nodeTypes}
								nodesDraggable={false}
								nodesConnectable={false}
								nodesFocusable={false}
								edgesFocusable={false}
								elementsSelectable={false}
								panOnDrag={false}
								zoomOnScroll={false}
							/>
						</div>
						<div className="flex flex-col p-8 col-span-1">test</div>
					</motion.div>
				</div>
			</Window>

			<Window shouldRender={step === 1} name="VS Code" icon="/third_party_logos/vscode.svg">
				<div className="grid grid-cols-10 h-full">
					<div className="col-span-2 flex flex-col !bg-gray-800 border-r p-2 text-sm border-gray-950">
						<div className="flex flex-row items-center gap-1">
							<ChevronRight className="h-4 w-4" />
							<div>folder</div>
						</div>
						<span className="ml-8">your_flow.yaml</span>
					</div>
					<SyntaxHighlighter
						language="javascript"
						style={dark}
						className="rounded-none text-sm !bg-gray-800 col-span-3 h-full overflow-hidden"
						showLineNumbers
					>
						{`summary: ""
value:
  modules:
    - id: a
      value:
        type: rawscript
        content: |
			import Stripe from 'stripe';

			type StripeResource = { token: string }
				
			export async function main(
				resource: StripeResource, 
				charge: string,
				amount: number
			) {
				const stripe = new Stripe(resource.token);
			
				try {
					const refund = await stripe.refunds.create({
						charge, amount
					});
			
					console.log('Refund created:', refund);
				} catch (error) {
					console.error('Error creating refund:', error);
				};
			}
        language: bun
        input_transforms:
					resource:
            type: static
						value: u/user/stripe_resource
					charge:
						type: static
						value: flow_input.charge
					amount:
						type: static
						value: flow_input.amount
        tag: ""
    - id: b
      value:
        type: rawscript
        content: |-
          # import wmill


          def main(x: str):
              return x
        language: python3
        input_transforms:
          x:
            type: javascript
            expr: results.a
        tag: null
schema:
  $schema: https://json-schema.org/draft/2020-12/schema
  properties: {}
  required: []
  type: object
`}
					</SyntaxHighlighter>
					<div className="col-span-5 !bg-gray-800 w-full border-l border-gray-900 relative h-full">
						<div className="flex justify-center items-center w-full h-full">
							<ReactFlow
								nodes={initialNodes}
								edges={initialEdges}
								nodeTypes={nodeTypes}
								nodesDraggable={false}
								nodesConnectable={false}
								nodesFocusable={false}
								edgesFocusable={false}
								elementsSelectable={false}
								panOnDrag={false}
								zoomOnScroll={false}
							/>
						</div>
					</div>
				</div>
			</Window>
		</div>
	);
}
