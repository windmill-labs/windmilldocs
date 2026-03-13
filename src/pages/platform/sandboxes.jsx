import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './sandboxes-content.mdx';
import { sandboxesProduct } from '../../data/products/sandboxes';

export default function SandboxesPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={sandboxesProduct} />;
}
