import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Flame, 
  Thermometer, 
  Shield, 
  AlertTriangle, 
  User, 
  Clock, 
  ChefHat,
  Volume2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// Simulated real-time data
const useRealTimeData = () => {
  const [data, setData] = useState({
    gasLevel: 45,
    temperature: 28,
    riskStatus: 'SAFE',
    lastUpdate: new Date(),
    isOnline: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        gasLevel: Math.max(0, Math.min(100, prev.gasLevel + (Math.random() - 0.5) * 10)),
        temperature: Math.max(15, Math.min(60, prev.temperature + (Math.random() - 0.5) * 5)),
        riskStatus: Math.random() > 0.9 ? 'RISK' : 'SAFE',
        lastUpdate: new Date(),
        isOnline: Math.random() > 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const realTimeData = useRealTimeData();
  const mainRef = useRef();
  const [isVisible, setIsVisible] = useState({
    statusCards: false,
    preventionItems: false
  });

  // Scroll Animation with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const statusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, statusCards: true }));
        }
      });
    }, observerOptions);

    const preventionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, preventionItems: true }));
        }
      });
    }, observerOptions);

    const statusSection = document.querySelector('.status-section');
    const preventionSection = document.querySelector('.prevention-section');

    if (statusSection) statusObserver.observe(statusSection);
    if (preventionSection) preventionObserver.observe(preventionSection);

    return () => {
      statusObserver.disconnect();
      preventionObserver.disconnect();
    };
  }, []);

  const toggleCookingMode = () => {
    // Simulate cooking mode activation
    console.log('Cooking mode activated for 20 minutes');
  };

  const FireBackground = () => (
    <div className="static-background">
      <div className="gradient-overlay"></div>
    </div>
  );

  return (
    <div className="page home-page" ref={mainRef}>
      <FireBackground />
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Flame size={32} />
            <span>LPG Guardian</span>
          </div>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={() => navigate('/profile')} className="profile-btn">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Status Section */}
      <section className="status-section">
        <div className="status-container">
          <div className={`main-status ${realTimeData.riskStatus.toLowerCase()}`}>
            <div className="status-icon">
              {realTimeData.riskStatus === 'SAFE' ? (
                <Shield size={64} />
              ) : (
                <AlertTriangle size={64} />
              )}
            </div>
            <h2>{realTimeData.riskStatus}</h2>
            <p>System Status</p>
          </div>
          
          <div className={`status-grid ${isVisible.statusCards ? 'animate-in' : ''}`}>
            <div className="status-card" style={{ animationDelay: '0.1s' }}>
              <Activity size={32} />
              <div className="status-info">
                <h3>{realTimeData.gasLevel}%</h3>
                <p>Gas Level</p>
              </div>
            </div>
            
            <div className="status-card" style={{ animationDelay: '0.2s' }}>
              <Thermometer size={32} />
              <div className="status-info">
                <h3>{realTimeData.temperature}°C</h3>
                <p>Temperature</p>
              </div>
            </div>
            
            <div className="status-card" style={{ animationDelay: '0.3s' }}>
              <Clock size={32} />
              <div className="status-info">
                <h3>{realTimeData.isOnline ? 'Online' : 'Offline'}</h3>
                <p>Connection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Guidelines */}
      <section className="prevention-section">
        <div className="section-header">
          <h2>Safety Guidelines & Controls</h2>
          <p>Essential precautions and emergency controls for your LPG system</p>
        </div>
        
        <div className={`prevention-grid ${isVisible.preventionItems ? 'animate-in' : ''}`}>
          <div className="prevention-item cooking-mode" style={{ animationDelay: '0.1s' }}>
            <div className="prevention-icon">
              <ChefHat size={32} />
            </div>
            <h3>Cooking Mode</h3>
            <p>Temporarily override false alarms during normal cooking activities</p>
            <button onClick={toggleCookingMode} className="cooking-btn">
              <Volume2 size={20} />
              Activate (20 min)
            </button>
          </div>
          
          <div className="prevention-item" style={{ animationDelay: '0.2s' }}>
            <div className="prevention-icon">
              <AlertTriangle size={32} />
            </div>
            <h3>Emergency Protocols</h3>
            <ul>
              <li>System automatically shuts gas valve during high risk</li>
              <li>Instant WhatsApp & email alerts sent</li>
              <li>Audible alarms activate immediately</li>
              <li>LED indicators show current status</li>
            </ul>
          </div>
          
          <div className="prevention-item" style={{ animationDelay: '0.3s' }}>
            <div className="prevention-icon">
              <Shield size={32} />
            </div>
            <h3>Safety Precautions</h3>
            <ul>
              <li>Keep sensor area clean and unobstructed</li>
              <li>Regular maintenance every 6 months</li>
              <li>Test system weekly using test button</li>
              <li>Ensure Wi-Fi connectivity is stable</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 