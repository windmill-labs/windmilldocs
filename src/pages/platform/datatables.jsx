import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './datatables-content.mdx';
import { datatablesProduct } from '../../data/products/datatables';

export default function DatatablesPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={datatablesProduct} />;
}
