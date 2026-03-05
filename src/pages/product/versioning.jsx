import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './versioning-content.mdx';
import { versioningProduct } from '../../data/products/versioning';

export default function VersioningPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={versioningProduct} />;
}
