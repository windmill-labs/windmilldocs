import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './workflow-editor-content.mdx';
import { workflowEditorProduct } from '../../data/products/workflow-editor';

export default function flowEditorPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={workflowEditorProduct} />;
}
