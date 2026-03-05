import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './workers-content.mdx';
import { workersProduct } from '../../data/products/workers';

export default function WorkersPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={workersProduct} />;
}
