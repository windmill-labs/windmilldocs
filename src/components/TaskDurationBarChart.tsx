import React, { useEffect, useRef } from 'react';
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
import { useIntersectionObserver } from './useInteractionObserver';

export default function BarChart({
	title,
	xTitle,
	labels,
	rawData,
	maintainAspectRatio = true,
	shouldAnimate = false,
	maxXScale = 120
}) {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const ref = useRef<HTMLDivElement | null>(null);
	const entry = useIntersectionObserver(ref, {});
	const isVisible = !!entry?.isIntersecting;

	// Check if rawData is valid before processing
	if (!rawData || !rawData.length || !rawData[0] || !rawData[0].length) {
		return (
			<div ref={ref} className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
				<p className="text-gray-500">No data available for this benchmark.</p>
			</div>
		);
	}

	const standby_col = 'rgba(188, 212, 252, 1)';
	const task_running_col = 'rgba(59, 130, 246, 1)';

	let datasets_data = [];

	let c = 0;
	for (let i = 0; i < rawData[0].length; i++) {
		for (let j = 0; j < rawData[0][i].length; j++) {
			datasets_data.push({
				axis: 'y',
				label: c % 2 === 0 ? 'waiting' : 'task_' + Math.floor(c / 2).toString(),
				data: [],
				fill: false,
				backgroundColor: [c % 2 === 0 ? standby_col : task_running_col],
				borderColor: ['rgb(0, 0, 0, 0)'],
				borderWidth: 1
			});
			c += 1;
		}
	}

	for (let i = 0; i < rawData.length; i++) {
		c = 0;
		for (let j = 0; j < rawData[i][0].length; j++) {
			datasets_data[c].data.push(rawData[i][0][j]);
			c += 1;
			datasets_data[c].data.push(rawData[i][1][j]);
			c += 1;
		}
	}

	const data = {
		labels: labels,
		datasets: shouldAnimate ? [] : datasets_data
	};

	const options = {
		indexAxis: 'y' as const,
		elements: {
			bar: {
				borderWidth: 2
			}
		},
		scales: {
			x: {
				stacked: true,
				max: maxXScale,
				title: {
					display: true,
					text: xTitle
				}
			},
			y: {
				stacked: true
			}
		},
		responsive: true,
		// NOTE: maintainAspectRatio is not working as expected, so we're disabling it as it's never set to true by any of the parent components
		// maintainAspectRatio: maintainAspectRatio,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: title
			}
		},
		animation: {
			duration: 0
		}
	};

	let dt = 0.2;
	let iter = 1;

	const sums: number[] = [0, 0, 0, 0, 0, 0];

	datasets_data.forEach((dataset) => {
		dataset.data.forEach((value, i) => {
			sums[i] += value;
		});
	});

	useEffect(() => {
		if (isVisible && shouldAnimate) {
			const interval = setInterval(() => {
				const chart = ChartJS.getChart('canvas-id');
				if (chart) {
					const passedTime = dt * iter; // seconds

					const chartData = sums.map((sum) => Math.min(sum, passedTime));
					chart.data.datasets = [
						{
							// @ts-ignore
							axis: 'y' as const,
							label: 'Loading',
							data: chartData,
							fill: false,
							backgroundColor: '#059669',
							borderColor: ['rgb(0, 0, 0, 0)'],
							borderWidth: 1
						}
					];

					chart.update();

					if (passedTime > Math.max(...sums)) {
						chart.data.datasets = datasets_data;
						chart.update();
						clearInterval(interval);
					} else {
						iter += 1;
					}
				}
			}, 10);

			return () => clearInterval(interval);
		}
	}, [isVisible]);

	return (
		<div ref={ref} style={{ position: 'relative', height: '40vh', width: '100%' }}>
			<Bar options={options} data={data} id="canvas-id" />
		</div>
	);
}
