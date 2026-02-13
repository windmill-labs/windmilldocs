import React from 'react';
import UseCaseLayout from '../../components/use-cases/UseCaseLayout';
import Content, { frontMatter } from './scheduled-tasks-content.mdx';
import { scheduledTasksUseCase } from '../../data/use-cases/scheduled-tasks';

export default function ScheduledTasksPage() {
	return <UseCaseLayout Content={Content} frontMatter={frontMatter} useCaseData={scheduledTasksUseCase} />;
}
