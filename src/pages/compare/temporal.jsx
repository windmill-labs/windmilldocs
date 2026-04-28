import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './temporal-content.mdx';
import { temporalCompare } from '../../data/compare/temporal';

export default function CompareTemporalPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={temporalCompare} />;
}
