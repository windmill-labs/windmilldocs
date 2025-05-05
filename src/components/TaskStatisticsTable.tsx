import React from 'react';
import {
	getTaskStatistics,
	getTaskTimings,
	Engine,
	Usecase,
	Language,
	calculateMultiWorkerStats,
	MultiWorkerStats,
	formatEngineName
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

			{/* Multi-worker Statistics */}
			{workers > 1 && (
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
