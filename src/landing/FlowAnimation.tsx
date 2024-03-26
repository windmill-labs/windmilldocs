import React, { useMemo } from 'react';

import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AnimText from './animations/AnimText';
import Window from './animations/Window';
import { ChevronRight, GitBranch, Mail } from 'lucide-react';
import { SiSlack, SiYaml, SiTypescript } from 'react-icons/si';
import useAnimateScroll, {
	flowScrollCount,
	scriptScrollCount
} from './animations/useAnimateScroll';
import ReactFlow, { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { twMerge } from 'tailwind-merge';

function Node({ data }) {
	return (
		<>
			<Handle type="target" position={Position.Top} />
			<div
				className={twMerge(
					'h-8 w-48  rounded-md flex items-center gap-4 justify-start px-4 border-2 text-white  border-gray-950',
					data.color ? data.color : data.control ? 'bg-gray-950' : 'bg-gray-900',
					data.selected ? ' border-blue-500' : ''
				)}
			>
				{data.icon && <data.icon className="h-4 w-4" />}
				{data.label}
			</div>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	);
}

const xOffset = 175;
const initialY = 100;
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
			data: { label: string; control: boolean; icon?: any; color?: string; selected?: boolean };
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
			position: { x: 100 + xOffset, y: initialY + deltaY * 2 },
			data: { label: 'Run one branch', control: false, icon: GitBranch }
		},
		{
			id: '3',
			type: 'textUpdater',
			position: { x: xOffset, y: initialY + deltaY * 3 },
			data: { label: 'Default branch', control: true, icon: GitBranch }
		},
		{
			id: '4',
			type: 'textUpdater',
			position: { x: 200 + xOffset, y: initialY + deltaY * 3 },
			data: { label: 'Branch 1', control: true }
		},
		{
			id: '5',
			type: 'textUpdater',
			position: { x: xOffset, y: initialY + deltaY * 4 },
			data: { label: 'Send email', control: false, icon: Mail }
		},
		{
			id: '6',
			type: 'textUpdater',
			position: { x: 200 + xOffset, y: initialY + deltaY * 4 },
			data: { label: 'Notify on slack', control: false, icon: SiSlack }
		},
		{
			id: '7',
			type: 'textUpdater',
			position: { x: 100 + xOffset, y: initialY + deltaY * 5 },
			data: { label: 'Result', control: true }
		},

		{
			id: '9',
			type: 'textUpdater',
			position: { x: 100 + xOffset, y: initialY + deltaY },
			data: { label: 'Refund Stripe', control: true, icon: SiTypescript }
		}
	]);

	const [windowIndex, setWindowIndex] = React.useState(0);
	const [bgColor, setBgColor] = React.useState('black');
	const [step, setStep] = React.useState(-1);
	const nodeTypes = useMemo(() => ({ textUpdater: Node }), []);
	const [selectedFile, setSelectedFile] = React.useState('your_flow.yaml');

	const yaml = `summary: ""
value:
	modules:
		- id: a
			value:
				type: rawscript
		content: >-
			!inline
			refund_stripe.ts
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
`;

	const [code, setCode] = React.useState(yaml);

	const steps = [
		{
			scroll: 10,
			callback: () => {
				// select the first node
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 7 ? { ...node, data: { ...node.data, selected: true } } : node
					)
				);
				setStep(0);
			},
			rollback: () => {
				// unselect the first node
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 7 ? { ...node, data: { ...node.data, selected: false } } : node
					)
				);
				setStep(-1);
			}
		},
		{
			scroll: 15,
			callback: () => {
				setWindowIndex(1);
				setStep(1);
			},
			rollback: () => {
				setWindowIndex(0);
				setStep(0);
			}
		},
		{
			scroll: 25,
			callback: () => {
				setCode(currentText);
				setSelectedFile('refund_stripe.ts');
			},
			rollback: () => {
				setSelectedFile('your_flow.yaml');
				setCode(yaml);
			}
		},
		{
			scroll: 30,
			callback: () => {
				setWindowIndex(0);
				setStep(2);
			},
			rollback: () => {
				setWindowIndex(1);
				setStep(1);
			}
		},
		{
			scroll: 40,
			callback: () => {
				setStep(5);
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 7 ? { ...node, data: { ...node.data, selected: false } } : node
					)
				);
			},
			rollback: () => {
				setStep(2);
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 7 ? { ...node, data: { ...node.data, selected: true } } : node
					)
				);
			}
		},
		{
			scroll: 50,
			callback: () => {
				// modify the first node by adding the key color with value green
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 7 ? { ...node, data: { ...node.data, color: 'bg-green-600' } } : node
					)
				);
			},
			rollback: () => {
				setInitialNodes((nodes) =>
					// delete the key color from the first node
					nodes.map((node, i) =>
						i === 7 ? { ...node, data: { ...node.data, color: undefined } } : node
					)
				);
			}
		},
		{
			scroll: 55,
			callback: () => {
				// modify the first node by adding the key color with value green
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 1 ? { ...node, data: { ...node.data, color: 'bg-green-600' } } : node
					)
				);
				setStep(6);
			},
			rollback: () => {
				setInitialNodes((nodes) =>
					// delete the key color from the first node
					nodes.map((node, i) =>
						i === 1 ? { ...node, data: { ...node.data, color: undefined } } : node
					)
				);
				setStep(5);
			}
		},
		{
			scroll: 70,
			callback: () => {
				// modify the first node by adding the key color with value green
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 4 ? { ...node, data: { ...node.data, color: 'bg-green-600' } } : node
					)
				);
				setStep(7);
			},
			rollback: () => {
				setInitialNodes((nodes) =>
					// delete the key color from the first node
					nodes.map((node, i) =>
						i === 4 ? { ...node, data: { ...node.data, color: undefined } } : node
					)
				);
				setStep(6);
			}
		},
		{
			scroll: 85,
			callback: () => {
				// modify the first node by adding the key color with value green
				setInitialNodes((nodes) =>
					nodes.map((node, i) =>
						i === 6 ? { ...node, data: { ...node.data, color: 'bg-green-600' } } : node
					)
				);
				setStep(8);
			},
			rollback: () => {
				setInitialNodes((nodes) =>
					// delete the key color from the first node
					nodes.map((node, i) =>
						i === 6 ? { ...node, data: { ...node.data, color: undefined } } : node
					)
				);
				setStep(7);
			}
		}
	];

	useAnimateScroll(active, steps, flowScrollCount, scriptScrollCount);

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

	const variants = {
		variant0: { top: 210, left: 150, text: 'Build complex flows with the Flow editor.' },
		variant1: {
			top: 360,
			left: 300,
			// Explain thaht the flow is stored as a YAML file, that you can sync with git
			text: 'Your flow is stored as a YAML file that you can sync with git. Scripts are stored seperatly.',
			displayArrow: false
		},
		variant5: {
			top: 360,
			left: 300,
			text: 'Test your flow with a live debugger and see the results in real-time.',
			displayArrow: false
		},
		variant6: {
			top: 360,
			left: 450,
			text: 'Easily monitor the execution of each step in your flow.',
			displayArrow: false
		}
	};

	return (
		<div className=" bg-gradient-to-br from-green-200 to-emerald-400 dark:from-green-500 dark:to-emerald-600 w-full rounded-lg p-6 shadow-inner overflow-hidden h-[550px]">
			<Window shouldRender={windowIndex === 0} name="Firefox" icon="/third_party_logos/firefox.svg">
				<div className="flex flex-row h-full relative">
					<div className="h-full border-r border-gray-950 bg-gray-900 px-2 py-1 flex flex-row items-start overflow-hidden text-gray-300 text-xs font-semibold gap-2">
						<img src="/img/windmill.svg" alt="Firefox" className="h-6 w-6" />
					</div>
					<div className={twMerge('flex flex-col w-full ', step >= 5 ? 'opacity-45' : '')}>
						<div className="text-sm p-1 border-b border-gray-950 flex flex-row items-center justify-between w-full h-10">
							<div className="text-white">Path: f/folder/your_flow</div>
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
										defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
									/>
								</div>
							</div>
							<div className="flex flex-col col-span-3 w-full">
								{step >= 0 && (
									<>
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

												<label className="text-sm font-semibold text-white">Resource</label>
												<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
													u/user/stripe_resource
												</div>
												<label className="text-sm font-semibold text-white">Charge</label>
												<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
													CHE_1NirD82eZvKYlo2CIvbtLWuY
												</div>
												{step >= 2 && (
													<motion.div
														animate={{ opacity: 1 }}
														transition={{ duration: 0.5 }}
														initial={{ opacity: 0 }}
													>
														<label className="text-sm font-semibold">amount</label>
														<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
															{step >= 3 && <AnimText texts={['299']} delay={1} />}
														</div>
													</motion.div>
												)}
											</form>
											<div className="border-t border-gray-950 p-2 text-xs text-gray-300 h-20 ">
												{step >= 4 && (
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
												{step >= 4 && <AnimText texts={['Refund created: ']} delay={1} />}
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>

					<motion.div
						initial={{ width: 0 }}
						animate={{ width: step >= 5 ? '95%' : '0%' }}
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
								defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
							/>
						</div>
						<div className="flex flex-col p-8 col-span-1 gap-8">
							<div className="border h-40 border-gray-950 bg-gray-900 p-2">
								<div className="flex flex-row justify-between items-center text-sm text-gray-300">
									Logs
									{step >= 8 && (
										<div className="bg-green-600 text-white rounded-md px-2 py-0.5 text-xs">
											Success
										</div>
									)}
								</div>
								{step >= 8 && <div className="text-gray-300"> Refund created </div>}
								{step >= 8 && <div className="text-gray-300"> Email sent </div>}
							</div>
							<div className="border h-52 border-gray-950 bg-gray-900 relative">
								{step >= 6 && (
									<div className="absolute top-2 left-2 flex flex-row items-center gap-2">
										<div className="h-2 w-10 bg-blue-500"></div>
										<div className="text-sm text-gray-300">Refund Stripe - 0.3s</div>
									</div>
								)}
								{step >= 6 && (
									<div className="absolute top-8 left-8 flex flex-row items-center gap-2">
										<div className="h-2 w-10 bg-blue-500"></div>
										<div className="text-sm text-gray-300">Run one branch - 0.1s</div>
									</div>
								)}
								{step >= 7 && (
									<div className="absolute top-14 left-14 flex flex-row items-center gap-2">
										<div className="h-2 w-10 bg-blue-500"></div>
										<div className="text-sm text-gray-300">Send email - 0.2s</div>
									</div>
								)}
							</div>
						</div>
					</motion.div>
				</div>

				{variants?.[`variant${step}`] && (
					<motion.div
						animate={`variant${step}`}
						variants={variants}
						className={twMerge(
							'absolute bg-white shadow-xl z-50 p-4 text-md rounded-lg border w-56 text-gray-950',
							variants?.[`variant${step}`]?.displayArrow === false ? '!w-96' : ''
						)}
					>
						{variants?.[`variant${step}`]?.displayArrow !== false && (
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-3 h-3 bg-white transform rotate-45 "></div>
						)}
						{variants?.[`variant${step}`]?.text}
					</motion.div>
				)}
			</Window>

			<Window shouldRender={windowIndex === 1} name="VS Code" icon="/third_party_logos/vscode.svg">
				<div className="grid grid-cols-12 h-full">
					<div className="col-span-2 flex flex-col !bg-gray-800 border-r text-sm border-gray-950">
						<div className="flex flex-row items-center gap-1 text-white px-2 py-1">
							<ChevronRight className="h-4 w-4" />
							<div>folder</div>
						</div>
						<div
							className={twMerge(
								'pl-8 flex flex-row gap-2 items-center text-white py-1',
								selectedFile === 'your_flow.yaml' ? 'bg-gray-950' : ''
							)}
						>
							your_flow.yaml
						</div>
						<div
							className={twMerge(
								'pl-8 flex flex-row gap-2 items-center text-white py-1',
								selectedFile === 'refund_stripe.ts' ? 'bg-gray-950' : ''
							)}
						>
							refund_stripe.ts
						</div>
						<div className="pl-8 flex flex-row gap-2 items-center text-white py-1">
							send_email.py
						</div>
						<div className="pl-8 flex flex-row gap-2 items-center text-white py-1">
							notify_on_slack.ts
						</div>
					</div>
					<SyntaxHighlighter
						language={
							selectedFile === 'your_flow.yaml'
								? 'yaml'
								: selectedFile === 'refund_stripe.ts'
								? 'typescript'
								: 'python'
						}
						style={dark}
						className="rounded-none text-md !bg-gray-800 col-span-5 h-full overflow-hidden"
						showLineNumbers
					>
						{code}
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
								defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
							/>
						</div>
					</div>
				</div>
				{variants?.[`variant${step}`] && (
					<motion.div
						animate={`variant${step}`}
						variants={variants}
						className={twMerge(
							'absolute bg-white shadow-xl z-50 p-4 text-md rounded-lg border w-56 text-gray-950',
							variants?.[`variant${step}`]?.displayArrow === false ? '!w-96' : ''
						)}
					>
						{variants?.[`variant${step}`]?.displayArrow !== false && (
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-3 h-3 bg-white transform rotate-45 "></div>
						)}
						{variants?.[`variant${step}`]?.text}
					</motion.div>
				)}
			</Window>
		</div>
	);
}
