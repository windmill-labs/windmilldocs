import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './workflows-content.mdx';
import { workflowAutomationUseCase } from '../../data/use-cases/workflows';

export default function WorkflowAutomationPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={workflowAutomationUseCase} />;
}
