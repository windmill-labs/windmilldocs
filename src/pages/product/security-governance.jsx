import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './security-governance-content.mdx';
import { securityGovernanceProduct } from '../../data/products/security-governance';

export default function SecurityGovernancePage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={securityGovernanceProduct} />;
}
