import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './versioning-temporary-content.mdx';
import { versioningProduct } from '../../data/products/versioning';

export default function VersioningTemporaryPage() {
	return (
		<ProductPageLayout
			Content={Content}
			frontMatter={frontMatter}
			productData={{ ...versioningProduct, slug: 'versioning-temporary', link: '/product/versioning-temporary' }}
		/>
	);
}
