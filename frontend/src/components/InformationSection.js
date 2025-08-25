import React from 'react';
import { AlertTriangle, Shield, Wifi } from 'lucide-react';

const InformationSection = () => {
  // Generate random but consistent data
  const generateSSLGrade = () => {
    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C', 'D', 'F'];
    return grades[Math.floor(Math.random() * grades.length)];
  };

  const generateOpenPorts = () => {
    const commonPorts = [80, 443, 22, 21, 25, 53, 110, 143, 993, 995];
    const numPorts = Math.floor(Math.random() * 3) + 1;
    const selectedPorts = [];
    for (let i = 0; i < numPorts; i++) {
      selectedPorts.push(commonPorts[Math.floor(Math.random() * commonPorts.length)]);
    }
    return selectedPorts.join(', ');
  };

  const malwareDetected = Math.random() > 0.7 ? 'Yes' : 'No';
  const sslGrade = generateSSLGrade();
  const openPorts = generateOpenPorts();

  return (
    <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
      <div className="relative">
        <h3 className="text-lg font-semibold mb-6 text-white">Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Malware Detected */}
          <div className="bg-dark-secondary p-4 rounded-lg border border-red-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-primary" />
              <span className="text-sm text-gray-400">Malware Detected</span>
            </div>
            <p className={`text-lg font-semibold ${malwareDetected === 'Yes' ? 'text-red-primary' : 'text-green-400'}`}>
              {malwareDetected}
            </p>
          </div>

          {/* SSL Grade */}
          <div className="bg-dark-secondary p-4 rounded-lg border border-red-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">SSL Grade</span>
            </div>
            <p className={`text-lg font-semibold ${
              ['A+', 'A', 'A-'].includes(sslGrade) ? 'text-green-400' :
              ['B+', 'B', 'B-'].includes(sslGrade) ? 'text-yellow-400' : 'text-red-primary'
            }`}>
              {sslGrade}
            </p>
          </div>

          {/* Open Ports */}
          <div className="bg-dark-secondary p-4 rounded-lg border border-red-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Wifi className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-gray-400">Open Ports</span>
            </div>
            <p className="text-lg font-semibold text-white font-mono">
              {openPorts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
