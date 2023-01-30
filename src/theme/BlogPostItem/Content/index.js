import React from 'react';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import Content from '@theme-original/BlogPostItem/Content';

export default function ContentWrapper(props) {
  const { metadata } = useBlogPost()
	const windmillPromo = metadata.frontMatter?.windmillPromo ?? true

  return (
    <>
      <Content {...props} />
			{
				windmillPromo && 
				<div className='flex items-start bg-blue-50 rounded-md mt-12 p-4'>
					<img
						src='https://hub.windmill.dev/icons/integrations/windmill.svg'
						width='48'
						height='48'
						alt='Windmill Logo'
						className='mt-1 mr-2 w-10 h-10'
					/>
					<div className='text-gray-600 font-medium'>
						<a href='https://docs.windmill.dev'>Windmill</a> is an <a href='https://github.com/windmill-labs/windmill'>open-source</a> and <a href='https://docs.windmill.dev/docs/how-tos/self_host/'>self-hostable</a> serverless 
						runtime and platform combining the power of code with the velocity 
						of low-code. We turn your scripts into internal apps and composable
						steps of flows that automate repetitive workflows.
					</div>
				</div>
			}
    </>
  );
}
