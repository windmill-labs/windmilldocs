import { internalToolsUseCase } from './internal-tools';
import { workflowAutomationUseCase } from './workflow-automation';
import { dataPipelinesUseCase } from './data-pipelines';
import { scriptsAndEndpointsUseCase } from './scripts-and-endpoints';
import { aiAgentsUseCase } from './ai-agents';
import { scheduledTasksUseCase } from './scheduled-tasks';

export const useCases = [
	internalToolsUseCase,
	workflowAutomationUseCase,
	dataPipelinesUseCase,
	scriptsAndEndpointsUseCase,
	aiAgentsUseCase,
	scheduledTasksUseCase,
];
