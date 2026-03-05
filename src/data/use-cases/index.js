import { internalToolsUseCase } from './internal-tools';
import { workflowAutomationUseCase } from './workflow-automation';
import { dataPipelinesUseCase } from './data-pipelines';
import { aiAgentsUseCase } from './ai-agents';
import { triggersUseCase } from './triggers';

export const useCases = [
	internalToolsUseCase,
	workflowAutomationUseCase,
	dataPipelinesUseCase,
	aiAgentsUseCase,
	triggersUseCase,
];
