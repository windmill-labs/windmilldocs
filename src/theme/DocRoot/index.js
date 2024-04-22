import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import Footer from '../../landing/Footer';

export default function DocRootWrapper(props) {
	return (
		<>
			<DocRoot {...props} />
			<div className="">
				<Footer />
			</div>
		</>
	);
}
