import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './frontend-builder-content.mdx';
import { frontendBuilderProduct } from '../../data/products/frontend-builder';

export default function FrontendBuilderPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={frontendBuilderProduct} />;
}
