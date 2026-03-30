import { internalToolsUseCase } from './internal-tools';
import { workflowAutomationUseCase } from './workflows';
import { dataPipelinesUseCase } from './data-pipelines';
import { aiAgentsUseCase } from './ai-agents';
import { scheduledTasksUseCase } from './scheduled-tasks';
import { scriptsUseCase } from './scripts';

export const useCases = [
	scriptsUseCase,
	internalToolsUseCase,
	workflowAutomationUseCase,
	dataPipelinesUseCase,
	aiAgentsUseCase,
	scheduledTasksUseCase,
];
