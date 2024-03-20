import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AnimText from './animations/AnimText';
import Window from './animations/Window';
import { ChevronRight } from 'lucide-react';
import useTypewriter from './animations/useTypedText';
import { SiGmail, SiSlack, SiStripe } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

export default function FlowAnimation({ active }) {
	const [step, setStep] = React.useState(0);
	const [bgColor, setBgColor] = React.useState('black');
	const [scriptStep, setScriptStep] = React.useState(0);

	const steps = [
		{
			duration: 6000,
			callback: () => {
				setStep(1);
			}
		}
	];

	useEffect(() => {
		if (!active) {
			return;
		}
		let timeout = 0;
		steps.forEach((step, index) => {
			timeout += step.duration;
			setTimeout(() => {
				step.callback();
			}, timeout);
		});
	}, []);

	const { currentText, play } = useTypewriter({
		sourceText: `import Stripe from 'stripe';
			
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
		<div className=" bg-gradient-to-br from-green-200 to-emerald-400 dark:from-green-700 dark:to-emerald-600 w-full rounded-lg p-6 shadow-inner overflow-hidden h-[550px]">
			{step === 1 && active && (
				<Window name="VS Code" icon="/third_party_logos/vscode.svg">
					<div className="grid grid-cols-5 h-full">
						<div className=" col-span-1 flex flex-col !bg-gray-800 border-r p-2 text-sm border-gray-950">
							<div className="flex flex-row items-center gap-1">
								<ChevronRight className="h-4 w-4" />
								<div>folder</div>
							</div>
							<span className="ml-8">your_flow.yaml</span>
						</div>
						<SyntaxHighlighter
							language="javascript"
							style={dark}
							className="rounded-none text-sm !bg-gray-800 col-span-3  h-full"
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
									u/user/stripe_resource
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
							<div className={twMerge('border-t border-gray-950 p-2 text-sm text-gray-300 ')}>
								Refund created:
							</div>
						</div>
					</div>
				</Window>
			)}
			{step === 0 && active && (
				<Window name="Firefox" icon="/third_party_logos/firefox.svg">
					<div className="flex flex-row h-full">
						<div className="h-full border-r border-gray-950 bg-gray-900 px-2 py-1 flex flex-row items-start overflow-hidden text-gray-300 text-xs font-semibold gap-2">
							<img src="/img/windmill.svg" alt="Firefox" className="h-6 w-6" />
						</div>
						<div className="flex flex-col w-full">
							<div className="text-sm p-1 border-b border-gray-950 flex flex-row items-center justify-between w-full h-10">
								<div>Path: f/folder/your_flow</div>
								<div className="flex flex-row gap-1 items-center">
									<button className="text-white rounded-md w-full text-md bg-black px-2 h-full whitespace-nowrap">
										Test flow
									</button>
									<button className="text-white rounded-md w-full text-md bg-black px-2 h-full">
										Deploy
									</button>
								</div>
							</div>
							<div className="grid grid-cols-6 h-full w-full">
								<div className="col-span-2 !bg-gray-800 w-full border-r border-gray-900 relative h-full">
									<div className="absolute top-24 h-40 w-[1px] bg-gray-900 left-1/2 transform -translate-x-1/2"></div>

									<div
										className="absolute top-24 left-1/2 transform -translate-x-1/2 h-8 w-48 bg-gray-900 rounded-md flex items-center gap-4 justify-start px-4 
									outline-black outline-2 outline outline-offset-2
									"
									>
										<SiStripe className="h-4 w-4" />
										Refund on Stripe
									</div>
									<div className="absolute top-40 left-1/2 transform -translate-x-1/2 h-8 w-48 bg-gray-900 rounded-md flex items-center gap-4 justify-start px-4">
										<SiGmail className="h-4 w-4" />
										Send email
									</div>
									<div className="absolute top-56 left-1/2 transform -translate-x-1/2 h-8 w-48 bg-gray-900 rounded-md flex items-center gap-4 justify-start px-4">
										<SiSlack className="h-4 w-4" />
										Notify user
									</div>
								</div>
								<div className="flex flex-col col-span-4 w-full">
									<SyntaxHighlighter
										language="javascript"
										style={dark}
										className="rounded-none text-sm h-1/2 !bg-gray-800 w-full"
										startingLineNumber
										showLineNumbers
									>
										{currentText}
									</SyntaxHighlighter>
									<div className="col-span-1 flex flex-col h-full w-full">
										<form className="p-2 h-64">
											<motion.button
												className="text-white rounded-md w-full h-8 text-md"
												animate={{ backgroundColor: bgColor }}
												transition={{ duration: 0.5 }}
											>
												Test this step
											</motion.button>
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
					</div>
				</Window>
			)}
		</div>
	);
}
