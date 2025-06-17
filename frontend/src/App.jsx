import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Flame, 
  Thermometer, 
  Shield, 
  AlertTriangle, 
  User, 
  Clock, 
  Phone, 
  Mail, 
  Settings,
  ChefHat,
  Volume2
} from 'lucide-react';
import Registration from './Registration';
import Login from './Login';
import Welcome from './Welcome';

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

const SmartLPGSystem = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const realTimeData = useRealTimeData();
  const mainRef = useRef();
  const [isVisible, setIsVisible] = useState({
    statusCards: false,
    preventionItems: false
  });

  // Scroll Animation with Intersection Observer
  useEffect(() => {
    if (currentPage === 'home') {
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
    }
  }, [currentPage]);

  const handleRegistration = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(formData);
      setCurrentPage('home');
      setIsLoading(false);
    }, 2000);
  };

  const handleLogin = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name: 'Demo User',
        email: formData.email
      });
      setCurrentPage('home');
      setIsLoading(false);
    }, 2000);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const toggleCookingMode = () => {
    // Simulate cooking mode activation
    console.log('Cooking mode activated for 20 minutes');
  };

  const FireBackground = () => (
    <div className="static-background">
      <div className="gradient-overlay"></div>
    </div>
  );

  const Preloader = () => (
    <div className="preloader">
      <div className="fire-loader">
        <Flame size={60} className="flame-icon" />
        <div className="loading-text">Loading Smart LPG System...</div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
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
            <button onClick={() => setCurrentPage('profile')} className="profile-btn">
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

  const ProfilePage = () => {
    const riskHistory = [
      { date: '2024-06-10', type: 'Gas Leak', severity: 'Medium', resolved: true },
      { date: '2024-06-05', type: 'High Temperature', severity: 'Low', resolved: true },
      { date: '2024-05-28', type: 'Flame Detection', severity: 'High', resolved: true },
      { date: '2024-05-15', type: 'Gas Leak', severity: 'Low', resolved: true }
    ];

    return (
      <div className="page profile-page">
        <FireBackground />
        
        <header className="profile-header">
          <button onClick={() => setCurrentPage('home')} className="back-btn">
            ← Back to Home
          </button>
          <h1>User Profile</h1>
        </header>

        <div className="profile-container">
          <div className="profile-info">
            <div className="profile-avatar">
              <User size={64} />
            </div>
            <div className="profile-details">
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
              <p>{user?.phone}</p>
              <p>Device: {user?.deviceId}</p>
            </div>
          </div>

          <div className="risk-history">
            <h3>Risk History</h3>
            <div className="history-list">
              {riskHistory.map((incident, index) => (
                <div key={index} className="history-item">
                  <div className="history-date">{incident.date}</div>
                  <div className="history-details">
                    <h4>{incident.type}</h4>
                    <span className={`severity ${incident.severity.toLowerCase()}`}>
                      {incident.severity} Risk
                    </span>
                  </div>
                  <div className={`history-status ${incident.resolved ? 'resolved' : 'pending'}`}>
                    {incident.resolved ? 'Resolved' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (currentPage === 'welcome') {
    return <Welcome onNavigate={navigateToPage} />;
  }

  if (currentPage === 'register') {
    return <Registration onRegister={handleRegistration} onNavigate={navigateToPage} />;
  }

  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} onNavigate={navigateToPage} />;
  }

  return (
    <div className="app">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'profile' && <ProfilePage />}
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%);
          color: #fafafa;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          position: relative;
        }

        /* CSS Animations for Scroll Effects */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-in .status-card {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-in .prevention-item {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        /* Fire Background */
        .static-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(24, 24, 27, 0.9), rgba(39, 39, 42, 0.9));
          pointer-events: none;
        }

        /* Preloader */
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #18181b, #27272a);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .fire-loader {
          text-align: center;
        }

        .flame-icon {
          color: #ef4444;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .loading-text {
          margin: 20px 0;
          font-size: 18px;
          color: #fafafa;
        }

        .loading-bar {
          width: 200px;
          height: 4px;
          background: #3f3f46;
          border-radius: 2px;
          overflow: hidden;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #ef4444, #dc2626);
          border-radius: 2px;
          animation: loading 2s infinite;
        }

        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Registration Page */
        .registration-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .registration-container {
          background: rgba(39, 39, 42, 0.9);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.2);
          max-width: 500px;
          width: 100%;
        }

        .registration-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .header-flame {
          color: #ef4444;
          margin-bottom: 10px;
        }

        .registration-header h1 {
          font-size: 28px;
          margin-bottom: 10px;
          background: linear-gradient(45deg, #ef4444, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(63, 63, 70, 0.3);
          border-radius: 10px;
          padding: 15px;
          border: 1px solid rgba(239, 68, 68, 0.1);
          transition: all 0.3s ease;
        }

        .form-group:focus-within {
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }

        .form-group svg {
          color: #ef4444;
          margin-right: 10px;
        }

        .form-group input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #fafafa;
          font-size: 16px;
        }

        .form-group input::placeholder {
          color: #a1a1aa;
        }

        .register-btn {
          background: linear-gradient(45deg, #ef4444, #dc2626);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
        }

        .register-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Home Page */
        .home-page {
          min-height: 100vh;
        }

        .header {
          background: rgba(24, 24, 27, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(239, 68, 68, 0.2);
          padding: 20px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 24px;
          font-weight: bold;
          color: #ef4444;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .profile-btn {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          border-radius: 50%;
          padding: 10px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .profile-btn:hover {
          background: #ef4444;
          color: white;
        }

        /* Status Section */
        .status-section {
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .status-container {
          display: grid;
          gap: 30px;
        }

        .main-status {
          text-align: center;
          padding: 40px;
          border-radius: 20px;
          background: rgba(39, 39, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 2px solid;
          transition: all 0.3s ease;
        }

        .main-status.safe {
          border-color: #22c55e;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.2);
        }

        .main-status.risk {
          border-color: #ef4444;
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
          animation: pulse-danger 2s infinite;
        }

        @keyframes pulse-danger {
          0%, 100% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 50px rgba(239, 68, 68, 0.5); }
        }

        .status-icon {
          margin-bottom: 20px;
        }

        .main-status.safe .status-icon {
          color: #22c55e;
        }

        .main-status.risk .status-icon {
          color: #ef4444;
        }

        .main-status h2 {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .status-card {
          background: rgba(39, 39, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 15px;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .status-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .status-card svg {
          color: #ef4444;
        }

        .status-info h3 {
          font-size: 24px;
          margin-bottom: 5px;
        }

        .status-info p {
          color: #a1a1aa;
        }

        /* Prevention Section */
        .prevention-section {
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: 32px;
          margin-bottom: 15px;
          background: linear-gradient(45deg, #ef4444, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .prevention-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .prevention-item {
          background: rgba(39, 39, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 20px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .prevention-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .prevention-icon {
          color: #ef4444;
          margin-bottom: 20px;
        }

        .prevention-item h3 {
          font-size: 24px;
          margin-bottom: 15px;
        }

        .prevention-item ul {
          list-style: none;
          margin-top: 15px;
        }

        .prevention-item li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(239, 68, 68, 0.1);
        }

        .prevention-item li:before {
          content: "🔥";
          margin-right: 8px;
        }

        .cooking-btn {
          background: linear-gradient(45deg, #ef4444, #dc2626);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          transition: all 0.3s ease;
        }

        .cooking-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
        }

        /* Profile Page */
        .profile-page {
          min-height: 100vh;
          padding: 20px;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .back-btn {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #ef4444;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: #ef4444;
          color: white;
        }

        .profile-container {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          gap: 40px;
        }

        .profile-info {
          background: rgba(39, 39, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .profile-avatar {
          background: linear-gradient(45deg, #ef4444, #dc2626);
          border-radius: 50%;
          padding: 20px;
          color: white;
        }

        .profile-details h2 {
          margin-bottom: 10px;
          font-size: 28px;
        }

        .profile-details p {
          color: #a1a1aa;
          margin-bottom: 5px;
        }

        .risk-history {
          background: rgba(39, 39, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 20px;
          padding: 40px;
        }

        .risk-history h3 {
          font-size: 24px;
          margin-bottom: 30px;
          color: #ef4444;
        }

        .history-list {
          display: grid;
          gap: 15px;
        }

        .history-item {
          background: rgba(63, 63, 70, 0.3);
          border-radius: 10px;
          padding: 20px;
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 20px;
          align-items: center;
        }

        .history-date {
          color: #a1a1aa;
          font-size: 14px;
        }

        .history-details h4 {
          margin-bottom: 5px;
        }

        .severity {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }

        .severity.low {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .severity.medium {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .severity.high {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .history-status {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
        }

        .history-status.resolved {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .history-status.pending {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .status-grid {
            grid-template-columns: 1fr;
          }
          
          .prevention-grid {
            grid-template-columns: 1fr;
          }
          
          .profile-info {
            flex-direction: column;
            text-align: center;
          }
          
          .history-item {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SmartLPGSystem;