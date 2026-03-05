import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './frontend-content.mdx';
import { frontendProduct } from '../../data/products/frontend';

export default function FrontendPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={frontendProduct} />;
}
