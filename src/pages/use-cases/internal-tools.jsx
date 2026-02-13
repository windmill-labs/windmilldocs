import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './internal-tools-content.mdx';
import { internalToolsUseCase } from '../../data/use-cases/internal-tools';

export default function InternalToolsPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={internalToolsUseCase} />;
}
