import { internalToolsUseCase } from './internal-tools';
import { workflowAutomationUseCase } from './workflows';
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
