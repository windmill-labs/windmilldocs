import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './rbac-content.mdx';
import { rbacProduct } from '../../data/products/rbac';

export default function RBACPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={rbacProduct} />;
}
