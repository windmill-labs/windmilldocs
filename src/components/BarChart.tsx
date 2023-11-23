import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function BarChart({
	title,
	yTitle,
	labels,
	rawData,
}) {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	let colors = [
		'rgb(255, 99, 132)', // red
		'rgb(54, 162, 235)', // blue
		'rgb(75, 192, 192)', // green
		'rgb(255, 205, 86)', // yellow
	]

	let datasets_data = [];

	let i = 0;
	for (let serie of rawData) {
		datasets_data.push({
			label: serie.label,
			data: serie.data,
			borderColor: colors[i],
			backgroundColor: colors[i],
		})
		i += 1 % colors.length
	}

	const data = {
		labels: labels,
		datasets: datasets_data
	};

	const options = {
		responsive: true,
		plugins: {
		  legend: {
			display: true,
		  },
		  title: {
			display: true,
			text: title
		  }
		},
		scales: {
			x: {
				max: 120,
			},
			y: {
				title: {
                    display: true,
                    text: yTitle,
                }
			}
		},
	  }

	return <Bar options={options} data={data} id="canvas-id" />;
}
