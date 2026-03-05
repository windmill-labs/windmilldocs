import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './integrations-content.mdx';
import { integrationsProduct } from '../../data/products/integrations';

export default function IntegrationsPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={integrationsProduct} />;
}
