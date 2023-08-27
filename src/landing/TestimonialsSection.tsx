import React from 'react';
import LandingSection from './LandingSection';

const testimonials = [
	{
		body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
		author: {
			name: 'Leslie Alexander',
			handle: 'lesliealexander',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		}
	},
	{
		body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
		author: {
			name: 'Leslie Alexander',
			handle: 'lesliealexander',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		}
	},
	{
		body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
		author: {
			name: 'Leslie Alexander',
			handle: 'lesliealexander',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		}
	},
	{
		body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
		author: {
			name: 'Leslie Alexander',
			handle: 'lesliealexander',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		}
	},
	{
		body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
		author: {
			name: 'Leslie Alexander',
			handle: 'lesliealexander',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		}
	},
	{
		body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
		author: {
			name: 'Leslie Alexander',
			handle: 'lesliealexander',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
		}
	}
];

export default function Example() {
	return (
		<LandingSection bgClass="">
			<div>
				<div className="mx-auto text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
						Testimonials
					</h1>
					<p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl"></p>
					<h2 className={`text-gray-900 dark:text-gray-200 text-2xl font-semibold`}>
						We have worked with thousands of amazing people
					</h2>
				</div>
				<div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.author.handle}
								className="pt-8 sm:inline-block sm:w-full sm:px-4"
							>
								<figure className="rounded-2xl dark:bg-gray-1000 bg-gray-50 p-8 text-sm leading-6">
									<blockquote className="dark:text-gray-50 text-gray-900">
										<p>{`“${testimonial.body}”`}</p>
									</blockquote>
									<figcaption className="mt-6 flex items-center gap-x-4">
										<div>
											<div className="font-semibold dark:text-gray-50 text-gray-900">
												{testimonial.author.name}
											</div>
										</div>
									</figcaption>
								</figure>
							</div>
						))}
					</div>
				</div>
			</div>
		</LandingSection>
	);
}
