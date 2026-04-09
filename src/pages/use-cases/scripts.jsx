import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './scripts-content.mdx';
import { scriptsUseCase } from '../../data/use-cases/scripts';

export default function ScriptsPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={scriptsUseCase} />;
}
