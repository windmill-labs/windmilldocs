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
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Step {
	name: string;
	queue_seconds: number;
	execution_seconds: number;
	started_at_relative: number;
	completed_at_relative: number;
}

interface PipelineRun {
	platform: string;
	label: string;
	color: string;
	steps: Step[];
	total_wall_clock_seconds: number;
}

interface PipelineBenchmarkChartProps {
	runs: PipelineRun[];
	title?: string;
	xAxisLabel?: string;
}

const STEP_COLORS = [
	'rgba(59, 130, 246, 1)',    // blue
	'rgba(16, 185, 129, 1)',    // green
	'rgba(245, 158, 11, 1)',    // amber
	'rgba(239, 68, 68, 1)',     // red
	'rgba(139, 92, 246, 1)',    // violet
	'rgba(236, 72, 153, 1)',    // pink
];

const STEP_COLORS_LIGHT = [
	'rgba(59, 130, 246, 0.5)',
	'rgba(16, 185, 129, 0.5)',
	'rgba(245, 158, 11, 0.5)',
	'rgba(239, 68, 68, 0.5)',
	'rgba(139, 92, 246, 0.5)',
	'rgba(236, 72, 153, 0.5)',
];

function formatStepName(name: string): string {
	return name
		.replace(/_/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Stacked horizontal bar chart comparing pipeline step durations across platforms.
 * Each step is a segment in the stacked bar; overhead (queue + transition) is shown
 * as a lighter shade before each step.
 */
export default function PipelineBenchmarkChart({
	runs,
	title = 'Pipeline execution time',
	xAxisLabel = 'Duration (seconds)'
}: PipelineBenchmarkChartProps) {
	const labels = runs.map((r) => r.label);

	// Build datasets: for each step, create an overhead segment + execution segment
	const datasets: any[] = [];
	const stepCount = runs[0]?.steps.length ?? 0;

	for (let i = 0; i < stepCount; i++) {
		// Overhead segment (queue + transition gap)
		datasets.push({
			label: `${formatStepName(runs[0].steps[i].name)} (overhead)`,
			data: runs.map((r) => {
				const step = r.steps[i];
				const prevEnd = i > 0 ? r.steps[i - 1].completed_at_relative : 0;
				return Math.max(0, step.started_at_relative - prevEnd);
			}),
			backgroundColor: 'rgba(200, 200, 200, 0.3)',
			borderColor: 'rgba(0,0,0,0)',
			borderWidth: 0
		});

		// Execution segment
		datasets.push({
			label: formatStepName(runs[0].steps[i].name),
			data: runs.map((r) => r.steps[i].execution_seconds),
			backgroundColor: runs.map((r, idx) => {
				// Use the platform color at full opacity for execution
				return STEP_COLORS[i % STEP_COLORS.length];
			}),
			borderColor: 'rgba(0,0,0,0)',
			borderWidth: 0
		});
	}

	const maxTime = Math.max(...runs.map((r) => r.total_wall_clock_seconds));

	const options = {
		indexAxis: 'y' as const,
		scales: {
			x: {
				stacked: true,
				max: Math.ceil(maxTime * 1.1),
				title: {
					display: true,
					text: xAxisLabel
				}
			},
			y: {
				stacked: true
			}
		},
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				labels: {
					filter: (item: any) => !item.text.includes('(overhead)')
				}
			},
			title: {
				display: !!title,
				text: title
			},
			tooltip: {
				callbacks: {
					label: (ctx: any) => {
						if (ctx.dataset.label.includes('(overhead)')) {
							return `Overhead: ${ctx.raw.toFixed(3)}s`;
						}
						return `${ctx.dataset.label}: ${ctx.raw.toFixed(3)}s`;
					}
				}
			}
		},
		animation: {
			duration: 0
		}
	};

	return (
		<div style={{ position: 'relative', height: '200px', width: '100%' }}>
			<Bar options={options} data={{ labels, datasets }} />
		</div>
	);
}

/**
 * Simple grouped bar chart showing per-step execution times side by side.
 */
export function PipelineStepComparison({
	runs,
	title = 'Per-step execution time',
	xAxisLabel = 'Duration (seconds)'
}: PipelineBenchmarkChartProps) {
	const stepNames = (runs[0]?.steps ?? []).map((s) => formatStepName(s.name));

	const datasets = runs.map((run) => ({
		label: run.label,
		data: run.steps.map((s) => s.execution_seconds),
		backgroundColor: run.color,
		borderColor: run.color,
		borderWidth: 1
	}));

	const maxStep = Math.max(...runs.flatMap((r) => r.steps.map((s) => s.execution_seconds)));

	const options = {
		indexAxis: 'y' as const,
		scales: {
			x: {
				max: Math.ceil(maxStep * 1.15),
				title: {
					display: true,
					text: xAxisLabel
				}
			}
		},
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true
			},
			title: {
				display: !!title,
				text: title
			},
			tooltip: {
				callbacks: {
					label: (ctx: any) => `${ctx.dataset.label}: ${ctx.raw.toFixed(3)}s`
				}
			}
		},
		animation: {
			duration: 0
		}
	};

	return (
		<div style={{ position: 'relative', height: '300px', width: '100%' }}>
			<Bar options={options} data={{ labels: stepNames, datasets }} />
		</div>
	);
}
