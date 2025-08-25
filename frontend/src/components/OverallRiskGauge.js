import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverallRiskGauge = ({ riskScore, systemStats, threatData }) => {
  // Calculate dynamic risk score based on multiple factors
  const calculateRiskScore = () => {
    if (riskScore !== undefined) return riskScore;
    
    let calculatedRisk = 0;
    
    if (systemStats) {
      // Factor in threats blocked (higher threats = lower risk as system is working)
      const threatsBlocked = systemStats.threats_blocked || 0;
      if (threatsBlocked > 100) calculatedRisk += 10;
      else if (threatsBlocked > 50) calculatedRisk += 20;
      else if (threatsBlocked > 20) calculatedRisk += 35;
      else calculatedRisk += 50;
      
      // Factor in active threats (higher active threats = higher risk)
      const activeThreats = systemStats.active_threats || 0;
      calculatedRisk += (activeThreats * 5);
      
      // Factor in system health
      const systemHealth = systemStats.system_health?.toLowerCase();
      if (systemHealth === 'critical') calculatedRisk += 30;
      else if (systemHealth === 'poor') calculatedRisk += 20;
      else if (systemHealth === 'fair') calculatedRisk += 10;
      // 'good' adds 0
      
      // Factor in CPU and memory usage
      const cpuUsage = systemStats.cpu_usage || 0;
      const memoryUsage = systemStats.memory_usage || 0;
      if (cpuUsage > 80 || memoryUsage > 80) calculatedRisk += 15;
      else if (cpuUsage > 60 || memoryUsage > 60) calculatedRisk += 10;
    }
    
    // Add some randomness for variety (±10)
    calculatedRisk += (Math.random() * 20 - 10);
    
    // Ensure it's within bounds
    return Math.max(0, Math.min(100, Math.round(calculatedRisk)));
  };

  const finalRiskScore = calculateRiskScore();

  const data = {
    datasets: [
      {
        data: [finalRiskScore, 100 - finalRiskScore],
        backgroundColor: ['#ff4444', '#2a1a1a'],
        borderWidth: 0,
        cutout: '75%',
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
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
      <div className="relative">
        <h3 className="text-lg font-semibold mb-4 text-white">Overall Risk</h3>
        <div className="relative h-48">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-red-primary">{finalRiskScore}%</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>0</span>
          <span>70</span>
        </div>
      </div>
    </div>
  );
};

export default OverallRiskGauge;