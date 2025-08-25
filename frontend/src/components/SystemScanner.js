import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, RefreshCw, Terminal, Shield, AlertTriangle, CheckCircle, Activity, Skull } from 'lucide-react';

const SystemScanner = ({ onBackToDashboard }) => {
  const [logs, setLogs] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [definitions, setDefinitions] = useState({
    virus: 45234,
    malware: 12456,
    trojans: 8901,
    rootkits: 3421
  });

  // Add new log every 2 seconds
  useEffect(() => {
    // Simulated log messages
    const logMessages = [
      { type: 'info', message: 'System scanner initialized...', icon: <Shield className="w-4 h-4" /> },
      { type: 'success', message: 'Virus definitions loaded successfully', icon: <CheckCircle className="w-4 h-4" /> },
      { type: 'warning', message: 'Suspicious network activity detected', icon: <AlertTriangle className="w-4 h-4" /> },
      { type: 'error', message: 'Malware signature found in memory', icon: <Skull className="w-4 h-4" /> },
      { type: 'info', message: 'Deep scan in progress...', icon: <Activity className="w-4 h-4" /> },
      { type: 'success', message: 'System integrity verified', icon: <CheckCircle className="w-4 h-4" /> },
      { type: 'warning', message: 'Outdated security patches detected', icon: <AlertTriangle className="w-4 h-4" /> },
      { type: 'info', message: 'Firewall rules updated', icon: <Shield className="w-4 h-4" /> },
      { type: 'error', message: 'Trojan.Win32.Generic detected', icon: <Skull className="w-4 h-4" /> },
      { type: 'success', message: 'Quarantine operation completed', icon: <CheckCircle className="w-4 h-4" /> }
    ];

    const interval = setInterval(() => {
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      const newLog = {
        ...randomLog,
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now()
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 19)]); // Keep only last 20 logs
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdateDefinitions = async () => {
    setIsUpdating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update definitions with random increments
      setDefinitions(prev => ({
        virus: prev.virus + Math.floor(Math.random() * 100) + 50,
        malware: prev.malware + Math.floor(Math.random() * 50) + 20,
        trojans: prev.trojans + Math.floor(Math.random() * 30) + 10,
        rootkits: prev.rootkits + Math.floor(Math.random() * 20) + 5
      }));
      
      setLastUpdate(new Date());
      
      // Add success log
      const successLog = {
        type: 'success',
        message: 'Definition update completed successfully',
        icon: <CheckCircle className="w-4 h-4" />,
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now()
      };
      setLogs(prev => [successLog, ...prev.slice(0, 19)]);
      
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-primary';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <div className="bg-dark-card border-b border-red-primary/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToDashboard}
              className="flex items-center space-x-2 text-red-primary hover:text-red-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-red-primary/30"></div>
            <h1 className="text-2xl font-bold font-mono flex items-center space-x-2">
              <Terminal className="w-8 h-8 text-red-primary animate-pulse" />
              <span>SYSTEM SCANNER</span>
            </h1>
          </div>
          <div className="text-sm text-gray-400">
            Last Update: {lastUpdate.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Definitions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Update Definitions */}
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30">
            <h2 className="text-xl font-semibold mb-4 text-red-primary font-mono">
              DEFINITION UPDATES
            </h2>
            
            <div className="space-y-4 mb-6">
              {Object.entries(definitions).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-gray-300 capitalize">{type} Signatures:</span>
                  <span className="text-white font-mono">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleUpdateDefinitions}
              disabled={isUpdating}
              className="w-full bg-red-primary hover:bg-red-secondary disabled:opacity-50 text-white px-4 py-3 rounded-lg font-mono flex items-center justify-center space-x-2 transition-colors"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>UPDATING...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>UPDATE DEFINITIONS</span>
                </>
              )}
            </button>
          </div>

          {/* System Status */}
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30">
            <h2 className="text-xl font-semibold mb-4 text-red-primary font-mono">
              SYSTEM STATUS
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Real-time Protection:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">ACTIVE</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Firewall:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">ENABLED</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto-Update:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400">SCHEDULED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Live Logs */}
        <div className="lg:col-span-2">
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-primary font-mono">
                LIVE SYSTEM LOGS
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">MONITORING</span>
              </div>
            </div>
            
            <div className="bg-black/50 rounded-lg p-4 h-[520px] overflow-y-auto font-mono text-sm">
              <div className="space-y-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center space-x-3 animate-fadeIn"
                  >
                    <span className="text-gray-500 text-xs w-20">
                      {log.timestamp}
                    </span>
                    <div className={getLogColor(log.type)}>
                      {log.icon}
                    </div>
                    <span className={`${getLogColor(log.type)} flex-1`}>
                      {log.message}
                    </span>
                  </div>
                ))}
                
                {logs.length === 0 && (
                  <div className="text-gray-500 text-center py-8">
                    Initializing system monitor...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemScanner;
