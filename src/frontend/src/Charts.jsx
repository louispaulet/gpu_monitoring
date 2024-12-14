import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const Charts = () => {
  const [metrics, setMetrics] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${process.env.REACT_APP_API_URL}/metrics`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setMetrics((prevMetrics) => [...prevMetrics.slice(-59), data]);
          setLabels((prevLabels) => [...prevLabels.slice(-59), new Date().toLocaleTimeString()]);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const utilizationData = {
    labels,
    datasets: [
      {
        label: 'GPU Utilization (%)',
        data: metrics.map((metric) => metric.gpu_utilization),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const memoryData = {
    labels,
    datasets: [
      {
        label: 'Memory Used (MB)',
        data: metrics.map((metric) => metric.memory_used),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const temperatureData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: metrics.map((metric) => metric.temperature),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const cpuData = {
    labels,
    datasets: [
      {
        label: 'CPU Utilization (%)',
        data: metrics.map((metric) => metric.cpu_utilization),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="h-64">
          <Line data={utilizationData} options={{ ...options, scales: { y: { max: 100 } } }} />
        </div>
        <div className="h-64">
          <Line data={memoryData} options={options} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="h-64">
          <Line data={temperatureData} options={{ ...options, scales: { y: { max: 100 } } }} />
        </div>
        <div className="h-64">
          <Line data={cpuData} options={{ ...options, scales: { y: { max: 100 } } }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col justify-center p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2">GPU Stats</h2>
          <p><strong>Latest GPU Utilization:</strong> {metrics[metrics.length - 1]?.gpu_utilization}%</p>
          <p><strong>Latest Memory Used:</strong> {metrics[metrics.length - 1]?.memory_used} MB</p>
          <p><strong>Total Memory:</strong> {metrics[metrics.length - 1]?.memory_total} MB</p>
          <p><strong>Temperature:</strong> {metrics[metrics.length - 1]?.temperature} °C</p>
        </div>
        <div className="flex flex-col justify-center p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2">CPU Stats</h2>
          <p><strong>Latest CPU Utilization:</strong> {metrics[metrics.length - 1]?.cpu_utilization}%</p>
        </div>
      </div>
    </div>
  );
};

export default Charts;
