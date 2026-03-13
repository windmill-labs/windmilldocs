import React from 'react';
import ProductPageLayout from '../../components/products/ProductPageLayout';
import Content, { frontMatter } from './script-editor-content.mdx';
import { scriptEditorProduct } from '../../data/products/script-editor';

export default function ScriptEditorPage() {
	return <ProductPageLayout Content={Content} frontMatter={frontMatter} productData={scriptEditorProduct} />;
}
