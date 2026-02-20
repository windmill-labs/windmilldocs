import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './scripts-and-endpoints-content.mdx';
import { scriptsAndEndpointsUseCase } from '../../data/use-cases/scripts-and-endpoints';

export default function ScriptsAndEndpointsPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={scriptsAndEndpointsUseCase} />;
}
