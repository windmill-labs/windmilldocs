import React, { useState } from 'react';

function Tabs({ title, description, src, href }) {
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
					onClick={() => {
						window.location = href;
						window.plausible('run-on-windmill');
					}}
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
