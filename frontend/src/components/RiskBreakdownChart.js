import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RiskBreakdownChart = ({ systemStats, scanResults, threatData }) => {
  // Calculate dynamic risk values for each category
  const calculateRiskBreakdown = () => {
    const baseValues = {
      SSL: 3 + Math.floor(Math.random() * 5),
      'Security Headers': 2 + Math.floor(Math.random() * 6),
      Malware: 1 + Math.floor(Math.random() * 7),
      'Open Ports': 3 + Math.floor(Math.random() * 5),
      'Content-Security-Policy': 2 + Math.floor(Math.random() * 6)
    };

    // Adjust based on system stats
    if (systemStats) {
      // If many threats are blocked, increase malware risk
      if (systemStats.threats_blocked > 50) {
        baseValues.Malware = Math.min(10, baseValues.Malware + 2);
      }
      
      // If active threats exist, increase overall risk
      if (systemStats.active_threats > 0) {
        baseValues.SSL = Math.min(10, baseValues.SSL + 1);
        baseValues.Malware = Math.min(10, baseValues.Malware + 2);
        baseValues['Open Ports'] = Math.min(10, baseValues['Open Ports'] + 1);
      }
      
      // System health affects security measures
      const systemHealth = systemStats.system_health?.toLowerCase();
      if (systemHealth === 'critical' || systemHealth === 'poor') {
        Object.keys(baseValues).forEach(key => {
          baseValues[key] = Math.min(10, baseValues[key] + 1);
        });
      }
    }
    
    // Adjust based on scan results
    if (scanResults && scanResults.threats_found > 0) {
      baseValues.Malware = Math.min(10, baseValues.Malware + 3);
    }
    
    return Object.values(baseValues);
  };

  const riskValues = calculateRiskBreakdown();

  const data = {
    labels: ['SSL', 'Security Headers', 'Malware', 'Open Ports', 'Content-Security-Policy'],
    datasets: [
      {
        data: riskValues,
        backgroundColor: 'rgba(255, 68, 68, 0.2)',
        borderColor: '#ff4444',
        borderWidth: 2,
        pointBackgroundColor: '#ff4444',
        pointBorderColor: '#ff4444',
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#444',
        },
        grid: {
          color: '#444',
        },
        pointLabels: {
          color: '#888',
          font: {
            size: 11,
          },
        },
        ticks: {
          display: false,
        },
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
      <div className="relative">
        <h3 className="text-lg font-semibold mb-4 text-white">Risk Breakdown</h3>
        <div className="h-64">
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RiskBreakdownChart;