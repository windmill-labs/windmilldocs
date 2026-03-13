import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './local-dev-content.mdx';
import { localDevProduct } from '../../data/products/local-dev';

export default function LocalDevPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={localDevProduct} />;
}
