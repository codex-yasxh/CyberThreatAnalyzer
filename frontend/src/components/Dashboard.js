import React, { useState, useEffect } from 'react';
import { FileText, Home, Skull, Bug, Zap, Terminal } from 'lucide-react';
import ThreatChart from './ThreatChart';
import RiskGauge from './RiskGauge';
import SystemStats from './SystemStats';
import OverallRiskGauge from './OverallRiskGauge';
import RiskBreakdownChart from './RiskBreakdownChart';
import SecurityHeaders from './SecurityHeaders';
import DetectedTechnologies from './DetectedTechnologies';
import InformationSection from './InformationSection';
import VulnerabilityTrend from './VulnerabilityTrend';
import AdditionalSecurityMetrics from './AdditionalSecurityMetrics';
import SystemScannerBox from './SystemScannerBox';
import SystemScanner from './SystemScanner';
import axios from 'axios';

const Dashboard = ({ onBackToLanding }) => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'scanner'
  const [systemStats, setSystemStats] = useState(null);
  const [threatTrends, setThreatTrends] = useState([]);
  const [threatDistribution, setThreatDistribution] = useState({});
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    fetchSystemStats();
    fetchThreatTrends();
    fetchThreatDistribution();
  }, []);

  const fetchSystemStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/system-stats');
      setSystemStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching system stats:', error);
      // Set fallback data if API fails
      setSystemStats({
        cpu_usage: 45,
        memory_usage: 67,
        disk_usage: 32,
        network_activity: 'Normal',
        active_threats: 3,
        last_scan: '2 hours ago',
        firewall_status: 'Active',
        real_time_protection: 'Enabled',
        total_scans: 12345,
        threats_blocked: 78,
        files_quarantined: 12,
        system_health: 'Good'
      });
    }
  };

  const fetchThreatTrends = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/threat-trends');
      setThreatTrends(response.data.trends);
    } catch (error) {
      console.error('Error fetching threat trends:', error);
      // Set fallback data if API fails
      setThreatTrends([
        { date: '2024-08-12', threats_detected: 12, files_scanned: 1500, blocked_attempts: 8 },
        { date: '2024-08-13', threats_detected: 8, files_scanned: 1200, blocked_attempts: 5 },
        { date: '2024-08-14', threats_detected: 15, files_scanned: 1800, blocked_attempts: 12 },
        { date: '2024-08-15', threats_detected: 6, files_scanned: 900, blocked_attempts: 3 },
        { date: '2024-08-16', threats_detected: 20, files_scanned: 2100, blocked_attempts: 18 },
        { date: '2024-08-17', threats_detected: 11, files_scanned: 1600, blocked_attempts: 9 },
        { date: '2024-08-18', threats_detected: 14, files_scanned: 1750, blocked_attempts: 11 }
      ]);
    }
  };

  const fetchThreatDistribution = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/threat-distribution');
      setThreatDistribution(response.data.distribution);
    } catch (error) {
      console.error('Error fetching threat distribution:', error);
      // Set fallback data if API fails
      setThreatDistribution({
        'Malware': 45,
        'Viruses': 32,
        'Trojans': 28,
        'Spyware': 19,
        'Adware': 15,
        'Rootkits': 12
      });
    }
  };

  const handleQuickScan = async () => {
    setIsScanning(true);
    try {
      const response = await axios.post('http://localhost:5000/api/quick-scan');
      setScanResults(response.data.scan_results);
    } catch (error) {
      console.error('Error performing quick scan:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleScanUrl = async () => {
    if (!newUrl.trim()) return;
    
    setIsScanning(true);
    try {
      const response = await axios.post('http://localhost:5000/api/scan-url', {
        url: newUrl
      });
      
      if (response.data.success) {
        setScanResults(response.data.analysis);
      }
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleNavigateToScanner = () => {
    setCurrentView('scanner');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-green-500';
    }
  };

  // Render System Scanner if current view is scanner
  if (currentView === 'scanner') {
    return <SystemScanner onBackToDashboard={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white p-6">
      {/* Malware-styled Header */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-primary/10 to-transparent rounded-lg"></div>
        <div className="relative bg-dark-card border border-red-primary/30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Skull className="w-10 h-10 text-red-primary animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-primary rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-red-primary">THREAT DETECTION ACTIVE</h1>
                <p className="text-sm text-gray-400 flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span>WebSec Visualizer v2.0 - Malware Analysis Engine</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToLanding}
                className="flex items-center space-x-2 bg-dark-secondary hover:bg-red-primary/20 border border-red-primary/50 px-4 py-2 rounded-lg transition-all text-red-primary hover:text-white"
              >
                <Home className="w-4 h-4" />
                <span>Back to Landing</span>
              </button>
              <div className="flex items-center space-x-2">
                <Bug className="w-4 h-4 text-red-primary animate-bounce" />
                <span className="text-sm text-red-primary font-mono">SCANNING MODE</span>
              </div>
              <button
                onClick={handleQuickScan}
                disabled={isScanning}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-primary to-red-accent hover:from-red-secondary hover:to-red-primary px-4 py-2 rounded-lg transition-all disabled:opacity-50 animate-glow"
              >
                <Zap className="w-4 h-4" />
                <span>{isScanning ? 'SCANNING...' : 'DEEP SCAN'}</span>
              </button>
            </div>
          </div>
          
          {/* New URL Input in Dashboard */}
          <div className="mt-6 pt-6 border-t border-red-primary/20">
            <div className="flex items-center space-x-4">
              <Terminal className="w-5 h-5 text-red-primary" />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Enter new target URL for analysis..."
                  className="w-full bg-dark-secondary border border-red-primary/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-primary focus:border-transparent font-mono"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-primary">
                  <Skull className="w-4 h-4" />
                </div>
              </div>
              <button
                onClick={handleScanUrl}
                className="bg-red-primary hover:bg-red-secondary px-6 py-2 rounded-lg transition-colors font-mono text-sm"
              >
                ANALYZE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats Cards */}
      {systemStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-red-primary text-sm font-mono">TOTAL SCANS</p>
                <p className="text-3xl font-bold text-white font-mono">{systemStats.total_scans?.toLocaleString?.() ?? systemStats.total_scans}</p>
              </div>
              <div className="relative">
                <FileText className="w-8 h-8 text-red-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-primary/10 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-red-primary text-sm font-mono">THREATS BLOCKED</p>
                <p className="text-3xl font-bold text-red-primary font-mono animate-pulse">{systemStats.threats_blocked}</p>
              </div>
              <Skull className="w-8 h-8 text-red-primary animate-bounce" />
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-xl border border-red-accent/30 relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-red-accent/50 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-accent/5 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-red-accent text-sm font-mono">QUARANTINED</p>
                <p className="text-3xl font-bold text-red-accent font-mono">{systemStats.files_quarantined}</p>
              </div>
              <Bug className="w-8 h-8 text-red-accent animate-pulse" />
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-xl border border-red-secondary/30 relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-red-secondary/50 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-secondary/5 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-red-secondary text-sm font-mono">SYSTEM STATUS</p>
                <p className={`text-3xl font-bold font-mono ${getRiskColor(systemStats.system_health)}`}>
                  {systemStats.system_health?.toUpperCase?.() ?? systemStats.system_health}
                </p>
              </div>
              <Terminal className="w-8 h-8 text-red-secondary animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overall Risk and Risk Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
              <OverallRiskGauge 
                systemStats={systemStats} 
                threatData={threatDistribution}
                scanResults={scanResults}
              />
            </div>
            <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
              <RiskBreakdownChart 
                systemStats={systemStats}
                scanResults={scanResults}
                threatData={threatDistribution}
              />
            </div>
          </div>

          {/* Security Headers and Detected Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
              <SecurityHeaders />
            </div>
            <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
              <DetectedTechnologies />
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <InformationSection />
          </div>

          {/* Threat Trends Chart */}
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
            <div className="relative">
              <h2 className="text-xl font-semibold mb-4 text-red-primary font-mono flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                THREAT TRENDS (7 DAYS)
              </h2>
              <ThreatChart data={threatTrends} />
            </div>
          </div>

          {/* System Scanner Box (keeps internal behavior) */}
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <SystemScannerBox onNavigateToScanner={handleNavigateToScanner} />
          </div>

          {/* Additional Security Metrics */}
          <div className="mt-8 bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <h2 className="text-xl font-semibold mb-6 text-red-primary font-mono flex items-center">
              <Bug className="w-5 h-5 mr-2" />
              SECURITY ANALYSIS
            </h2>
            <AdditionalSecurityMetrics />
          </div>

          {/* Quick Scan Results */}
          {scanResults && (
            <div className="bg-dark-card p-6 rounded-xl border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50 cursor-pointer">
              <h2 className="text-xl font-semibold mb-4">Latest Scan Results</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyber-blue">{scanResults.files_scanned}</p>
                    <p className="text-sm text-gray-400">Files Scanned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyber-red">{scanResults.threats_found}</p>
                    <p className="text-sm text-gray-400">Threats Found</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyber-green">{scanResults.scan_duration}s</p>
                    <p className="text-sm text-gray-400">Scan Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-500">{scanResults.status}</p>
                    <p className="text-sm text-gray-400">Status</p>
                  </div>
                </div>
                
                {scanResults.findings && scanResults.findings.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Findings:</h3>
                    <div className="space-y-2">
                      {scanResults.findings.map((finding, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{finding.file_path}</p>
                              <p className="text-sm text-gray-400">{finding.threat_type}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded text-xs ${
                                finding.severity === 'High' ? 'bg-red-600' :
                                finding.severity === 'Medium' ? 'bg-yellow-600' : 'bg-blue-600'
                              }`}>
                                {finding.severity}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">{finding.action_taken}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <VulnerabilityTrend />
          </div>

          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <RiskGauge 
              value={systemStats?.threats_blocked} 
              systemStats={systemStats}
            />
          </div>

          <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <SystemStats stats={systemStats} onNavigateToScanner={handleNavigateToScanner} />
          </div>

          {/* Threat Distribution */}
          <div className="bg-dark-card p-6 rounded-xl border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:border-red-primary/50">
            <h2 className="text-xl font-semibold mb-4">Threat Types</h2>
            <div className="space-y-3">
              {Object.entries(threatDistribution).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm">{type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-cyber-blue h-2 rounded-full" 
                        style={{ width: `${(count / Math.max(...Object.values(threatDistribution))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;