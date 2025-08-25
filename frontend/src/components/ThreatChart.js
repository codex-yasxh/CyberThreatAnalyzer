import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ThreatChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <p>Loading threat data...</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Threats Detected',
        data: data.map(item => item.threats_detected),
        backgroundColor: 'rgba(255, 51, 102, 0.8)',
        borderColor: 'rgba(255, 51, 102, 1)',
        borderWidth: 2,
      },
      {
        label: 'Files Scanned',
        data: data.map(item => item.files_scanned),
        backgroundColor: 'rgba(0, 212, 255, 0.8)',
        borderColor: 'rgba(0, 212, 255, 1)',
        borderWidth: 2,
      },
      {
        label: 'Blocked Attempts',
        data: data.map(item => item.blocked_attempts),
        backgroundColor: 'rgba(0, 255, 136, 0.8)',
        borderColor: 'rgba(0, 255, 136, 1)',
        borderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        }
      },
      y: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        }
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ThreatChart;
