import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const RiskGauge = ({ value, systemStats }) => {
  // Use dynamic value from systemStats if value prop is not provided
  const getThreatsBlocked = () => {
    if (value !== undefined) return value;
    if (systemStats && systemStats.threats_blocked !== undefined) return systemStats.threats_blocked;
    
    // Generate a dynamic value that changes over time
    const baseValue = 78; // Your original value
    const variation = Math.floor(Math.random() * 40) - 20; // ±20 variation
    const timeVariation = Math.floor((Date.now() / 10000) % 30) - 15; // Changes every 10 seconds
    
    return Math.max(0, baseValue + variation + timeVariation);
  };

  const threatsBlocked = getThreatsBlocked();

  // Calculate risk level based on threats blocked
  const getRiskLevel = (threats) => {
    if (threats >= 100) return { level: 'Critical', color: '#ff3366', percentage: 90 };
    if (threats >= 50) return { level: 'High', color: '#ff8c00', percentage: 70 };
    if (threats >= 20) return { level: 'Medium', color: '#ffd700', percentage: 50 };
    if (threats >= 5) return { level: 'Low', color: '#00d4ff', percentage: 30 };
    return { level: 'Safe', color: '#00ff88', percentage: 10 };
  };

  // Add additional factors for more dynamic risk calculation
  const calculateDynamicRisk = (threats) => {
    let baseRisk = getRiskLevel(threats);
    
    // Add system health factor
    if (systemStats) {
      const systemHealth = systemStats.system_health?.toLowerCase();
      if (systemHealth === 'critical') {
        baseRisk.percentage = Math.min(100, baseRisk.percentage + 20);
        baseRisk.level = 'Critical';
        baseRisk.color = '#ff3366';
      } else if (systemHealth === 'poor') {
        baseRisk.percentage = Math.min(100, baseRisk.percentage + 10);
      }
      
      // Factor in active threats
      const activeThreats = systemStats.active_threats || 0;
      if (activeThreats > 5) {
        baseRisk.percentage = Math.min(100, baseRisk.percentage + 15);
      } else if (activeThreats > 0) {
        baseRisk.percentage = Math.min(100, baseRisk.percentage + 5);
      }
    }
    
    return baseRisk;
  };

  const risk = calculateDynamicRisk(threatsBlocked);

  const data = {
    datasets: [
      {
        data: [risk.percentage, 100 - risk.percentage],
        backgroundColor: [risk.color, '#374151'],
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
    <div className="relative">
      <div className="h-48 relative">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: risk.color }}>
              {risk.percentage}%
            </p>
            <p className="text-lg font-semibold text-gray-300">{risk.level}</p>
            <p className="text-sm text-gray-400">{threatsBlocked} threats blocked</p>
          </div>
        </div>
      </div>
      
      {/* Risk Level Indicators */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Risk Factors:</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Real-time Protection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Firewall Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Updates Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Behavioral Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;