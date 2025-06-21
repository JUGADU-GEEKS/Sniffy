import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Shield, 
  AlertTriangle, 
  User, 
  ChefHat,
  Volume2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import AlertPopup from './AlertPopup';

const useLiveStatus = (deviceCode) => {
  const [liveStatus, setLiveStatus] = useState('Normal');

  useEffect(() => {
    if (!deviceCode) return;

    const fetchStatus = async () => {
      try {
        const response = await axios.get(`https://sniffy.onrender.com/user/liveStatusById/${deviceCode}`);
        if (response.data.success) {
          setLiveStatus(response.data.liveStatus);
        }
      } catch (error) {
        console.error('Failed to fetch live status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [deviceCode]);

  return liveStatus;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const liveStatus = useLiveStatus(user?.deviceCode);
  const mainRef = useRef();
  
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
            <span>Welcome, {user?.name || user?.email}</span>
            <button onClick={() => navigate('/profile')} className="profile-btn">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Status Section */}
      <section className="status-section">
        <div className="status-container">
          <div className={`main-status ${liveStatus.toLowerCase()}`}>
            <div className="status-icon">
              {liveStatus === 'Normal' ? (
                <Shield size={64} />
              ) : (
                <AlertTriangle size={64} />
              )}
            </div>
            <h2>{liveStatus}</h2>
            <p>System Status</p>
          </div>
        </div>
      </section>

      {/* Prevention Guidelines */}
      <section className="prevention-section">
        <div className="section-header">
          <h2>Safety Guidelines & Controls</h2>
          <p>Essential precautions and emergency controls for your LPG system</p>
        </div>
        
        <div className="prevention-grid">
          <div className="prevention-item cooking-mode">
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
          
          <div className="prevention-item">
            <div className="prevention-icon">
              <AlertTriangle size={32} />
            </div>
            <h3>Emergency Protocols</h3>
            <ul>
              <li>Instant WhatsApp & email alerts sent</li>
              <li>Audible alarms activate immediately</li>
              <li>LED indicators show current status</li>
            </ul>
          </div>
          
          <div className="prevention-item">
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
      <AlertPopup />
    </div>
  );
};

export default HomePage; 