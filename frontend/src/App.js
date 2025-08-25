import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoaderScreen from './components/LoaderScreen';


  const App = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000); // 2s loader
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) return <LoaderScreen />;
    return <LandingPage />;
  };


export default App;
