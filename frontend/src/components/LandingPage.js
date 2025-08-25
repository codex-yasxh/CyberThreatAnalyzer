import React, { useState } from 'react';
import { Github, Twitter, Mail, Shield, Search, Globe, Lock, Eye, Server, Zap } from 'lucide-react';
import Dashboard from './Dashboard';

const LandingPage = () => {
  const [url, setUrl] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 2000);
  };

  const recommendedUrls = [
    'https://google.com',
    'https://github.com',
    'http://testphp.vulnweb.com',
    'https://badssl.com',
    'http://malicious-site.com'
  ];

  const services = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'SSL/TLS Analysis',
      description: 'Comprehensive SSL certificate validation and security assessment',
      color: 'red-primary'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security Headers',
      description: 'Analyze HTTP security headers and configuration vulnerabilities',
      color: 'red-accent'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Malware Detection',
      description: 'Advanced threat detection and malicious content identification',
      color: 'red-secondary'
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: 'Tech Stack Analysis',
      description: 'Identify technologies, frameworks, and potential security risks',
      color: 'red-primary'
    }
  ];

  const features = [
    {
      title: 'Real-time Scanning',
      description: 'Instant security analysis with live threat detection'
    },
    {
      title: 'Comprehensive Reports',
      description: 'Detailed security assessments with actionable insights'
    },
    {
      title: 'No External Dependencies',
      description: 'Fully self-contained security analysis platform'
    },
    {
      title: 'Modern Interface',
      description: 'Intuitive dashboard with interactive visualizations'
    }
  ];

  if (showResults) {
    return <Dashboard onBackToLanding={() => setShowResults(false)} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="bg-dark-secondary border-b border-red-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-primary rounded-lg flex items-center justify-center animate-glow">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">WebSec</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://github.com" className="text-gray-400 hover:text-red-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-red-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:contact@websec.com" className="text-gray-400 hover:text-red-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-red-primary to-red-accent rounded-full flex items-center justify-center animate-float">
                <Shield className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-red-primary rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-primary to-red-accent bg-clip-text text-transparent">
            WebSec Visualizer
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Advanced web security analysis platform that provides comprehensive threat detection, 
            vulnerability assessment, and real-time security monitoring for websites and web applications.
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Identify security vulnerabilities, analyze SSL certificates, detect malware, 
            and get detailed insights into your web application's security posture.
          </p>

          {/* URL Scanner Box */}
          <div className="bg-dark-card border border-red-primary/30 rounded-2xl p-8 mb-16 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-red-primary">Enter Website URL</h2>
            
            <form onSubmit={handleScan} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-dark-secondary border border-gray-600 rounded-xl px-6 py-4 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-primary focus:border-transparent transition-all"
                  disabled={isScanning}
                />
                <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              </div>
              
              <button
                type="submit"
                disabled={!url.trim() || isScanning}
                className="w-full bg-gradient-to-r from-red-primary to-red-accent hover:from-red-secondary hover:to-red-primary disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 text-lg"
              >
                {isScanning ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6" />
                    <span>Scan Website</span>
                  </>
                )}
              </button>
            </form>

            {/* Recommended URLs */}
            <div className="mt-8">
              <p className="text-sm text-gray-400 mb-4">Try these sample URLs:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {recommendedUrls.map((sampleUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setUrl(sampleUrl)}
                    className="px-4 py-2 bg-dark-secondary hover:bg-red-primary/20 border border-gray-600 hover:border-red-primary/50 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
                  >
                    {sampleUrl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-dark-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-red-primary">Our Security Services</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Comprehensive web security analysis tools to protect your digital assets
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-dark-card border border-gray-700 hover:border-red-primary/50 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
              >
                <div className={`text-${service.color} mb-4 flex justify-center group-hover:animate-bounce`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-red-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-red-primary">Why Choose WebSec Visualizer?</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Advanced security analysis with cutting-edge technology and user-friendly interface
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-dark-card border border-gray-700 rounded-xl p-6 hover:border-red-primary/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-red-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-secondary border-t border-red-primary/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">WebSec Visualizer</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Advanced web security analysis platform providing comprehensive threat detection 
                and vulnerability assessment for modern web applications.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-primary">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">SSL Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security Headers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Malware Detection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tech Stack Analysis</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-primary">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WebSec Visualizer. All rights reserved. Built for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
