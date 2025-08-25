import React from 'react';
import { Shield, Clock, Activity, AlertCircle } from 'lucide-react';

const SystemStats = ({ stats, onNavigateToScanner }) => {
  if (!stats) {
    return (
      <div className="bg-dark-card p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="flex items-center justify-center h-32 text-gray-400">
          <p>Loading system data...</p>
        </div>
      </div>
    );
  }

  const getHealthColor = (health) => {
    switch (health?.toLowerCase()) {
      case 'good': return 'text-green-500';
      case 'fair': return 'text-yellow-500';
      case 'needs attention': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const formatLastUpdate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="bg-dark-card p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-cyber-green" />
        System Status
      </h2>
      
      <div className="space-y-4">
        {/* System Health */}
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-sm">System Health</span>
          </div>
          <span className={`font-semibold ${getHealthColor(stats.system_health)}`}>
            {stats.system_health}
          </span>
        </div>

        {/* Active Protection */}
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${stats.active_protection ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">Active Protection</span>
          </div>
          <span className={`font-semibold ${stats.active_protection ? 'text-green-500' : 'text-red-500'}`}>
            {stats.active_protection ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Real-time Scanning */}
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${stats.real_time_scanning ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">Real-time Scanning</span>
          </div>
          <span className={`font-semibold ${stats.real_time_scanning ? 'text-green-500' : 'text-red-500'}`}>
            {stats.real_time_scanning ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Last Update</span>
          </div>
          <span className="text-sm text-gray-300">
            {formatLastUpdate(stats.last_update)}
          </span>
        </div>

        {/* Protection Features */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Protection Features</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Malware Detection</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Behavioral Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>File Quarantine</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Threat Blocking</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={onNavigateToScanner}
              className="bg-cyber-blue hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              Update Definitions
            </button>
            <button 
              onClick={onNavigateToScanner}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStats;
