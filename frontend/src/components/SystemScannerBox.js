import React from 'react';
import { Settings, ChevronRight, Shield } from 'lucide-react';

const SystemScannerBox = ({ onNavigateToScanner }) => {
  return (
    <div 
      className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden cursor-pointer hover:border-red-primary/50 transition-all duration-300 group"
      onClick={onNavigateToScanner}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent group-hover:from-red-primary/10"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-primary/20 rounded-lg">
              <Settings className="w-6 h-6 text-red-primary animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white font-mono">SYSTEM SCANNER</h3>
              <p className="text-sm text-gray-400">Advanced System Analysis</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-red-primary group-hover:translate-x-1 transition-transform" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Definition Updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Real-time Logs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">System Monitoring</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-red-primary/20">
          <p className="text-xs text-red-primary font-mono animate-pulse">
            &gt; Click to access advanced scanner_
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemScannerBox;
