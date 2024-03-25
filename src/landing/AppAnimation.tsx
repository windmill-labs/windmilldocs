import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { light } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Window from './animations/Window';
import { BarChart, Calendar, MousePointerSquare, PanelLeftOpen, Table, Type } from 'lucide-react';
import useAnimateScroll, {
	appScrollCount,
	flowScrollCount,
	scriptScrollCount
} from './animations/useAnimateScroll';
import { SiTypescript } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export default function AppAnimation({ active }) {
	const [step, setStep] = React.useState(0);
	const [scriptStep, setScriptStep] = React.useState(0);
	const [buttonName, setButtonName] = React.useState('Press me');
	const [clicked, setClicked] = React.useState(false);

	const steps = [
		{
			scroll: 20,
			callback: () => {
				setScriptStep(1);
			},
			rollback: () => {
				setScriptStep(0);
			}
		},
		{
			scroll: 25,
			callback: () => {
				setButtonName('Load Refunds');
			},
			rollback: () => {
				setButtonName('Press me');
			}
		},
		{
			scroll: 35,
			callback: () => {
				setScriptStep(2);
			},
			rollback: () => {
				setScriptStep(1);
			}
		},
		{
			scroll: 50,
			callback: () => {
				setScriptStep(3);
			},
			rollback: () => {
				setScriptStep(2);
			}
		},
		{
			scroll: 60,
			callback: () => {
				setClicked(true);
				setTimeout(() => {
					setClicked(false);
				}, 200);
			},
			rollback: () => {}
		},
		{
			scroll: 80,
			callback: () => {
				setScriptStep(4);
			},
			rollback: () => {
				setScriptStep(3);
			}
		}
	];

	const variants = {
		variant0: { top: 180, left: 675, text: 'Build complex app from atomic components.' },

		variant2: {
			top: 260,
			left: 300,
			text: 'Add interactions with inlined scripts or scripts from your workspace.',
			displayArrow: false
		},
		variant3: {
			top: 110,
			left: 35,
			text: 'Test your app directly, and iterate quickly.'
		},
		variant4: {
			top: 360,
			left: 300,
			text: 'Connect result from one component to another, and build complex logic.',
			displayArrow: false
		}
	};

	useAnimateScroll(active, steps, appScrollCount, flowScrollCount + scriptScrollCount);

	return (
		<div className=" bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-700 dark:to-orange-600 w-full rounded-lg p-6 shadow-inner overflow-hidden  h-[550px]">
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
						<div className="col-span-9  text-gray-500 text-sm">
							<div className="grid grid-rows-3 divide-y h-full divide-gray-100">
								<div className="row-span-2  relative	overflow-hidden">
									<div className="absolute z-50 px-8 pt-8">
										{scriptStep >= 1 && (
											<button
												className={twMerge(
													'relative bg-blue-500 text-lg text-white px-2 py-1 outline outline-2 outline-offset-2 outline-indigo-500',
													clicked ? 'opacity-50' : ''
												)}
											>
												{buttonName}
												<div className="absolute z-50 -top-5 -left-1 h-4 text-xs text-white flex items-center justify-center bg-indigo-500 px-2 !opacity-100">
													A
												</div>
											</button>
										)}
									</div>
									<div className="absolute top-12 inset-0 h-full p-8  w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
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
												{scriptStep >= 4 ? (
													<>
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
													</>
												) : (
													<tr className="!border-gray-200 !bg-white  font-normal">
														<td colSpan={2} className="!text-gray-600 !border-gray-200">
															No refunds found. Click 'Load Refunds' to load
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-4 w-full h-full divide-x divide-gray-100">
										<div className="col-span-1 h-full flex flex-col p-2">
											{scriptStep >= 2 && (
												<div className="border-2 border-gray-200 rounded-sm p-2 text-md flex flex-row gap-2 items-center justify-center outline outline-2 outline-offset-2 outline-indigo-500">
													<SiTypescript className="h-4 w-4" />
													Load refunds
												</div>
											)}
										</div>
										{scriptStep >= 2 && (
											<SyntaxHighlighter
												language="javascript"
												style={light}
												className="rounded-none text-sm col-span-3 !font-light !bg-white"
												showLineNumbers
											>
												{`import Stripe from 'stripe';

export async function main() {
  const refunds = await stripe.refunds.list();
	return refunds;
}`}
											</SyntaxHighlighter>
										)}
									</div>
								</div>
							</div>
						</div>
						{scriptStep === 0 && (
							<div className="col-span-3 p-2 text-gray-500 text-sm">
								<div className="text-md">Components</div>
								<input
									type="text"
									className="w-full h-8 rounded-md bg-white text-gray-300 text-md border-gray-200 my-2 px-2"
									value="Search..."
									disabled
								/>
								<div className=" grid grid-cols-2 gap-1">
									<div className="border col-span-1 h-16 flex flex-col justify-center items-center border-gray-100 rounded-md gap-1">
										<MousePointerSquare className="h-4 w-4" />
										<div>Button</div>
									</div>
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
						{scriptStep >= 1 && (
							<div className="col-span-3 p-2 text-gray-500 text-sm w-full">
								<div className="font-semibold">Runnable</div>
								<div className="mb-4">{scriptStep >= 2 && <div>Load refunds </div>}</div>
								<div className="font-semibold">Label</div>
								<input
									type="text"
									className=" h-8 rounded-md bg-white  text-md border-gray-200 my-2 px-2 w-full"
									value={buttonName}
									disabled
								/>
								<div className="font-semibold">Color</div>
								<input
									type="text"
									className="w-full h-8 rounded-md bg-white text-md border-gray-200 my-2 px-2"
									value="blue"
									disabled
								/>
								<div className="font-semibold">Size</div>
								<input
									type="text"
									className="w-full h-8 rounded-md bg-white text-md border-gray-200 my-2 px-2"
									value="md"
									disabled
								/>
							</div>
						)}
					</div>
				</div>
				{variants?.[`variant${scriptStep}`] && (
					<motion.div
						animate={`variant${scriptStep}`}
						variants={variants}
						className={twMerge(
							'absolute bg-gray-950 text-white shadow-xl z-50 p-4 text-md rounded-lg border border-gray-950 w-56',
							variants?.[`variant${scriptStep}`]?.displayArrow === false ? '!w-96' : ''
						)}
					>
						{variants?.[`variant${scriptStep}`]?.displayArrow !== false && (
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-3 h-3 bg-gray-950 transform rotate-45 border-gray-950"></div>
						)}
						{variants?.[`variant${scriptStep}`]?.text}
					</motion.div>
				)}
			</Window>
		</div>
	);
}
