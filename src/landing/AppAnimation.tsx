import React from 'react';

import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { light } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Window from './animations/Window';
import {
	BarChart,
	Calendar,
	ChevronRight,
	Lock,
	PanelLeftOpen,
	Puzzle,
	Table,
	Type
} from 'lucide-react';
import useAnimateScroll from './animations/useAnimateScroll';
import { SiTypescript } from 'react-icons/si';

export default function AppAnimation({ active }) {
	const [step, setStep] = React.useState(0);
	const [bgColor, setBgColor] = React.useState('black');
	const [scriptStep, setScriptStep] = React.useState(0);

	const steps = [
		{
			duration: 0,
			scroll: 500,
			callback: () => {
				setScriptStep(1);
			},
			rollback: () => {
				setScriptStep(0);
			}
		}
	];

	useAnimateScroll(active, steps, 4000);

	return (
		<div className=" bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-700 dark:to-orange-600 w-full rounded-lg p-6 shadow-inner overflow-hidden  h-[550px]">
			<Window
				lightMode
				shouldRender={step === 1}
				name="VS Code"
				icon="/third_party_logos/vscode.svg"
			>
				<div className="grid grid-cols-5 h-full">
					<div className=" col-span-1 flex flex-col !bg-gray-800 border-r p-2 text-sm border-gray-950">
						<div className="flex flex-row items-center gap-1">
							<ChevronRight className="h-4 w-4" />
							<div>folder</div>
						</div>
						<span className="ml-8">script_path.ts</span>
					</div>
					<SyntaxHighlighter
						language="javascript"
						style={light}
						className="rounded-none bg-white text-sm col-span-3  h-full"
						showLineNumbers
					>
						{`import Stripe from 'stripe';

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
}`}
					</SyntaxHighlighter>
					<div className="col-span-1 flex flex-col h-full w-full">
						<form className="p-2 h-64">
							<motion.button
								className="text-white rounded-md w-full h-8 text-md"
								animate={{ backgroundColor: bgColor }}
								transition={{ duration: 0.5 }}
							>
								Test
							</motion.button>
							<label className="text-sm font-semibold">resource</label>
							<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
								2
							</div>
							<label className="text-sm font-semibold">charge</label>
							<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
								ch_1NirD82eZ
							</div>
							<label className="text-sm font-semibold">amount</label>
							<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
								299
							</div>
						</form>
						<div className="border-t border-gray-950 p-2 text-sm text-gray-300 ">
							Refund created:
						</div>
					</div>
				</div>
			</Window>

			<Window
				lightMode
				shouldRender={step === 0}
				name="Chrome"
				icon="/third_party_logos/chrome.svg"
			>
				<div className="flex flex-row h-full">
					<div className="h-full border-r border-gray-950 bg-gray-900 px-2 py-1 flex flex-row items-start overflow-hidden text-gray-300 text-xs font-semibold gap-2">
						<img src="/img/windmill.svg" alt="windmill" className="h-6 w-6" />
					</div>
					<div className="grid grid-cols-12 w-full h-full divide-x divide-gray-100">
						<div className="col-span-2 p-2 text-gray-500 text-sm">Output</div>
						<div className="col-span-8  text-gray-500 text-sm">
							<div className="grid grid-rows-3 divide-y h-full divide-gray-100">
								<div className="row-span-2  relative	">
									<div className="absolute inset-0 h-full p-8  w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
										<button className="relative bg-blue-500 text-lg text-white px-2 py-1 outline outline-2 outline-offset-2 outline-indigo-500">
											Submit
											<div className="absolute -top-5 -left-1 h-4 text-xs text-white flex items-center justify-center bg-indigo-500 px-2">
												A
											</div>
										</button>
										<input
											type="text"
											className="w-full h-8 rounded-md bg-white text-lg border-gray-200 my-4 px-2 py-2 text-gray-400"
											value="Filter..."
											disabled
										/>
										<table className=" !border-gray-200 !text-gray-400">
											<thead className="!border-gray-200 !bg-white !text-gray-400">
												<tr>
													<th className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														Charge
													</th>
													<th className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														Amount
													</th>
												</tr>
											</thead>
											<tbody className="!border-gray-200 !bg-white !text-gray-600 font-normal">
												<tr>
													<td className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														ch_1NirD82eZ
													</td>
													<td className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														299
													</td>
												</tr>
												<tr>
													<td className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														ch_1NirD82eZ
													</td>
													<td className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														299
													</td>
												</tr>

												<tr>
													<td className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														ch_1NirD82eZ
													</td>
													<td className="!border-gray-200 !bg-white !text-gray-600 font-normal">
														299
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-4 w-full h-full divide-x divide-gray-100">
										<div className="col-span-1 h-full flex flex-col p-2">
											<div className="border-2 border-gray-200 rounded-sm p-2 text-md flex flex-row gap-2 items-center justify-center outline outline-2 outline-offset-2 outline-indigo-500">
												<SiTypescript className="h-4 w-4" />
												Submit script
											</div>
										</div>
										<SyntaxHighlighter
											language="javascript"
											style={light}
											className="rounded-none text-sm col-span-3 !font-light !bg-white"
											showLineNumbers
										>
											{`export async function main() {
  return x
}`}
										</SyntaxHighlighter>
									</div>
								</div>
							</div>
						</div>
						{scriptStep === 0 && (
							<div className="col-span-2 p-2 text-gray-500 text-sm">
								<div className="text-md">Components</div>
								<input
									type="text"
									className="w-full h-8 rounded-md bg-white text-gray-300 text-md border-gray-200 my-2 px-2"
									value="Search..."
									disabled
								/>
								<div className=" grid grid-cols-2 gap-1">
									<div className="border col-span-1 h-16 flex flex-col justify-center items-center border-gray-100 rounded-md gap-1">
										<Table className="h-4 w-4" />
										<div>Table</div>
									</div>
									<div className="border col-span-1 h-16 flex flex-col justify-center items-center border-gray-100 rounded-md gap-1">
										<BarChart className="h-4 w-4" />
										<div>Chart</div>
									</div>
									<div className="border col-span-1 h-16 flex flex-col justify-center items-center border-gray-100 rounded-md gap-1">
										<PanelLeftOpen className="h-4 w-4" />
										<div>Drawer</div>
									</div>
									<div className="border col-span-1 h-16 flex flex-col justify-center items-center border-gray-100 rounded-md gap-1">
										<Type className="h-4 w-4" />
										<div>Text</div>
									</div>

									<div className="border col-span-1 h-16 flex flex-col justify-center items-center border-gray-100 rounded-md gap-1">
										<Calendar className="h-4 w-4" />
										<div>Time</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</Window>
		</div>
	);
}
