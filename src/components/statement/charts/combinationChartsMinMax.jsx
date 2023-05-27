import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function CombinationChartsMinMax(props) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // example data
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
            type: 'line',
            label: 'สุทธิ',
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [500, 250, 1200, 480,],
        },
        {
            type: 'line',
            label: 'สุทธิ',
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [4000, 1500, 2200, 800],
        },
        {
          label: 'Sales',
          data: [2000, 1500, 3000, 2500],
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
        {
          label: 'Sales2',
          data: [3000, 2500, 4000, 3500],
          backgroundColor: '#333333',
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
      ],
    };

    // calculate max and min values for each bar
    const maxValues = data.datasets[0].data.map((value, index) => {
      const dataValues = data.datasets.map((dataset) => dataset.data[index]);
      return Math.max(...dataValues);
    });

    const minValues = data.datasets[0].data.map((value, index) => {
      const dataValues = data.datasets.map((dataset) => dataset.data[index]);
      return Math.min(...dataValues);
    });

    // set chart data and options
    setChartData(data);
    setChartOptions({
      scales: {
		x:{
			stacked: true,
		},
        y: {
          stacked: true,
          ticks: {
            beginAtZero: true,
            max: Math.max(...maxValues),
            min: Math.min(...minValues),
          },
        },
      },
    });
  }, []);

  return (
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}
