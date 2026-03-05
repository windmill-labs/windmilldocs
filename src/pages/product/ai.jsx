import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './ai-content.mdx';
import { aiProduct } from '../../data/products/ai';

export default function AIPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={aiProduct} />;
}
