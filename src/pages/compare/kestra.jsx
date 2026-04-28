import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './kestra-content.mdx';
import { kestraCompare } from '../../data/compare/kestra';

export default function CompareKestraPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={kestraCompare} />;
}
