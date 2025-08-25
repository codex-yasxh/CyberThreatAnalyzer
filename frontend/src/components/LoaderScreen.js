// LoaderScreen.js
import React from "react";

const LoaderScreen = () => (
  <div id="loading-screen" style={{
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
    background: "#121212",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <div className="loading-logo" style={{ marginBottom: 16 }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff3b3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    </div>
    <div className="loading-text" style={{
      color: "#fff",
      fontSize: 24,
      fontWeight: "bold",
      letterSpacing: 1,
      marginBottom: 24
    }}>
      WebSec Visualizer
    </div>
    <div className="loading-dots" style={{ display: "flex", gap: 8 }}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
    <style>{`
      .dot {
        width: 12px;
        height: 12px;
        background: #ff3b3f;
        border-radius: 50%;
        opacity: 0.7;
        animation: bounce 1s infinite alternate;
        margin: 0 4px;
      }
      .dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      .dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      @keyframes bounce {
        to {
          transform: translateY(-12px);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

export default LoaderScreen;
