import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, AlertTriangle, CheckCircle, X } from 'lucide-react';
import axios from 'axios';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsAnalyzing(true);
    
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/api/scan-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          analysis: response.data.analysis,
          status: 'completed'
        };

        setUploadedFiles(prev => [...prev, newFile]);
      } catch (error) {
        console.error('Error analyzing file:', error);
        const errorFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          analysis: null,
          status: 'error',
          error: 'Failed to analyze file'
        };
        setUploadedFiles(prev => [...prev, errorFile]);
      }
    }
    
    setIsAnalyzing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'text/*': ['.txt', '.log', '.js', '.py', '.html', '.css'],
      'application/*': ['.exe', '.bat', '.sh', '.json', '.xml']
    }
  });

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
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
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-cyber-blue bg-cyber-blue/5 cyber-glow'
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload className={`w-12 h-12 ${isDragActive ? 'text-cyber-blue' : 'text-gray-400'}`} />
          <div>
            <p className="text-lg font-medium">
              {isDragActive ? 'Drop files here to scan' : 'Drop files here or click to browse'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Supports: .txt, .log, .js, .py, .html, .css, .exe, .bat, .sh, .json, .xml
            </p>
          </div>
          {isAnalyzing && (
            <div className="flex items-center space-x-2 text-cyber-blue">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-blue"></div>
              <span className="text-sm">Analyzing files...</span>
            </div>
          )}
        </div>
      </div>

      {/* File Results */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Scan Results</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <File className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium truncate">{file.name}</p>
                        <span className="text-xs text-gray-400">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      
                      {file.status === 'error' ? (
                        <p className="text-red-400 text-sm mt-1">{file.error}</p>
                      ) : file.analysis ? (
                        <div className="mt-3 space-y-2">
                          {/* Risk Level */}
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getRiskColor(file.analysis.risk_level)}`}>
                              {getRiskIcon(file.analysis.risk_level)}
                              <span>{file.analysis.risk_level}</span>
                            </span>
                            <span className="text-sm text-gray-400">
                              Threat Score: {file.analysis.threat_score}/100
                            </span>
                          </div>

                          {/* File Hash */}
                          <div className="text-xs text-gray-400">
                            Hash: <span className="font-mono">{file.analysis.file_hash}</span>
                          </div>

                          {/* Threats Detected */}
                          {file.analysis.threats_detected.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-300 mb-2">
                                Threats Detected ({file.analysis.threats_detected.length}):
                              </p>
                              <div className="space-y-2">
                                {file.analysis.threats_detected.map((threat, index) => (
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
                            Scanned: {new Date(file.analysis.scan_time).toLocaleString()}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(file.id)}
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

export default FileUpload;
