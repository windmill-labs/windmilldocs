import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './n8n-content.mdx';
import { n8nCompare } from '../../data/compare/n8n';

export default function CompareN8nPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={n8nCompare} />;
}
