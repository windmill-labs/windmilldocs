import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './workflow-engine-content.mdx';
import { workflowEngineProduct } from '../../data/products/workflow-engine';

export default function WorkflowEnginePage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={workflowEngineProduct} />;
}
