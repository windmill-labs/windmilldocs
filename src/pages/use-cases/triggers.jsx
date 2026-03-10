import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './triggers-content.mdx';
import { triggersUseCase } from '../../data/use-cases/triggers';

export default function TriggersPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={triggersUseCase} />;
}
