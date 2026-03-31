import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './observability-content.mdx';
import { observabilityProduct } from '../../data/products/observability';

export default function ObservabilityPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={observabilityProduct} />;
}
