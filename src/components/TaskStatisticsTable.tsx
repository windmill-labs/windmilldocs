import React from 'react';
import {
	getTaskStatistics,
	getTaskTimings,
	Engine,
	Usecase,
	Language,
	calculateMultiWorkerStats,
	MultiWorkerStats,
	formatEngineName,
	calculateAggregateStats,
	AggregateWorkerStats
} from '../utils/benchmarkLoader';

interface TaskTiming {
	created_at: number;
	started_at: number;
	completed_at: number;
	worker_execution?: number;
}

interface TaskStatistics {
	total_duration: number;
	assignment_duration: number;
	execution_duration: number;
	transition_duration: number;
	assignment_percentage: number;
	execution_percentage: number;
	transition_percentage: number;
}

interface TaskStatisticsTableProps {
	usecase: Usecase;
	language: Language;
	engines: Engine[];
	workers?: number;
}

export function TaskStatisticsTable({
	usecase,
	language,
	engines,
	workers = 1
}: TaskStatisticsTableProps) {
	const stats: Partial<Record<Engine, TaskStatistics>> = {};
	const multiWorkerStats: Partial<Record<Engine, MultiWorkerStats>> = {};
	let error: string | null = null;

	try {
		engines.forEach((engine) => {
			// Get regular statistics for single worker mode
			if (workers === 1) {
				stats[engine] = getTaskStatistics(engine, usecase, language, workers);
			}

			// Calculate multi-worker statistics if workers > 1
			if (workers > 1) {
				const timings = getTaskTimings(engine, usecase, language, workers);
				multiWorkerStats[engine] = calculateMultiWorkerStats(timings);
			}
		});
	} catch (err) {
		error = err instanceof Error ? err.message : 'Unknown error occurred';
	}

	if (error) {
		return <div className="error-message">Error: {error}</div>;
	}

	// Helper to format time and percentages
	const formatTime = (time: number) => time.toFixed(3);
	const formatPercentage = (percentage: number) => percentage.toFixed(2);

	// Comparative multi-worker view (multiple engines with multiple workers)
	if (workers > 1 && engines.length > 1) {
		// Calculate aggregate statistics for each engine
		const aggregateStats: Partial<Record<Engine, AggregateWorkerStats>> = {};
		engines.forEach(engine => {
			if (multiWorkerStats[engine]) {
				aggregateStats[engine] = calculateAggregateStats(multiWorkerStats[engine]!.workerStats);
			}
		});

		return (
			<div className="task-statistics-table">
				<h3 className="text-lg font-bold mb-4">Multi-Worker Comparison ({workers} workers)</h3>

				{/* Overall duration comparison */}
				<table className="w-full mb-8">
					<thead>
						<tr>
							<th align="left">Metric per</th>
							{engines.map(engine => (
								<th key={engine} align="right">{formatEngineName(engine)}</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td align="left"><strong>Total Duration (s)</strong></td>
							{engines.map(engine => (
								<td key={engine} align="right">
									{multiWorkerStats[engine] ? formatTime(multiWorkerStats[engine]!.totalDuration) : "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left"><strong>First Task Scheduled (s)</strong></td>
							{engines.map(engine => (
								<td key={engine} align="right">
									{multiWorkerStats[engine] ? formatTime(multiWorkerStats[engine]!.firstTaskScheduled) : "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left"><strong>First Task Started (s)</strong></td>
							{engines.map(engine => (
								<td key={engine} align="right">
									{multiWorkerStats[engine] ? formatTime(multiWorkerStats[engine]!.firstTaskStarted) : "N/A"}
								</td>
							))}
						</tr>
					</tbody>
				</table>

				{/* Worker aggregate statistics */}
				<h4 className="text-md font-bold mb-2">Worker Load Distribution</h4>

				{/* Consolidated worker statistics table */}
				<table className="w-full mb-8 border-collapse text-sm">
					<thead>
						<tr>
							<th align="left" className="px-2 py-1 text-sm">Metric per worker</th>
							<th align="left" className="px-2 py-1 text-sm">Statistic</th>
							{engines.map(engine => (
								<th key={engine} align="right" className="px-2 py-1 text-sm">{formatEngineName(engine)}</th>
							))}
						</tr>
					</thead>
					<tbody className="text-sm leading-normal">
						{/* Tasks per Worker */}
						<tr>
							<td align="left" rowSpan={2} className="px-2 py-1 align-top"><strong>Tasks per Worker</strong></td>
							<td align="left" className="px-2 py-1">Average (StdDev)</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${aggregateStats[engine].taskCount.avg.toFixed(1)} (${aggregateStats[engine].taskCount.stdDev.toFixed(2)})`
										: "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left" className="px-2 py-1">Min / Max</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${aggregateStats[engine].taskCount.min} / ${aggregateStats[engine].taskCount.max}`
										: "N/A"}
								</td>
							))}
						</tr>

						{/* Active Time */}
						<tr>
							<td align="left" rowSpan={2} className="px-2 py-1 align-top"><strong>Active Time (s)</strong></td>
							<td align="left" className="px-2 py-1">Average (StdDev)</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].activeTime.avg)} (${formatTime(aggregateStats[engine].activeTime.stdDev)})`
										: "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left" className="px-2 py-1">Min / Max</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].activeTime.min)} / ${formatTime(aggregateStats[engine].activeTime.max)}`
										: "N/A"}
								</td>
							))}
						</tr>

						{/* Idle Time */}
						<tr>
							<td align="left" rowSpan={2} className="px-2 py-1 align-top"><strong>Idle Time (s)</strong></td>
							<td align="left" className="px-2 py-1">Average (StdDev)</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].idleTime.avg)} (${formatTime(aggregateStats[engine].idleTime.stdDev)})`
										: "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left" className="px-2 py-1">Min / Max</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].idleTime.min)} / ${formatTime(aggregateStats[engine].idleTime.max)}`
										: "N/A"}
								</td>
							))}
						</tr>

						{/* Avg Wait Time */}
						<tr>
							<td align="left" rowSpan={2} className="px-2 py-1 align-top"><strong>Avg Wait Time (s)</strong></td>
							<td align="left" className="px-2 py-1">Average (StdDev)</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].avgWaitTime.avg)} (${formatTime(aggregateStats[engine].avgWaitTime.stdDev)})`
										: "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left" className="px-2 py-1">Min / Max</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].avgWaitTime.min)} / ${formatTime(aggregateStats[engine].avgWaitTime.max)}`
										: "N/A"}
								</td>
							))}
						</tr>

						{/* Avg Task Duration */}
						<tr>
							<td align="left" rowSpan={2} className="px-2 py-1 align-top"><strong>Avg Task Duration (s)</strong></td>
							<td align="left" className="px-2 py-1">Average (StdDev)</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].avgTaskDuration.avg)} (${formatTime(aggregateStats[engine].avgTaskDuration.stdDev)})`
										: "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left" className="px-2 py-1">Min / Max</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatTime(aggregateStats[engine].avgTaskDuration.min)} / ${formatTime(aggregateStats[engine].avgTaskDuration.max)}`
										: "N/A"}
								</td>
							))}
						</tr>

						{/* Worker Utilization */}
						<tr>
							<td align="left" rowSpan={2} className="px-2 py-1 align-top"><strong>Worker Utilization (%)</strong></td>
							<td align="left" className="px-2 py-1">Average (StdDev)</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatPercentage(aggregateStats[engine].activePercentage.avg)} (${formatPercentage(aggregateStats[engine].activePercentage.stdDev)})`
										: "N/A"}
								</td>
							))}
						</tr>
						<tr>
							<td align="left" className="px-2 py-1">Min / Max</td>
							{engines.map(engine => (
								<td key={engine} align="right" className="px-2 py-1">
									{aggregateStats[engine]
										? `${formatPercentage(aggregateStats[engine].activePercentage.min)} / ${formatPercentage(aggregateStats[engine].activePercentage.max)}`
										: "N/A"}
								</td>
							))}
						</tr>
					</tbody>
				</table>

				{/* Add detailed per-worker tables in a collapsible section when comparing exactly 2 engines */}
				{workers > 1 && engines.length === 2 && engines.some(e => e === 'windmill' || e === 'windmill_dedicated') && (
					<details className="mt-4 mb-8">
						<summary className="cursor-pointer font-semibold p-2 hover:bg-gray-50 rounded">
							View detailed worker statistics for each engine
						</summary>
						<div className="p-4 space-y-6">
							{engines.map((engine) => {
								const engineStats = multiWorkerStats[engine];
								if (!engineStats) {
									return null;
								}

								return (
									<div key={engine} className="mb-8">
										<h4 className="text-lg font-bold mb-2">{formatEngineName(engine)}</h4>
										<div className="mb-4">
											<strong>Total Duration: </strong>
											{formatTime(engineStats.totalDuration)} seconds
										</div>
										<div className="mb-4">
											<strong>First Task Scheduled: </strong>
											{formatTime(engineStats.firstTaskScheduled)} seconds
										</div>
										<div className="mb-4">
											<strong>First Task Started: </strong>
											{formatTime(engineStats.firstTaskStarted)} seconds
										</div>
										<table className="w-full">
											<thead>
												<tr>
													<th align="left">Worker</th>
													<th align="right">Tasks</th>
													<th align="right">Active Time</th>
													<th align="right">Active %</th>
													<th align="right">Idle Time</th>
													<th align="right">Idle %</th>
													<th align="right">Avg Task Time</th>
												</tr>
											</thead>
											<tbody>
												{/* Sort by actual worker ID to match the visualization */}
												{Object.entries(engineStats.workerStats)
													.sort(([a], [b]) => parseInt(a) - parseInt(b))
													.map(([workerId, stats]) => (
														<tr key={workerId}>
															<td align="left">Worker {workerId}</td>
															<td align="right">{stats.taskCount}</td>
															<td align="right">{formatTime(stats.activeTime)}s</td>
															<td align="right">{formatPercentage(stats.activePercentage)}%</td>
															<td align="right">{formatTime(stats.idleTime)}s</td>
															<td align="right">{formatPercentage(stats.idlePercentage)}%</td>
															<td align="right">{formatTime(stats.avgTaskDuration)}s</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								);
							})}
						</div>
					</details>
				)}
			</div>
		);
	}

	return (
		<div className="task-statistics-table">
			{/* Regular Statistics Table - Only show for single worker */}
			{workers === 1 && (
				<table className="w-full mb-8">
					<thead>
						<tr>
							<th align="center"></th>
							{engines.map((engine) => (
								<th key={engine} align="right">
									{formatEngineName(engine)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td align="center">
								<strong>Total duration (in seconds)</strong>
							</td>
							{engines.map((engine) => (
								<td key={engine} align="right">
									{stats[engine]?.total_duration.toFixed(3)}
								</td>
							))}
						</tr>
						<tr>
							<td align="center">
								<strong>Assignment</strong>
							</td>
							{engines.map((engine) => (
								<td key={engine} align="right">
									{stats[engine]?.assignment_duration.toFixed(3)} (
									{stats[engine]?.assignment_percentage.toFixed(2)}%)
								</td>
							))}
						</tr>
						<tr>
							<td align="center">
								<strong>Execution</strong>
							</td>
							{engines.map((engine) => (
								<td key={engine} align="right">
									{stats[engine]?.execution_duration.toFixed(3)} (
									{stats[engine]?.execution_percentage.toFixed(2)}%)
								</td>
							))}
						</tr>
						<tr>
							<td align="center">
								<strong>Transition</strong>
							</td>
							{engines.map((engine) => (
								<td key={engine} align="right">
									{stats[engine]?.transition_duration.toFixed(3)} (
									{stats[engine]?.transition_percentage.toFixed(2)}%)
								</td>
							))}
						</tr>
					</tbody>
				</table>
			)}

			{/* Multi-worker Statistics for single engine */}
			{workers > 1 && engines.length === 1 && (
				<div>
					{engines.map((engine) => {
						const engineStats = multiWorkerStats[engine];
						if (!engineStats) {
							return null;
						}

						return (
							<div key={engine} className="mb-8">
								<h4 className="text-lg font-bold mb-2">{formatEngineName(engine)}</h4>
								<div className="mb-4">
									<strong>Total Duration: </strong>
									{formatTime(engineStats.totalDuration)} seconds
								</div>
								<div className="mb-4">
									<strong>First Task Scheduled: </strong>
									{formatTime(engineStats.firstTaskScheduled)} seconds
								</div>
								<div className="mb-4">
									<strong>First Task Started: </strong>
									{formatTime(engineStats.firstTaskStarted)} seconds
								</div>
								<table className="w-full">
									<thead>
										<tr>
											<th align="left">Worker</th>
											<th align="right">Tasks</th>
											<th align="right">Active Time</th>
											<th align="right">Active %</th>
											<th align="right">Idle Time</th>
											<th align="right">Idle %</th>
											<th align="right">Avg Task Time</th>
										</tr>
									</thead>
									<tbody>
										{/* Sort by actual worker ID to match the visualization */}
										{Object.entries(engineStats.workerStats)
											.sort(([a], [b]) => parseInt(a) - parseInt(b))
											.map(([workerId, stats]) => (
												<tr key={workerId}>
													<td align="left">Worker {workerId}</td>
													<td align="right">{stats.taskCount}</td>
													<td align="right">{formatTime(stats.activeTime)}s</td>
													<td align="right">{formatPercentage(stats.activePercentage)}%</td>
													<td align="right">{formatTime(stats.idleTime)}s</td>
													<td align="right">{formatPercentage(stats.idlePercentage)}%</td>
													<td align="right">{formatTime(stats.avgTaskDuration)}s</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
