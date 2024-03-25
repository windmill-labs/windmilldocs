import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AnimText from './animations/AnimText';
import Window from './animations/Window';
import { ChevronRight } from 'lucide-react';
import useAnimateScroll, { scriptScrollCount } from './animations/useAnimateScroll';
import { SiPython, SiTypescript } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

export default function ScriptAnimation({ active }) {
	const [step, setStep] = React.useState(0);
	const [bgColor, setBgColor] = React.useState('black');
	const [scriptStep, setScriptStep] = React.useState(0);

	const initialCode = `import Stripe from 'stripe';
			
type StripeResource = { token: string }
	
export async function main(
	resource: StripeResource, 
	charge: string,
) {
	const stripe = new Stripe(resource.token);

	try {
		const refund = await stripe.refunds.create({
			charge
		});

		console.log('Refund created:', refund);
	} catch (error) {
		console.error('Error creating refund:', error);
	};
}`;

	const [code, setCode] = React.useState(initialCode);

	const steps = [
		{
			scroll: 10,
			callback: () => {
				setCode(`import Stripe from 'stripe';

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
}`);
			},
			rollback: () => {
				setCode(initialCode);
			}
		},
		{
			scroll: 20,
			callback: () => {
				setScriptStep(2);
			},
			rollback: () => {
				setScriptStep(0);
			}
		},
		{
			duration: 500,
			scroll: 30,
			callback: () => {
				setScriptStep(3);
			},
			rollback: () => {
				setScriptStep(2);
			}
		},
		{
			scroll: 40,
			callback: () => {
				setBgColor('gray');

				setTimeout(() => {
					setBgColor('black');
				}, 200);
			},
			rollback: () => {
				setBgColor('black');
			}
		},
		{
			scroll: 50,
			callback: () => {
				setScriptStep(4);
			},
			rollback: () => {
				setScriptStep(3);
			}
		},
		{
			scroll: 60,
			callback: () => {
				setScriptStep(5);
			},
			rollback: () => {
				setScriptStep(4);
			}
		},
		{
			scroll: 80,
			callback: () => {
				setStep(1);
				setScriptStep(6);
			},
			rollback: () => {
				setStep(0);
				setScriptStep(5);
			}
		}
	];

	useAnimateScroll(active, steps, scriptScrollCount, 0, 'time');

	const variants = {
		variant0: { top: 250, left: 100, text: 'Iterate using our Web IDE' },
		variant2: { top: 290, left: 690, text: 'An UI is automatically generated' },
		variant3: { top: 120, left: 690, text: 'Easily test your script' },
		variant6: {
			top: 360,
			left: 300,
			text: 'Iterate using VS Code, test with integrated extension and deploy with the CLI.',
			displayArrow: false
		}
	};

	return (
		<div className="bg-gradient-to-br from-blue-200 to-sky-400 dark:from-blue-700 dark:to-sky-600 w-full rounded-lg p-6 shadow-inner overflow-hidden h-[550px]">
			<Window shouldRender={step === 0} name="Firefox" icon="/third_party_logos/firefox.svg">
				<div className="flex flex-row h-full">
					<div className="h-full border-r border-gray-950 bg-gray-900 px-2 py-1 flex flex-row items-start overflow-hidden text-gray-300 text-xs font-semibold gap-2">
						<img src="/img/windmill.svg" alt="Firefox" className="h-6 w-6" />
					</div>
					<div className="flex flex-col w-full">
						<div className="text-sm p-1 border-b border-gray-950 flex flex-row items-center justify-between w-full h-10">
							<div className="text-white">Path: f/folder/your_script</div>
							<div className="flex flex-row gap-1 items-center">
								<button className="text-white rounded-md w-full text-md bg-black px-2 py-1 h-full">
									Deploy
								</button>
							</div>
						</div>
						<div className="grid grid-cols-3 h-full w-full">
							<SyntaxHighlighter
								language="javascript"
								style={dark}
								className="rounded-none text-sm h-full col-span-2 !bg-gray-800 w-full"
								startingLineNumber
								showLineNumbers
							>
								{code}
							</SyntaxHighlighter>
							<div className="col-span-1 flex flex-col h-full w-full">
								<form className="p-2 h-56">
									<motion.button
										className="text-white rounded-md w-full h-8 text-md"
										animate={{ backgroundColor: bgColor }}
										transition={{ duration: 0.5 }}
									>
										Test
									</motion.button>
									<label className="text-sm font-semibold text-white">Resource</label>
									<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-sm flex items-center px-2">
										u/user/stripe_resource
									</div>
									<label className="text-sm font-semibold text-white">Charge</label>
									<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-sm flex items-center px-2">
										ch_1NirD82eZvKYlo2CIvbtLWuY
									</div>
									{scriptStep >= 2 && (
										<motion.div
											animate={{ opacity: 1 }}
											transition={{ duration: 0.1 }}
											initial={{ opacity: 0 }}
										>
											<label className="text-sm font-semibold text-white">Amount</label>
											<div
												id="amount"
												className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-sm flex items-center px-2"
											>
												{scriptStep >= 3 && <AnimText texts={['299']} delay={0.02} />}
											</div>
										</motion.div>
									)}
								</form>
								<div className="border-t border-gray-950 p-2 text-sm h-24 flex flex-col text-white">
									Logs:
									{scriptStep >= 4 && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.5 }}
										>
											<div className="text-gray-300">job 018e5751 on worker 2</div>
											<div className="text-gray-300">Refund created: adsa2d3</div>
										</motion.div>
									)}
								</div>
								<div className="border-t border-gray-950 p-2 text-sm flex flex-col h-20 text-white">
									Result:
									<AnimatePresence>
										{scriptStep >= 5 && (
											<SyntaxHighlighter
												language="json"
												style={dark}
												className="rounded-none text-sm !bg-gray-800 col-span-2 h-full"
											>
												{`{ amount:299 }`}
											</SyntaxHighlighter>
										)}
									</AnimatePresence>
								</div>
							</div>
						</div>
					</div>
				</div>

				{variants?.[`variant${scriptStep}`] && (
					<motion.div
						animate={`variant${scriptStep}`}
						variants={variants}
						className={twMerge(
							'absolute bg-white shadow-xl z-50 p-4 text-md rounded-lg border w-56',
							variants?.[`variant${scriptStep}`]?.displayArrow === false ? '!w-96' : ''
						)}
					>
						{variants?.[`variant${scriptStep}`]?.displayArrow !== false && (
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-3 h-3 bg-white transform rotate-45 "></div>
						)}
						{variants?.[`variant${scriptStep}`]?.text}
					</motion.div>
				)}
			</Window>
			<Window shouldRender={step === 1} name="VS Code" icon="/third_party_logos/vscode.svg">
				<div className="grid grid-cols-5 h-full">
					<div className=" col-span-1 flex flex-col !bg-gray-800 border-r p-2 text-sm border-gray-950">
						<div className="flex flex-row items-center gap-1">
							<ChevronRight className="h-4 w-4" />
							<div className="text-white">folder</div>
						</div>
						<div className="ml-8 flex flex-row gap-2 items-center text-white">
							<SiTypescript className="h-4 w-4" />
							refund_stripe.ts
						</div>
						<div className="ml-8 flex flex-row gap-2 items-center text-white">
							<SiPython className="h-4 w-4" />
							notify_users.py
						</div>
					</div>
					<SyntaxHighlighter
						language="javascript"
						style={dark}
						className="rounded-none text-sm !bg-gray-800 col-span-2  h-full"
						showLineNumbers
					>
						{code}
					</SyntaxHighlighter>
					<div className="col-span-2 flex flex-col h-full w-full">
						<form className="p-2 h-64">
							<motion.button
								className="text-white rounded-md w-full h-8 text-md"
								animate={{ backgroundColor: bgColor }}
								transition={{ duration: 0.1 }}
							>
								Test
							</motion.button>
							<label className="text-sm font-semibold text-white">Resource</label>
							<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
								u/user/stripe_resource
							</div>
							<label className="text-sm font-semibold text-white">Charge</label>
							<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
								ch_1NirD82eZvKYlo2CIvbtLWuY
							</div>
							<label className="text-sm font-semibold text-white">Amount</label>
							<div className="w-full h-8 rounded-md bg-gray-800 text-gray-300 text-xs flex items-center px-2">
								299
							</div>
						</form>
						<div className="border-t border-gray-950 p-2 text-sm  text-gray-300 h-20 ">
							<div>job 018e5751 on worker 2</div>
							<div>Refund created: 42325t24</div>
						</div>
						<div className="border-t border-gray-950 p-2 text-sm text-gray-300 flex flex-col">
							Result:
							<SyntaxHighlighter
								language="json"
								style={dark}
								className="rounded-none text-sm !bg-gray-800 col-span-2  h-full"
								showLineNumbers
							>
								{'{amount:299}'}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
				{variants?.[`variant${scriptStep}`] && (
					<motion.div
						animate={`variant${scriptStep}`}
						variants={variants}
						className={twMerge(
							'absolute bg-white shadow-xl z-50 p-4 text-md rounded-lg border w-56',
							variants?.[`variant${scriptStep}`]?.displayArrow === false ? '!w-96' : ''
						)}
					>
						{variants?.[`variant${scriptStep}`]?.displayArrow !== false && (
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-3 h-3 bg-white transform rotate-45 "></div>
						)}
						{variants?.[`variant${scriptStep}`]?.text}
					</motion.div>
				)}
			</Window>
		</div>
	);
}
