import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import Footer from '../../landing/Footer';
import Banner from '../../landing/Banner';

export default function DocRootWrapper(props) {
	return (
		<>
			<Banner />
			<DocRoot {...props} />
			<div className="">
				<Footer />
			</div>
		</>
	);
}
