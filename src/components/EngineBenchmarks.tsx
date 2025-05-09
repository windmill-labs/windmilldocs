import React from 'react';
import { BenchmarkVisualization } from './BenchmarkVisualization';
import { TaskStatisticsTable } from './TaskStatisticsTable';
import { TaskTimingTable } from './TaskTimingTable';
import type { TOCItem } from '@docusaurus/mdx-loader';

import {
	Engine,
	Language,
	formatEngineName,
	BenchmarkRun,
	engines,
	getAvailableEngines
} from '../utils/benchmarkLoader';

interface EngineBenchmarksProps {
	engine: Engine;
}

type BenchmarkData = {
	title: string;
	description: string;
	python?: BenchmarkRun[];
	js?: BenchmarkRun[];
	go?: BenchmarkRun[];
};

type UsecaseData = {
	[usecase: string]: BenchmarkData;
};

function getBenchmarkData(engine: Engine): UsecaseData {
	try {
		const engineData = engines[engine];
		if (!engineData) {
			console.warn(`No engine data available for: ${engine}`);
			return {};
		}

		if (!engineData.usecases) {
			console.warn(`No usecases found in engine data for: ${engine}`);
			return {};
		}

		// Check that we have the expected data structure
		const usecases = engineData.usecases;
		for (const [name, data] of Object.entries(usecases)) {
			if (!data.title) {
				console.warn(`Missing title for usecase ${name} in engine ${engine}`);
			}
		}

		return engineData.usecases as UsecaseData;
	} catch (error) {
		console.error(`Error getting benchmark data for engine ${engine}:`, error);
		return {};
	}
}

function getLanguagesForUsecase(usecaseData: BenchmarkData): Language[] {
	if (!usecaseData) {
		return [];
	}

	return Object.keys(usecaseData).filter(
		(key) =>
			key !== 'title' &&
			key !== 'description' &&
			usecaseData[key] &&
			Array.isArray(usecaseData[key])
	).map( _ => _ === 'js' ? 'javascript' : _) as Language[];
}

function getWorkerCounts(usecaseData: BenchmarkData, language: Language): number[] {
	if (!usecaseData || !usecaseData[language]) {
		return [];
	}
	const benchmarkRuns = usecaseData[language] || [];
	return benchmarkRuns.map((run) => run.workers);
}

function hasEngineData(
	engine: Engine,
	usecase: string,
	language: Language,
	workers: number = 1
): boolean {
	try {
		const data = getBenchmarkData(engine);
		if (!data || !data[usecase] || !data[usecase][language]) {
			return false;
		}
		const benchmarkRuns = data[usecase][language] || [];
		return benchmarkRuns.some((run) => run.workers === workers);
	} catch (error) {
		console.error(`Error checking engine data for ${engine}/${usecase}/${language}:`, error);
		return false;
	}
}

export function getToc(engine: Engine) {
	const benchmarkData = getBenchmarkData(engine);

	const toc: TOCItem[] = [];

  toc.push({
		value: 'Summary',
		id: 'summary',
		level: 2
	});

	toc.push({
		value: `${formatEngineName(engine)} setup`,
		id: `${engine}-setup`,
		level: 2
	});

	for (const [usecase, data] of Object.entries(benchmarkData)) {
		if (!data || !data.title) {
			console.warn(`Missing title for usecase ${usecase}`);
			continue;
		}

		const usecaseId = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

		toc.push({
			value: data.title,
			id: usecaseId,
			level: 2
		});

		const languages = getLanguagesForUsecase(data);
		for (const language of languages) {
			const workerCounts = getWorkerCounts(data, language);

			toc.push({
				value: language.charAt(0).toUpperCase() + language.slice(1),
				id: `${usecaseId}-${language}`,
				level: 3
			});

			for (const workers of workerCounts) {
				toc.push({
					value: `${workers} Worker${workers > 1 ? 's' : ''}`,
					id: `${usecaseId}-${language}-workers-${workers}`,
					level: 4
				});

				toc.push({
					value: 'Visualization',
					id: `${usecaseId}-${language}-workers-${workers}-visualization`,
					level: 5
				});
				toc.push({
					value: 'Statistics',
					id: `${usecaseId}-${language}-workers-${workers}-statistics`,
					level: 5
				});
				toc.push({
					value: 'Timing details',
					id: `${usecaseId}-${language}-workers-${workers}-timing`,
					level: 5
				});
			}
		}
	}

	return toc;
}

export function EngineBenchmarks({ engine }: EngineBenchmarksProps) {
	const benchmarkData = getBenchmarkData(engine);
	const usecases = Object.entries(benchmarkData);
	const allEngines = getAvailableEngines();

	if (usecases.length === 0) {
		return <div>No benchmark data available for {formatEngineName(engine)}</div>;
	}

	return (
		<div className="benchmark-container">
			{usecases.map(([usecase, data]) => {
				if (!data || !data.title) {
					console.warn(`Missing data or title for usecase ${usecase}`);
					return null;
				}

				const languages = getLanguagesForUsecase(data);
				const usecaseId = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

				return (
					<section key={usecase} className="benchmark-section">
						<h2 className="text-2xl font-bold mb-4" id={usecaseId}>
							{data.title}
						</h2>
						<p className="mb-6">{data.description || ''}</p>

						{languages.map((language) => {
							const workerCounts = getWorkerCounts(data, language);

							return (
								<div key={`${usecase}-${language}`} className="mb-12">
									<h3 className="text-xl font-bold mb-4" id={`${usecaseId}-${language}`}>
										{language.charAt(0).toUpperCase() + language.slice(1)}
									</h3>

									{workerCounts.map((workers) => {
										const availableEngines: Engine[] = [engine];
										if (
											engine !== 'windmill' &&
											hasEngineData('windmill', usecase, language, workers)
										) {
											availableEngines.push('windmill');
										}
										if (
											engine !== 'windmill_dedicated' &&
											hasEngineData('windmill_dedicated', usecase, language, workers)
										) {
											availableEngines.push('windmill_dedicated');
										}

										const workerId = `${usecaseId}-${language}-workers-${workers}`;

										return (
											<div key={`${usecase}-${language}-${workers}`} className="mb-12">
                        {workers > 1 && (
                          <h4 className="text-lg font-bold mb-4" id={workerId}>
                            {workers} Worker{workers > 1 ? 's' : ''}
                          </h4>
                        )}

												<div className="benchmark-visualization mb-8">
													<h5
														className="text-md font-semibold mb-4"
														id={`${workerId}-visualization`}
													>
														Visualization
													</h5>
													<div className="grid">
														<BenchmarkVisualization
															usecase={usecase}
															language={language}
															engines={workers > 1 ? undefined : availableEngines}
															engine={workers > 1 ? engine : undefined}
															workers={workers}
															title={`${data.title} (${language.toUpperCase()}, ${workers} worker${
																workers > 1 ? 's' : ''
															})`}
															maintainAspectRatio={false}
														/>
													</div>
												</div>

												<div className="benchmark-statistics mb-8">
													<h5 className="text-md font-semibold mb-4" id={`${workerId}-statistics`}>
														Statistics
													</h5>
													<TaskStatisticsTable
														usecase={usecase}
														language={language}
														engines={availableEngines}
														workers={workers}
													/>
												</div>

												<div className="benchmark-timing">
													<h5 className="text-md font-semibold mb-4" id={`${workerId}-timing`}>
														Timing details
													</h5>
													<details className="overflow-hidden">
														<summary className="cursor-pointer p-2 transition-colors">
															View task timing details
														</summary>
														<div className="p-4 border-t">
															<TaskTimingTable
																usecase={usecase}
																scenario="sequential"
																language={language}
																engine={engine}
																workers={workers}
															/>
															{availableEngines.length > 1 &&
																availableEngines.map((compEngine) => {
																	if (compEngine === engine) return null;
																	return (
																		<div key={compEngine} className="mt-8">
																			<h6 className="text-md font-semibold mb-4">
																				{formatEngineName(compEngine)} Comparison
																			</h6>
																			<TaskTimingTable
																				usecase={usecase}
																				scenario="sequential"
																				language={language}
																				engine={compEngine}
																				workers={workers}
																			/>
																		</div>
																	);
																})}
														</div>
													</details>
												</div>
											</div>
										);
									})}
								</div>
							);
						})}
					</section>
				);
			})}
		</div>
	);
}
