import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import Footer from '../../landing/Footer';

export default function DocRootWrapper(props) {
	return (
		<>
			<div className="mx-8 md:mx-16 py-4">
				<DocRoot {...props} />
			</div>
			<div className="">
				<Footer />
			</div>
		</>
	);
}
ß