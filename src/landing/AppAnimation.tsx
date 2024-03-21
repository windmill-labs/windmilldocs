import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Window from './animations/Window';
import { ChevronRight } from 'lucide-react';
import useTypewriter from './animations/useTypedText';
import useAnimateScroll from './animations/useAnimateScroll';

export default function AppAnimation({ active }) {
	const [step, setStep] = React.useState(0);
	const [bgColor, setBgColor] = React.useState('black');
	const [scriptStep, setScriptStep] = React.useState(0);

	const [scriptMessage, setScriptMessage] = React.useState(
		'Iterate direclty with VS Code, sync with Github.'
	);

	const steps = [
		{
			duration: 0,
			scroll: 200,
			callback: () => {
				setScriptStep(1);
			}
		},

		{
			duration: 4000,
			callback: () => {
				play();
			}
		},
		{
			duration: 4000,
			callback: () => {
				setScriptStep(2);
			}
		},
		{
			duration: 2000,
			callback: () => {
				setScriptStep(3);
			}
		},
		{
			duration: 3000,
			callback: () => {
				setBgColor('gray');

				setTimeout(() => {
					setBgColor('black');
				}, 200);
			}
		},
		{
			duration: 1000,
			callback: () => {
				setScriptStep(4);
			}
		},
		{
			duration: 6000,
			callback: () => {
				setStep(1);
			}
		},
		{
			duration: 8000,
			callback: () => {
				setStep(0);
				setScriptStep(0);
			}
		}
	];

	useAnimateScroll(active, steps, 4000);

	const { currentText, play } = useTypewriter({
		sourceText: `import Stripe from 'stripe';
			
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
}`,
		targetText: `import Stripe from 'stripe';
			
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
}`
	});

	return (
		<div className=" bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-700 dark:to-orange-600 w-full rounded-lg p-6 shadow-inner overflow-hidden  h-[550px]">
			<Window
				shouldRender={step === 1 && active}
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
						style={dark}
						className="rounded-none text-sm !bg-gray-800 col-span-3  h-full"
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
				shouldRender={step === 0 && active}
				name="Chrome"
				icon="/third_party_logos/chrome.svg"
			>
				<div className="flex flex-row h-full">
					<div className="h-full border-r border-gray-950 bg-gray-900 px-2 py-1 flex flex-row items-start overflow-hidden text-gray-300 text-xs font-semibold gap-2">
						<img src="/img/windmill.svg" alt="windmill" className="h-6 w-6" />
					</div>
					<div className="flex flex-col w-full"></div>
				</div>
			</Window>
		</div>
	);
}
