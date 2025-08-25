import React, { useState } from 'react';
import { Search, Globe, AlertTriangle, CheckCircle, X, Loader } from 'lucide-react';
import axios from 'axios';

const UrlScanner = () => {
  const [url, setUrl] = useState('');
  const [scannedUrls, setScannedUrls] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsScanning(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/scan-url', {
        url: url.trim()
      });

      const newScan = {
        id: Date.now() + Math.random(),
        url: url.trim(),
        analysis: response.data.analysis,
        status: 'completed'
      };

      setScannedUrls(prev => [newScan, ...prev]);
      setUrl('');
    } catch (error) {
      console.error('Error scanning URL:', error);
      const errorScan = {
        id: Date.now() + Math.random(),
        url: url.trim(),
        analysis: null,
        status: 'error',
        error: error.response?.data?.error || 'Failed to scan URL'
      };
      setScannedUrls(prev => [errorScan, ...prev]);
    } finally {
      setIsScanning(false);
    }
  };

  const removeUrl = (urlId) => {
    setScannedUrls(prev => prev.filter(item => item.id !== urlId));
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-green-500 bg-green-500/10 border-green-500/20';
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Input Form */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <form onSubmit={handleScan} className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-cyber-blue" />
            <h3 className="text-lg font-semibold">URL Threat Scanner</h3>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to scan (e.g., https://example.com)"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
              disabled={isScanning}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isScanning ? (
                <Loader className="w-5 h-5 text-cyber-blue animate-spin" />
              ) : (
                <Search className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!url.trim() || isScanning}
            className="w-full bg-cyber-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isScanning ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Scanning URL...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Scan URL</span>
              </>
            )}
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-400">
          <p>• Enter any URL to analyze for potential security threats</p>
          <p>• System checks for malicious domains, suspicious patterns, and security issues</p>
          <p>• Results include threat score, risk level, and detailed findings</p>
        </div>
      </div>

      {/* Scanning Animation */}
      {isScanning && (
        <div className="bg-gray-800 rounded-xl p-6 border border-cyber-blue cyber-glow">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-6 h-6 text-cyber-blue animate-pulse" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-cyber-blue">Analyzing URL...</h3>
              <div className="mt-2 space-y-1">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                  <span>Checking domain reputation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span>Analyzing URL patterns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span>Performing security assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {scannedUrls.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Scan Results</h3>
          <div className="space-y-3">
            {scannedUrls.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Globe className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium truncate">{item.url}</p>
                      </div>
                      
                      {item.status === 'error' ? (
                        <p className="text-red-400 text-sm mt-1">{item.error}</p>
                      ) : item.analysis ? (
                        <div className="mt-3 space-y-2">
                          {/* Risk Level */}
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getRiskColor(item.analysis.risk_level)}`}>
                              {getRiskIcon(item.analysis.risk_level)}
                              <span>{item.analysis.risk_level}</span>
                            </span>
                            <span className="text-sm text-gray-400">
                              Threat Score: {item.analysis.threat_score}/100
                            </span>
                          </div>

                          {/* URL Details */}
                          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                            <div>Domain: <span className="text-gray-300">{item.analysis.domain}</span></div>
                            <div>Protocol: <span className={`${item.analysis.protocol === 'HTTPS' ? 'text-green-400' : 'text-yellow-400'}`}>{item.analysis.protocol}</span></div>
                          </div>

                          {/* URL Hash */}
                          <div className="text-xs text-gray-400">
                            Hash: <span className="font-mono">{item.analysis.url_hash}</span>
                          </div>

                          {/* Threats Detected */}
                          {item.analysis.threats_detected.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-300 mb-2">
                                Threats Detected ({item.analysis.threats_detected.length}):
                              </p>
                              <div className="space-y-2">
                                {item.analysis.threats_detected.map((threat, index) => (
                                  <div key={index} className="bg-gray-900 p-2 rounded border-l-4 border-red-500">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="text-sm font-medium text-red-400">{threat.type}</p>
                                        <p className="text-xs text-gray-400">{threat.description}</p>
                                      </div>
                                      <span className={`px-2 py-1 rounded text-xs ${
                                        threat.severity === 'High' ? 'bg-red-600 text-white' :
                                        threat.severity === 'Medium' ? 'bg-yellow-600 text-white' :
                                        'bg-blue-600 text-white'
                                      }`}>
                                        {threat.severity}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Scan Time */}
                          <div className="text-xs text-gray-500">
                            Scanned: {new Date(item.analysis.scan_time).toLocaleString()}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeUrl(item.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlScanner;
