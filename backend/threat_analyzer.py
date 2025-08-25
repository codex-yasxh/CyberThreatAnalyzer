import hashlib
import random
import time
from datetime import datetime, timedelta
import os

class ThreatAnalyzer:
    def __init__(self):
        # Mock threat signatures (simplified hashes)
        self.known_threats = {
            'malware_signatures': [
                'a1b2c3d4e5f6',
                '9f8e7d6c5b4a',
                'deadbeefcafe',
                '1337h4x0r123'
            ],
            'suspicious_patterns': [
                '.exe',
                'powershell',
                'cmd.exe',
                'registry',
                'autorun'
            ]
        }
        
        self.threat_types = [
            'Trojan', 'Virus', 'Worm', 'Spyware', 'Adware', 
            'Ransomware', 'Rootkit', 'Backdoor'
        ]
    
    def calculate_file_hash(self, file_content):
        """Calculate MD5 hash of file content"""
        return hashlib.md5(file_content.encode()).hexdigest()[:12]
    
    def analyze_file(self, filename, file_content):
        """Analyze a file for potential threats"""
        file_hash = self.calculate_file_hash(file_content)
        
        # Mock threat detection logic
        threat_score = 0
        detected_threats = []
        
        # Check against known malware signatures
        if file_hash in self.known_threats['malware_signatures']:
            threat_score += 80
            detected_threats.append({
                'type': random.choice(self.threat_types),
                'severity': 'High',
                'description': f'Known malware signature detected: {file_hash}'
            })
        
        # Check for suspicious patterns in filename
        filename_lower = filename.lower()
        for pattern in self.known_threats['suspicious_patterns']:
            if pattern in filename_lower:
                threat_score += 20
                detected_threats.append({
                    'type': 'Suspicious Activity',
                    'severity': 'Medium',
                    'description': f'Suspicious pattern detected: {pattern}'
                })
        
        # Random threat detection for demo purposes
        if random.random() < 0.3:  # 30% chance of detecting something
            threat_score += random.randint(10, 50)
            detected_threats.append({
                'type': random.choice(self.threat_types),
                'severity': random.choice(['Low', 'Medium', 'High']),
                'description': 'Behavioral analysis detected suspicious activity'
            })
        
        # Determine risk level
        if threat_score >= 70:
            risk_level = 'Critical'
        elif threat_score >= 50:
            risk_level = 'High'
        elif threat_score >= 30:
            risk_level = 'Medium'
        elif threat_score >= 10:
            risk_level = 'Low'
        else:
            risk_level = 'Safe'
        
        return {
            'filename': filename,
            'file_hash': file_hash,
            'threat_score': min(threat_score, 100),
            'risk_level': risk_level,
            'threats_detected': detected_threats,
            'scan_time': datetime.now().isoformat(),
            'file_size': len(file_content)
        }
    
    def analyze_url(self, url, content):
        """Analyze a URL for potential threats"""
        url_hash = self.calculate_file_hash(content)
        
        # Mock URL threat detection logic
        threat_score = 0
        detected_threats = []
        
        # Check for suspicious domains
        suspicious_domains = [
            'malicious-site.com',
            'phishing-bank.net',
            'fake-security.org',
            'virus-download.exe',
            'suspicious-domain.ru'
        ]
        
        url_lower = url.lower()
        for domain in suspicious_domains:
            if domain in url_lower:
                threat_score += 70
                detected_threats.append({
                    'type': 'Malicious Domain',
                    'severity': 'High',
                    'description': f'Known malicious domain detected: {domain}'
                })
        
        # Check for suspicious URL patterns
        suspicious_url_patterns = [
            'phishing',
            'malware',
            'virus',
            'trojan',
            'download.exe',
            'banking-login',
            'secure-update'
        ]
        
        for pattern in suspicious_url_patterns:
            if pattern in url_lower:
                threat_score += 30
                detected_threats.append({
                    'type': 'Suspicious URL Pattern',
                    'severity': 'Medium',
                    'description': f'Suspicious URL pattern detected: {pattern}'
                })
        
        # Check for HTTP vs HTTPS
        if url.startswith('http://'):
            threat_score += 15
            detected_threats.append({
                'type': 'Insecure Connection',
                'severity': 'Low',
                'description': 'Website uses insecure HTTP protocol'
            })
        
        # Random threat detection for demo
        if random.random() < 0.4:  # 40% chance for URLs
            threat_score += random.randint(10, 40)
            detected_threats.append({
                'type': random.choice(['Phishing', 'Malware Distribution', 'Data Harvesting']),
                'severity': random.choice(['Low', 'Medium', 'High']),
                'description': 'URL reputation analysis flagged potential threats'
            })
        
        # Determine risk level
        if threat_score >= 70:
            risk_level = 'Critical'
        elif threat_score >= 50:
            risk_level = 'High'
        elif threat_score >= 30:
            risk_level = 'Medium'
        elif threat_score >= 10:
            risk_level = 'Low'
        else:
            risk_level = 'Safe'
        
        return {
            'url': url,
            'url_hash': url_hash,
            'threat_score': min(threat_score, 100),
            'risk_level': risk_level,
            'threats_detected': detected_threats,
            'scan_time': datetime.now().isoformat(),
            'protocol': 'HTTPS' if url.startswith('https://') else 'HTTP',
            'domain': url.split('/')[2] if len(url.split('/')) > 2 else url
        }
    
    def get_system_stats(self):
        """Generate mock system security statistics"""
        return {
            'total_scans': random.randint(1500, 3000),
            'threats_blocked': random.randint(50, 200),
            'files_quarantined': random.randint(10, 50),
            'last_update': (datetime.now() - timedelta(hours=random.randint(1, 24))).isoformat(),
            'system_health': random.choice(['Good', 'Fair', 'Needs Attention']),
            'active_protection': True,
            'real_time_scanning': True
        }
    
    def get_threat_trends(self):
        """Generate mock threat trend data for charts"""
        days = 7
        trends = []
        
        for i in range(days):
            date = datetime.now() - timedelta(days=days-i-1)
            trends.append({
                'date': date.strftime('%Y-%m-%d'),
                'threats_detected': random.randint(5, 25),
                'files_scanned': random.randint(100, 500),
                'blocked_attempts': random.randint(2, 15)
            })
        
        return trends
    
    def get_threat_distribution(self):
        """Get distribution of threat types for pie chart"""
        distribution = {}
        for threat_type in self.threat_types:
            distribution[threat_type] = random.randint(1, 20)
        
        return distribution
