import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './app-builder-content.mdx';
import { appBuilderProduct } from '../../data/products/app-builder';

export default function AppBuilderPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={appBuilderProduct} />;
}
