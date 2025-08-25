import React from 'react';

const SecurityHeaders = () => {
  const headers = [
    { name: 'Strict-Transport-Security', score: 85, color: '#ff4444' },
    { name: 'X-Content-Type-Options', score: 70, color: '#ff6666' },
    { name: 'X-Frame-Options', score: 60, color: '#ff8888' },
    { name: 'X-XSS-Protection', score: 45, color: '#ffaaaa' },
  ];

  return (
    <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
      <div className="relative">
        <h3 className="text-lg font-semibold mb-6 text-white">Security Headers</h3>
        <div className="space-y-4">
          {headers.map((header, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{header.name}</span>
                <span className="text-gray-400">{header.score}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${header.score}%`,
                    backgroundColor: header.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityHeaders;
