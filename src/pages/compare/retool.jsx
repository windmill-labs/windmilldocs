import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './retool-content.mdx';
import { retoolCompare } from '../../data/compare/retool';

export default function CompareRetoolPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={retoolCompare} />;
}
