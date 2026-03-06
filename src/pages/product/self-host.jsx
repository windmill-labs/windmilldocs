import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './self-host-content.mdx';
import { selfHostProduct } from '../../data/products/self-host';

export default function SelfHostPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={selfHostProduct} />;
}
