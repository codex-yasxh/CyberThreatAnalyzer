import React from 'react';

const DetectedTechnologies = () => {
  const technologies = [
    { name: 'Nginx', color: '#ff4444' },
    { name: 'Ubuntu', color: '#ff6666' },
    { name: 'jQuery', color: '#ff8888' },
    { name: 'Google Analytics', color: '#ffaaaa' },
  ];

  return (
    <div className="bg-dark-card p-6 rounded-xl border border-red-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary/5 to-transparent"></div>
      <div className="relative">
        <h3 className="text-lg font-semibold mb-4 text-white">Detected Technologies</h3>
        <div className="space-y-3">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tech.color }}
              ></div>
              <span className="text-gray-300">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetectedTechnologies;
