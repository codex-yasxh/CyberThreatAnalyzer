from flask import Flask, request, jsonify
from flask_cors import CORS
from threat_analyzer import ThreatAnalyzer
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize threat analyzer
analyzer = ThreatAnalyzer()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Cyber Threat Analyzer API is running'})

@app.route('/api/scan-url', methods=['POST'])
def scan_url():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    try:
        # In a real implementation, you would use requests.get(url)
        simulated_content = f"URL: {url}\nDomain analysis and content scanning simulation"
        
        # Analyze the URL
        analysis_result = analyzer.analyze_url(url, simulated_content)
        
        return jsonify({
            'success': True,
            'analysis': analysis_result
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/system-scanner/definitions', methods=['GET'])
def get_definitions():
    """Get current virus definition counts"""
    import random
    from datetime import datetime
    
    definitions = {
        'virus': 45234 + random.randint(0, 1000),
        'malware': 12456 + random.randint(0, 500),
        'trojans': 8901 + random.randint(0, 300),
        'rootkits': 3421 + random.randint(0, 200),
        'last_update': datetime.now().isoformat()
    }
    return jsonify(definitions)

@app.route('/api/system-scanner/update', methods=['POST'])
def update_definitions():
    """Simulate definition update process"""
    import time
    import random
    from datetime import datetime
    
    time.sleep(2)  # Simulate update time
    
    updated_definitions = {
        'virus': 45234 + random.randint(50, 150),
        'malware': 12456 + random.randint(20, 70),
        'trojans': 8901 + random.randint(10, 40),
        'rootkits': 3421 + random.randint(5, 25),
        'last_update': datetime.now().isoformat(),
        'status': 'success'
    }
    return jsonify(updated_definitions)

@app.route('/api/system-scanner/logs', methods=['GET'])
def get_system_logs():
    """Get simulated system logs"""
    import random
    from datetime import datetime
    
    log_types = ['info', 'success', 'warning', 'error']
    log_messages = [
        'System scanner initialized...',
        'Virus definitions loaded successfully',
        'Suspicious network activity detected',
        'Malware signature found in memory',
        'Deep scan in progress...',
        'System integrity verified',
        'Outdated security patches detected',
        'Firewall rules updated',
        'Trojan.Win32.Generic detected',
        'Quarantine operation completed'
    ]
    
    logs = []
    for i in range(10):
        logs.append({
            'id': i,
            'type': random.choice(log_types),
            'message': random.choice(log_messages),
            'timestamp': datetime.now().isoformat()
        })
    
    return jsonify({'logs': logs})

@app.route('/api/system-stats', methods=['GET'])
def get_system_stats():
    """Get system security statistics"""
    try:
        stats = analyzer.get_system_stats()
        return jsonify({
            'success': True,
            'stats': stats
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/threat-trends', methods=['GET'])
def get_threat_trends():
    """Get threat trend data for charts"""
    try:
        trends = analyzer.get_threat_trends()
        return jsonify({
            'success': True,
            'trends': trends
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/threat-distribution', methods=['GET'])
def get_threat_distribution():
    """Get threat type distribution for pie chart"""
    try:
        distribution = analyzer.get_threat_distribution()
        return jsonify({
            'success': True,
            'distribution': distribution
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quick-scan', methods=['POST'])
def quick_scan():
    """Perform a quick system scan simulation"""
    try:
        # Simulate scanning process
        import time
        import random
        
        scan_results = {
            'scan_id': f'scan_{int(time.time())}',
            'scan_type': 'Quick Scan',
            'files_scanned': random.randint(500, 1500),
            'threats_found': random.randint(0, 5),
            'scan_duration': random.randint(30, 120),  # seconds
            'status': 'completed',
            'findings': []
        }
        
        # Add some random findings
        if scan_results['threats_found'] > 0:
            for i in range(scan_results['threats_found']):
                scan_results['findings'].append({
                    'file_path': f'C:\\Users\\temp\\file_{i+1}.tmp',
                    'threat_type': random.choice(analyzer.threat_types),
                    'severity': random.choice(['Low', 'Medium', 'High']),
                    'action_taken': random.choice(['Quarantined', 'Deleted', 'Blocked'])
                })
        
        return jsonify({
            'success': True,
            'scan_results': scan_results
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🛡️  Starting Cyber Threat Analyzer API...")
    print("📡 API will be available at: http://localhost:5000")
    print("🔍 Health check: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)
