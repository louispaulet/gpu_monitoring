import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Charts = () => {
  const [metrics, setMetrics] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${process.env.REACT_APP_API_URL}/metrics`)
        .then((response) => response.json())
        .then((data) => {
          setMetrics((prevMetrics) => [...prevMetrics.slice(-59), data]);
          setLabels((prevLabels) => [...prevLabels.slice(-59), new Date().toLocaleTimeString()]);
        });
    }, 1000); // Fetch every second

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'GPU Utilization (%)',
        data: metrics.map((metric) => metric.gpu_utilization),
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
      // Add more datasets as needed
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Charts;
