import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './scale-content.mdx';
import { scaleProduct } from '../../data/products/scale';

export default function ScalePage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={scaleProduct} />;
}
