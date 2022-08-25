import React, { useState } from 'react';

export default function TabsW() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="grid grid-cols-1 gap-8 max-w-4xl">
				<Example
					title="Trigger user ban flow with a webhook"
					description={
						<>
							Ban a user, notify them by{' '}
							<span class="text-transparent bg-clip-text bg-red-600 font-extrabold">email</span>,
							and us by{' '}
							<span class="text-transparent bg-clip-text bg-[#611f69] font-extrabold">Slack</span>
						</>
					}
					src="https://hub.windmill.dev/embed/flow/22/compute_activity"
					href="https://app.windmill.dev/flows/add?hub=22"
				/>
				<Example
					title="Whenever an Hacker News message contains a mention, publish it to slack with sentiment analysed"
					description={
						<>
							Whenever an{' '}
							<span class="text-transparent bg-clip-text bg-orange-500 font-extrabold">
								Hacker News
							</span>{' '}
							message contains a mention, publish it to{' '}
							<span class="text-transparent bg-clip-text bg-[#611f69] font-extrabold">Slack</span>{' '}
							with <span class="text-transparent bg-clip-text bg-sky-500 font-extrabold">NLTK</span>{' '}
							sentiment analysed.
						</>
					}
					src="https://hub.windmill.dev/embed/flow/13/whenever-an-hn-message-contains-a-mention%2C-publish-it-to-slack"
					href="https://app.windmill.dev/flows/add?hub=13"
				/>
				<Example
					title="Expense report internal workflow"
					description={
						<>
							When new expenses are uploaded to{' '}
							<span class="text-transparent bg-clip-text  bg-[#3D6EC9] font-extrabold">
								Google Drive
							</span>{' '}
							, extract text using{' '}
							<span class="text-transparent bg-clip-text  bg-[#159957] font-extrabold">
								Tesseract
							</span>{' '}
							and notify on{' '}
							<span class="text-transparent bg-clip-text bg-[#611f69] font-extrabold">Slack</span>.
						</>
					}
					src="https://hub.windmill.dev/embed/flow/21/expense_app"
					href="https://app.windmill.dev/flows/add?hub=21"
				/>

				<Example
					title="Sign up a user in the database as a backend endpoint"
					description={
						<>
							Upon new user signup, check for existence in{' '}
							<span class="text-transparent bg-clip-text bg-slate-600 font-extrabold">
								Postgres
							</span>
							, hash password, add record to{' '}
							<span class="text-transparent bg-clip-text bg-slate-600 font-extrabold">
								Postgres
							</span>{' '}
							and{' '}
							<span class="text-transparent bg-clip-text bg-[#FFBF00] font-extrabold">
								Airtable
							</span>
							, send an{' '}
							<span class="text-transparent bg-clip-text bg-red-600 font-extrabold">Email</span> to
							new user.
						</>
					}
					src="https://hub.windmill.dev/embed/flow/23/expense_app"
					href="https://app.windmill.dev/flows/add?hub=23"
				/>

				{open && (
					<>
						<Example
							title="Generate a weekly report and share it to Slack channel"
							description="See account data over the last 3 days as a pie chart"
							src="https://hub.windmill.dev/embed/flow/24/signup"
							href="https://app.windmill.dev/flows/add?hub=24"
						/>
					</>
				)}
			</div>
			<button
				onClick={() => setOpen(!open)}
				disabled={open}
				class="mt-4 py-2 px-3 text-sm font-medium text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg mr-2 "
			>
				{open ? 'Many more to come soon!' : 'Load more'}
			</button>
		</>
	);
}

function Example({ title, description, src, href }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="rounded-md border text-left shadow-md">
			<div className="p-4 border-b">
				<div className="font-extrabold font-xl mb-2">{title}</div>

				<p className="font-normal text-gray-700 mb-2">{description}</p>
			</div>
			<div className="p-4 flex justify-between">
				<button
					type="button"
					onClick={() => (window.location = href)}
					className=" inline-flex items-center  py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg mr-2 "
				>
					<svg
						className="w-6 h-6 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						></path>
					</svg>
					Edit/Run in Windmill
				</button>
				<button
					onClick={() => setOpen(!open)}
					className=" inline-flex items-center  py-2 px-3 text-sm font-medium text-center text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg mr-2 "
				>
					{open ? (
						<>
							Close details
							<svg
								class="w-4 h-4 ml-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								></path>
							</svg>
						</>
					) : (
						<>
							Open details
							<svg
								class="w-4 h-4 ml-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								></path>
							</svg>
						</>
					)}
				</button>
			</div>
			{open && (
				<div className="p-4 border-t">
					<iframe frameBorder="0" className="w-full" src={src} style={{ height: '600px' }}></iframe>
				</div>
			)}
		</div>
	);
}
