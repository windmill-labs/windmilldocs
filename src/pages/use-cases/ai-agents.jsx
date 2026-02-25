import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './ai-agents-content.mdx';
import { aiAgentsUseCase } from '../../data/use-cases/ai-agents';

export default function AiAgentsPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={aiAgentsUseCase} />;
}
