import React from 'react';
import { Lock, Eye, Server, Database, Zap, Globe } from 'lucide-react';

const AdditionalSecurityMetrics = () => {
  // Generate random security metrics
  const generateMetrics = () => {
    return [
      {
        icon: <Lock className="w-5 h-5" />,
        title: 'HTTPS Status',
        value: Math.random() > 0.3 ? 'Enabled' : 'Disabled',
        color: Math.random() > 0.3 ? 'text-green-400' : 'text-red-primary'
      },
      {
        icon: <Eye className="w-5 h-5" />,
        title: 'Privacy Score',
        value: `${Math.floor(Math.random() * 40) + 60}/100`,
        color: 'text-yellow-400'
      },
      {
        icon: <Server className="w-5 h-5" />,
        title: 'Server Response',
        value: `${Math.floor(Math.random() * 500) + 200}ms`,
        color: 'text-blue-400'
      },
      {
        icon: <Database className="w-5 h-5" />,
        title: 'Data Leaks',
        value: Math.floor(Math.random() * 3),
        color: Math.floor(Math.random() * 3) > 0 ? 'text-red-primary' : 'text-green-400'
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: 'Performance',
        value: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
        color: 'text-cyan-400'
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: 'CDN Status',
        value: Math.random() > 0.4 ? 'Active' : 'Inactive',
        color: Math.random() > 0.4 ? 'text-green-400' : 'text-orange-400'
      }
    ];
  };

  const metrics = generateMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-dark-card p-4 rounded-xl border border-red-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="text-red-primary">
                {metric.icon}
              </div>
              <span className={`text-lg font-bold ${metric.color}`}>
                {metric.value}
              </span>
            </div>
            <p className="text-sm text-gray-400">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdditionalSecurityMetrics;
