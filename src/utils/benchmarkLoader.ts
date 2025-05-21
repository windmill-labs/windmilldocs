// Import all engine data files
import * as engineData from '../data/index';

export interface WorkerStat {
	taskCount: number;
	totalExecutionTime: number;
	avgWaitTime: number;
	activeTime: number;
	idleTime: number;
	activePercentage: number;
	idlePercentage: number;
	avgTaskDuration: number;
}

export interface MultiWorkerStats {
	totalDuration: number;
	workerStats: Record<number, WorkerStat>;
	firstTaskScheduled: number;
	firstTaskStarted: number;
}

// Define types based on available data
export type Engine = keyof typeof engineData & string;
export type Usecase = string;
export type Language = 'python' | 'js' | 'go' | 'javascript';
export type Scenario = 'sequential' | 'parallel';

// Define Task Timing interface
export interface TaskTiming {
	created_at: number;
	started_at: number;
	completed_at: number;
	worker_execution?: number;
}

export interface BenchmarkRun {
	workers: number;
	created_at: number[];
	started_at: number[];
	completed_at: number[];
	worker_execution?: number[];
}

export interface TaskStatistics {
	total_duration: number;
	assignment_duration: number;
	execution_duration: number;
	transition_duration: number;
	assignment_percentage: number;
	execution_percentage: number;
	transition_percentage: number;
}

// Export engines object for use throughout the app
export const engines = engineData;

// Helper to get benchmark data for an engine
function getBenchmarkData(engine: Engine) {
	const engineData = engines[engine];

	if (!engineData) {
		throw new Error(`No benchmark data available for engine: ${engine}`);
	}

	return engineData;
}

/**
 * Get task timing data for a specific benchmark
 */
export function getTaskTimings(
	engine: Engine,
	usecase: Usecase,
	language: Language,
	workers: number = 1 // Default to 1 worker if not specified
): TaskTiming[] {
	const data = getBenchmarkData(engine);
	const usecaseData = data.usecases[usecase];

	if (!usecaseData) {
		throw new Error(`No data available for usecase: ${usecase}`);
	}

	const languageData = usecaseData[language];
	if (!languageData || !Array.isArray(languageData)) {
		throw new Error(`No data available for language: ${language}`);
	}

	// Find the benchmark run with the specified number of workers
	const run = languageData.find((r) => r.workers === workers);
	if (!run) {
		throw new Error(`No data available for ${workers} worker(s)`);
	}

	// Convert parallel arrays into array of TaskTiming objects
	return run.created_at.map((created_at, i) => ({
		created_at,
		started_at: run.started_at[i],
		completed_at: run.completed_at[i],
		worker_execution: run.worker_execution ? run.worker_execution[i] : undefined
	}));
}

/**
 * Get statistics for a specific benchmark
 */
export function getTaskStatistics(
	engine: Engine,
	usecase: Usecase,
	language: Language,
	workers: number = 1
): TaskStatistics {
	const timings = getTaskTimings(engine, usecase, language, workers);

	let total_duration = 0;
	let assignment_duration = 0;
	let execution_duration = 0;
	let transition_duration = 0;

	timings.forEach((timing, i) => {
		const prev_completed_at = i === 0 ? 0 : timings[i - 1].completed_at;
		assignment_duration += timing.started_at - timing.created_at;
		transition_duration += timing.created_at - prev_completed_at;
		execution_duration += timing.completed_at - timing.started_at;
	});

	total_duration = timings[timings.length - 1].completed_at;

	return {
		total_duration,
		assignment_duration,
		execution_duration,
		transition_duration,
		assignment_percentage: (assignment_duration / total_duration) * 100,
		execution_percentage: (execution_duration / total_duration) * 100,
		transition_percentage: (transition_duration / total_duration) * 100
	};
}

/**
 * Get list of available engines
 */
export function getAvailableEngines(): Engine[] {
	return Object.keys(engines) as Engine[];
}

// Add this function to the exports
export function calculateMaxScale(timings: TaskTiming[]): number {
	if (!timings.length) return 0;
	return Math.ceil(Math.max(...timings.map((t) => t.completed_at)));
}

// Get available worker counts for a specific engine, usecase, and language
export function getAvailableWorkerCounts(
	engine: Engine,
	usecase: Usecase,
	language: Language
): number[] {
	const data = getBenchmarkData(engine);
	const usecaseData = data.usecases[usecase];

	if (!usecaseData || !usecaseData[language] || !Array.isArray(usecaseData[language])) {
		return [];
	}

	return usecaseData[language].map((run) => run.workers).sort((a, b) => a - b);
}

/**
 * Process timings for a specific worker into wait and execution times arrays
 *
 * @param timings Array of all task timings
 * @param workerId ID of the worker to process
 * @returns [waitTimes, runningTimes] pair of arrays
 */
export function getWorkerTimings(timings: TaskTiming[], workerId: number): [number[], number[]] {
	const workerTasks = timings
		.filter((t) => t.worker_execution === workerId)
		.sort((a, b) => a.started_at - b.started_at);

	if (!workerTasks.length) {
		return [[], []];
	}

	const waitTimes = [];
	const runningTimes = [];

	for (let i = 0; i < workerTasks.length; i++) {
		if (i === 0) {
			waitTimes.push(workerTasks[0].started_at);
		} else {
			waitTimes.push(workerTasks[i].started_at - workerTasks[i - 1].completed_at);
		}

		runningTimes.push(workerTasks[i].completed_at - workerTasks[i].started_at);
	}

	return [waitTimes, runningTimes];
}

/**
 * Calculate statistics for worker tasks
 * @param timings Task timing data containing worker_execution IDs
 * @returns Worker statistics or null if no worker data is available
 */
export function calculateWorkerStats(timings: TaskTiming[]): Map<number, WorkerStat> | null {
	if (!timings[0]?.worker_execution && timings[0]?.worker_execution !== 0) {
		return null;
	}

	// Group tasks by worker
	const tasksByWorker = new Map<number, TaskTiming[]>();
	timings.forEach((timing) => {
		const workerId = timing.worker_execution!;
		if (!tasksByWorker.has(workerId)) {
			tasksByWorker.set(workerId, []);
		}
		tasksByWorker.get(workerId)!.push(timing);
	});

	// Calculate stats for each worker
	const workerStats = new Map<number, WorkerStat>();

	tasksByWorker.forEach((workerTasks, workerId) => {
		// Sort tasks by started_at to ensure correct calculation
		const sortedTasks = [...workerTasks].sort((a, b) => a.started_at - b.started_at);

		let taskCount = sortedTasks.length;
		let totalExecutionTime = 0;
		let totalWaitTime = 0;

		// Calculate execution times and wait times
		sortedTasks.forEach((timing) => {
			totalExecutionTime += timing.completed_at - timing.started_at;
			totalWaitTime += timing.started_at - timing.created_at;
		});

		workerStats.set(workerId, {
			taskCount,
			totalExecutionTime,
			avgWaitTime: totalWaitTime / taskCount,
			activeTime: totalExecutionTime,
			idleTime: 0, // Will be calculated in calculateMultiWorkerStats if needed
			activePercentage: 0, // Will be calculated in calculateMultiWorkerStats if needed
			idlePercentage: 0, // Will be calculated in calculateMultiWorkerStats if needed
			avgTaskDuration: totalExecutionTime / taskCount
		});
	});

	return workerStats;
}

/**
 * Calculate comprehensive multi-worker statistics
 * @param timings Task timing data containing worker_execution IDs
 * @returns Full multi-worker statistics or null if no worker data is available
 */
export function calculateMultiWorkerStats(timings: TaskTiming[]): MultiWorkerStats | null {
	// Calculate basic worker stats first
	const workerStatsMap = calculateWorkerStats(timings);
	if (!workerStatsMap) {
		return null;
	}

	// Find total duration from first created_at to last completed_at
	const firstTaskScheduled = Math.min(...timings.map((t) => t.created_at));
	const firstTaskStarted = Math.min(...timings.map((t) => t.started_at));
	const endTime = Math.max(...timings.map((t) => t.completed_at));
	const totalDuration = endTime;

	// Convert Map to Record and calculate percentages
	const workerStats: Record<number, WorkerStat> = {};

	workerStatsMap.forEach((stats, workerId) => {
		// Calculate idle time and percentages based on total duration
		const idleTime = totalDuration - stats.activeTime;

		workerStats[workerId] = {
			...stats,
			idleTime,
			activePercentage: (stats.activeTime / totalDuration) * 100,
			idlePercentage: (idleTime / totalDuration) * 100
		};
	});

	return {
		totalDuration,
		firstTaskScheduled,
		firstTaskStarted,
		workerStats
	};
}

/**
 * Normalizes data arrays to ensure all have the same length by padding with zeros
 */
export function normalizeDataArrays(rawData) {
	// Find maximum number of entries
	let maxEntries = 0;
	rawData.forEach((workerData) => {
		if (workerData[0] && workerData[0].length > maxEntries) {
			maxEntries = workerData[0].length;
		}
	});

	// Normalize to ensure all arrays have the same length
	return rawData.map((workerData) => {
		const [waitTimes, runTimes] = workerData;
		if (!waitTimes || !runTimes || waitTimes.length >= maxEntries) {
			return workerData;
		}

		const paddedWaitTimes = [...waitTimes];
		const paddedRunTimes = [...runTimes];

		while (paddedWaitTimes.length < maxEntries) {
			paddedWaitTimes.push(0);
			paddedRunTimes.push(0);
		}

		return [paddedWaitTimes, paddedRunTimes];
	});
}

/**
 * Format engine name for display
 */
export function formatEngineName(engine: Engine): string {
	const engineName = String(engine);

	if (engineName === 'windmill_dedicated') {
		return 'Windmill Dedicated';
	}

	// For other engines, capitalize first letter
	return engineName.charAt(0).toUpperCase() + engineName.slice(1);
}

/**
 * Calculate standard deviation for an array of values
 */
export function calculateStdDev(values: number[]): number {
	const n = values.length;
	if (n === 0) return 0;

	const mean = values.reduce((a, b) => a + b, 0) / n;
	const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
	return Math.sqrt(variance);
}

/**
 * Interface for aggregate worker statistics
 */
export interface AggregateWorkerStats {
	taskCount: {
		avg: number;
		min: number;
		max: number;
		stdDev: number;
	};
	activeTime: {
		avg: number;
		min: number;
		max: number;
		stdDev: number;
	};
	activePercentage: {
		avg: number;
		min: number;
		max: number;
		stdDev: number;
	};
	idleTime: {
		avg: number;
		min: number;
		max: number;
		stdDev: number;
	};
	avgTaskDuration: {
		avg: number;
		min: number;
		max: number;
		stdDev: number;
	};
	avgWaitTime: {
		avg: number;
		min: number;
		max: number;
		stdDev: number;
	};
}

/**
 * Calculate aggregate statistics for worker data
 */
export function calculateAggregateStats(workerStats: Record<number, WorkerStat>): AggregateWorkerStats {
	const workers = Object.values(workerStats);
	if (workers.length === 0) {
		return {
			taskCount: { avg: 0, min: 0, max: 0, stdDev: 0 },
			activeTime: { avg: 0, min: 0, max: 0, stdDev: 0 },
			activePercentage: { avg: 0, min: 0, max: 0, stdDev: 0 },
			idleTime: { avg: 0, min: 0, max: 0, stdDev: 0 },
			avgTaskDuration: { avg: 0, min: 0, max: 0, stdDev: 0 },
			avgWaitTime: { avg: 0, min: 0, max: 0, stdDev: 0 }
		};
	}

	const taskCounts = workers.map(w => w.taskCount);
	const activeTimes = workers.map(w => w.activeTime);
	const activePercentages = workers.map(w => w.activePercentage);
	const idleTimes = workers.map(w => w.idleTime);
	const avgTaskDurations = workers.map(w => w.avgTaskDuration);
	const avgWaitTimes = workers.map(w => w.avgWaitTime);

	return {
		taskCount: {
			avg: taskCounts.reduce((a, b) => a + b, 0) / workers.length,
			min: Math.min(...taskCounts),
			max: Math.max(...taskCounts),
			stdDev: calculateStdDev(taskCounts)
		},
		activeTime: {
			avg: activeTimes.reduce((a, b) => a + b, 0) / workers.length,
			min: Math.min(...activeTimes),
			max: Math.max(...activeTimes),
			stdDev: calculateStdDev(activeTimes)
		},
		activePercentage: {
			avg: activePercentages.reduce((a, b) => a + b, 0) / workers.length,
			min: Math.min(...activePercentages),
			max: Math.max(...activePercentages),
			stdDev: calculateStdDev(activePercentages)
		},
		idleTime: {
			avg: idleTimes.reduce((a, b) => a + b, 0) / workers.length,
			min: Math.min(...idleTimes),
			max: Math.max(...idleTimes),
			stdDev: calculateStdDev(idleTimes)
		},
		avgTaskDuration: {
			avg: avgTaskDurations.reduce((a, b) => a + b, 0) / workers.length,
			min: Math.min(...avgTaskDurations),
			max: Math.max(...avgTaskDurations),
			stdDev: calculateStdDev(avgTaskDurations)
		},
		avgWaitTime: {
			avg: avgWaitTimes.reduce((a, b) => a + b, 0) / workers.length,
			min: Math.min(...avgWaitTimes),
			max: Math.max(...avgWaitTimes),
			stdDev: calculateStdDev(avgWaitTimes)
		}
	};
}
