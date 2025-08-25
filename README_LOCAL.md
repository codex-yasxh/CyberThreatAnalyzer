# Cyber Threat Analyzer

A simple cybersecurity threat detection and analysis tool with a modern dashboard interface.

## Features
- Mock malware detection algorithms
- Threat risk scoring and analysis
- Interactive dashboard with charts and gauges
- File upload simulation for threat scanning
- Real-time threat monitoring display

## Tech Stack
- **Backend**: Python with Flask
- **Frontend**: React.js with Tailwind CSS
- **Charts**: Chart.js for visualizations
- **No external APIs**: All detection logic is simulated locally

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Usage
1. Start both backend and frontend servers
2. Open http://localhost:3000 in your browser
3. Upload files for threat analysis
4. View threat detection results and risk assessments
5. Monitor security metrics through interactive charts

## Project Structure
```
cyber-threat-analyzer/
├── backend/
│   ├── app.py
│   ├── threat_analyzer.py
│   ├── requirements.txt
│   └── sample_data/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```
