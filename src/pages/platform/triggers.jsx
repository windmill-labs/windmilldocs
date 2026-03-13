import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './triggers-content.mdx';
import { triggersProduct } from '../../data/products/triggers';

export default function triggersPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={triggersProduct} />;
}
