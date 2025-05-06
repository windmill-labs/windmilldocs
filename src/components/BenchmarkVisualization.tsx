import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import TaskDurationBarChart from './TaskDurationBarChart';
import {
	getTaskTimings,
	getAvailableEngines,
	calculateMaxScale,
	getWorkerTimings,
	Engine,
	Usecase,
	Language,
	normalizeDataArrays,
	formatEngineName
} from '../utils/benchmarkLoader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BenchmarkVisualizationProps {
	usecase: Usecase;
	language: Language;
	engines?: Engine[];
	engine?: Engine;
	workers?: number;
	title?: string;
	xAxisLabel?: string;
	maxScale?: number;
	maintainAspectRatio?: boolean;
	shouldAnimate?: boolean;
}

/**
 * Renders detailed task execution visualization for multiple workers
 */
function renderMultiWorkerDetails({
	usecase,
	language,
	engine,
	workers,
	title,
	xTitle,
	maxXScale,
	maintainAspectRatio,
	shouldAnimate
}) {
	try {
		const timings = getTaskTimings(engine, usecase, language, workers);

		const workerIds = Array.from(new Set(timings.map((t) => t.worker_execution))).sort(
			(a, b) => a - b
		);

		const rawData = workerIds.map((workerId) => {
			const [waitTimes, runTimes] = getWorkerTimings(timings, workerId);
			return [waitTimes, runTimes];
		});

		// Normalize data so all workers have the same number of entries
		const normalizedData = normalizeDataArrays(rawData);

		const labels = workerIds.map((workerId) => `${formatEngineName(engine)} Worker ${workerId}`);

		// Calculate maxScale based on the latest completion time across all workers
		const latestCompletionTime = Math.max(...timings.map((t) => t.completed_at));

    const calculatedMaxScale = latestCompletionTime + 1;

		return (
			<TaskDurationBarChart
				title={title}
				xTitle={xTitle}
				labels={labels}
				rawData={normalizedData}
				maxXScale={maxXScale || calculatedMaxScale}
				maintainAspectRatio={maintainAspectRatio}
				shouldAnimate={shouldAnimate}
			/>
		);
	} catch (error) {
		console.error(`Error rendering multi-worker details:`, error);
		return (
			<div className="error-message">
				Error loading benchmark data: {error instanceof Error ? error.message : String(error)}
			</div>
		);
	}
}

/**
 * Benchmark visualization component that shows detailed task execution breakdown
 */
export function BenchmarkVisualization({
	usecase,
	language,
	engines = getAvailableEngines(),
	engine,
	workers = 1,
	title,
	xAxisLabel = 'Duration (in seconds)',
	maxScale,
	maintainAspectRatio = true,
	shouldAnimate = false
}: BenchmarkVisualizationProps) {
	const selectedEngines = engine ? [engine] : engines;
	const isSingleEngine = selectedEngines.length === 1;

	try {
		if (isSingleEngine) {
			const timings =
				maxScale === undefined
					? getTaskTimings(selectedEngines[0], usecase, language, workers)
					: null;
			const autoMaxScale = timings ? calculateMaxScale(timings) : maxScale;

			if (workers > 1 && timings?.[0]?.worker_execution !== undefined) {
				return renderMultiWorkerDetails({
					usecase,
					language,
					engine: selectedEngines[0],
					workers,
					title:
						title ||
						`Task Execution Breakdown: ${selectedEngines[0]} (${workers} worker${
							workers > 1 ? 's' : ''
						})`,
					xTitle: xAxisLabel,
					maxXScale: autoMaxScale,
					maintainAspectRatio,
					shouldAnimate
				});
			}

			return renderSingleEngineDetails({
				usecase,
				language,
				engine: selectedEngines[0],
				workers,
				title:
					title ||
					`Task Execution Breakdown: ${selectedEngines[0]} (${workers} worker${
						workers > 1 ? 's' : ''
					})`,
				xTitle: xAxisLabel,
				maxXScale: autoMaxScale,
				maintainAspectRatio,
				shouldAnimate
			});
		} else {
			// Get all timings to calculate maxScale if not provided
			const allTimings =
				maxScale === undefined
					? selectedEngines
							.map((e) => {
								try {
									return getTaskTimings(e, usecase, language, workers);
								} catch (err) {
									return null;
								}
							})
							.filter((t) => t !== null)
					: null;

			const autoMaxScale = allTimings
				? Math.max(...allTimings.map((timings) => calculateMaxScale(timings)))
				: maxScale;

			return renderMultiEngineDetails({
				usecase,
				language,
				engines: selectedEngines,
				workers,
				title: title || `${usecase} (${workers} worker${workers > 1 ? 's' : ''})`,
				xTitle: xAxisLabel,
				maxXScale: autoMaxScale,
				maintainAspectRatio,
				shouldAnimate
			});
		}
	} catch (error) {
		console.error(`Error in BenchmarkVisualization:`, error);
		return (
			<div className="error-message">
				Error loading benchmark data: {error instanceof Error ? error.message : String(error)}
			</div>
		);
	}
}

/**
 * Renders detailed task execution visualization for multiple engines
 */
function renderMultiEngineDetails({
	usecase,
	language,
	engines,
	workers,
	title,
	xTitle,
	maxXScale,
	maintainAspectRatio,
	shouldAnimate
}) {
	const rawData = engines.map((engine) => {
		try {
			const timings = getTaskTimings(engine, usecase, language, workers);

			if (!timings || !timings.length) {
				console.error(`No timing data for ${engine}, ${usecase}, ${language}, ${workers}`);
				return [[], []];
			}

			const waitTimes = timings.map((t, i) => {
				if (i === 0) {
					return t.started_at;
				} else {
					const prevTask = timings[i - 1];
					return t.started_at - prevTask.completed_at;
				}
			});

			const runTimes = timings.map((t) => t.completed_at - t.started_at);
			return [waitTimes, runTimes];
		} catch (err) {
			console.error(`Error loading data for ${engine}:`, err);
			return [[], []];
		}
	});

	const validEngineIndices = rawData
		.map((data, index) => (data[0].length > 0 || data[1].length > 0 ? index : -1))
		.filter((index) => index !== -1);

	if (validEngineIndices.length === 0) {
		return (
			<div className="error-message">
				No benchmark data available for the selected configuration.
			</div>
		);
	}

	const filteredEngines = validEngineIndices.map((index) => engines[index]);
	const filteredRawData = validEngineIndices.map((index) => rawData[index]);

	// Normalize data to handle different array lengths
	const normalizedData = normalizeDataArrays(filteredRawData);

	return (
		<TaskDurationBarChart
			title={title}
			xTitle={xTitle}
			labels={filteredEngines.map(formatEngineName)}
			rawData={normalizedData}
			maxXScale={maxXScale}
			maintainAspectRatio={maintainAspectRatio}
			shouldAnimate={shouldAnimate}
		/>
	);
}

/**
 * Renders detailed task execution visualization for a single engine
 */
function renderSingleEngineDetails({
	usecase,
	language,
	engine,
	workers,
	title,
	xTitle,
	maxXScale,
	maintainAspectRatio,
	shouldAnimate
}) {
	try {
		const timings = getTaskTimings(engine, usecase, language, workers);
		if (!timings || !timings.length) {
			console.error(`No timing data for ${engine}, ${usecase}, ${language}, ${workers}`);
			return (
				<div className="error-message">
					No benchmark data available for {formatEngineName(engine)}.
				</div>
			);
		}

		const waitTimes = timings.map((t, i) => {
			if (i === 0) {
				return t.started_at - t.created_at;
			} else {
				const prevTask = timings[i - 1];
				return t.started_at - prevTask.completed_at;
			}
		});

		const runTimes = timings.map((t) => t.completed_at - t.started_at);

		const rawData = [[waitTimes, runTimes]];

		return (
			<TaskDurationBarChart
				title={title}
				xTitle={xTitle}
				labels={[formatEngineName(engine)]}
				rawData={rawData}
				maxXScale={maxXScale}
				maintainAspectRatio={maintainAspectRatio}
				shouldAnimate={shouldAnimate}
			/>
		);
	} catch (error) {
		console.error(`Error rendering single engine details:`, error);
		return (
			<div className="error-message">
				Error loading benchmark data: {error instanceof Error ? error.message : String(error)}
			</div>
		);
	}
}
