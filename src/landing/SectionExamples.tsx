import classNames from 'classnames';
import React from 'react';

export default function SectionExamples({ examples }) {
	return (
		<div className="mx-auto w-full mt-16 transition-all flex gap-2 flex-col">
			<span className="tracking-tight leading-tight text-left font-semibold text-gray-600 text-xl">
				Examples
			</span>
			<div className="bg-white border rounded-lg divide-y shadow-sm">
				<div className="grid grid-cols-1 lg:grid-cols-3 divide-x-0 divide-y lg:divide-x lg:divide-y-0">
					{examples.map((example, index) => (
						<a
							key={example.name}
							className={classNames(
								'flex flex-col p-6 hover:bg-gray-50  cursor-pointer !no-underline overflow-hidden ',
								index === 0 ? 'rounded-l-lg' : '',
								index === examples.length - 1 ? 'rounded-r-lg' : ''
							)}
							href={example.href}
							target="_blank"
						>
							<div className="flex flex-auto flex-col text-base leading-7 text-gray-600 gap-2">
								<p className="text-md font-bold">{example.name}</p>
								<p className="flex-auto text-sm">{example.description}</p>
								<p className="text-xs text-right">See example -{'>'}</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
