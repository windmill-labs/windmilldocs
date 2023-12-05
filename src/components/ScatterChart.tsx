import React from 'react';
import {
	Chart as ChartJS,
	LinearScale,
    PointElement,
    LineElement,
	Title,
	Tooltip,
	Legend,
  } from 'chart.js';
import { Scatter } from 'react-chartjs-2';


export default function BarChart({
	title,
    xTitle,
    yTitle,
	rawData,
}) {
	ChartJS.register(
		LinearScale,
        PointElement,
        LineElement,
		Title,
		Tooltip,
		Legend
	);

	const dotColor = 'rgba(59, 130, 246, 1)';

	const data = {
        datasets: [{
          label: title,
          data: rawData,
          backgroundColor: dotColor
        }],
      };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: xTitle,
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: yTitle,
                }
              },
          },
          plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: title,
			},
		},
    };

	return <Scatter options={options} data={data} />;
}
