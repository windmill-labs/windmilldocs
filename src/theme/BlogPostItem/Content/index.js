import React from 'react';
import clsx from 'clsx';
import { blogPostContainerID } from '@docusaurus/utils-common';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import MDXContent from '@theme/MDXContent';
export default function BlogPostItemContent({ children, className }) {
	const { isBlogPostPage, metadata } = useBlogPost();
	const windmillPromo = metadata.frontMatter?.windmillPromo ?? true;

	return (
		<div
			// This ID is used for the feed generation to locate the main content
			id={isBlogPostPage ? blogPostContainerID : undefined}
			className={clsx('markdown', className)}
			itemProp="articleBody"
		>
			<MDXContent>{children}</MDXContent>
			{isBlogPostPage && windmillPromo && (
				<div className="flex items-start bg-blue-50 rounded-md mt-12 p-4">
					<img
						src="https://hub.windmill.dev/icons/integrations/windmill.svg"
						width="48"
						height="48"
						alt="Windmill Logo"
						className="mt-1 mr-2 w-10 h-10"
					/>
					<div className="text-gray-600 font-medium">
						<a href="https://docs.windmill.dev">Windmill</a> is an{' '}
						<a href="https://github.com/windmill-labs/windmill">open-source</a> and{' '}
						<a href="https://docs.windmill.dev/docs/advanced/self_host/">self-hostable</a>{' '}
						serverless runtime and platform combining the power of code with the velocity of
						low-code. We turn your scripts into internal apps and composable steps of flows that
						automate repetitive workflows.
						<br />
						<br />
						You can{' '}
						<a href="https://docs.windmill.dev/docs/advanced/self_host/#deployment">
							self-host
						</a>{' '}
						Windmill using a <code>docker compose up</code>, or go with the{' '}
						<a href="https://app.windmill.dev/user/login" rel="nofollow">
							cloud app
						</a>
						.
					</div>
				</div>
			)}
		</div>
	);
}
