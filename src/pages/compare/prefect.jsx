import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './prefect-content.mdx';
import { prefectCompare } from '../../data/compare/prefect';

export default function ComparePrefectPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={prefectCompare} />;
}
