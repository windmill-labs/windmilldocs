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

export default function BarChart({ title, labels, rawData, maintainAspectRatio = true }) {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const ref = useRef<HTMLDivElement | null>(null);
	const entry = useIntersectionObserver(ref, {});
	const isVisible = !!entry?.isIntersecting;

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
		datasets: []
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
				max: 120
			},
			y: {
				stacked: true
			}
		},
		responsive: true,
		maintainAspectRatio: maintainAspectRatio,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: title + ' (time speed: 20x)'
			}
		},
		animation: {
			duration: 0
		}
	};

	let t = 0;
	let dt = 0.5;
	let iter = 1;

	const sums: number[] = [0, 0, 0, 0, 0];

	datasets_data.forEach((dataset) => {
		dataset.data.forEach((value, i) => {
			sums[i] += value;
		});
	});

	useEffect(() => {
		if (isVisible) {
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
							backgroundColor: 'rgba(13,148,136, 1)',
							borderColor: ['rgb(0, 0, 0, 0)'],
							borderWidth: 1
						}
					];

					chart.update();

					if (passedTime > Math.max(...sums)) {
						chart.data.datasets = datasets_data;
						console.log('chart.data.datasets', chart.data.datasets);
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
		<div ref={ref}>
			<Bar options={options} data={data} id="canvas-id" />
		</div>
	);
}
