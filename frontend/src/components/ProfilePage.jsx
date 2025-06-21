import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!user?.deviceCode) return;

    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`https://sniffy.onrender.com/user/allAlertsById/${user.deviceCode}`);
        if (response.data.success) {
          // Convert the dictionary of alerts to an array
          const alertsArray = Object.values(response.data.alerts);
          setAlerts(alertsArray);
        }
      } catch (error) {
        console.error('Failed to fetch alert history:', error);
      }
    };

    fetchAlerts();
  }, [user]);

  const FireBackground = () => (
    <div className="static-background">
      <div className="gradient-overlay"></div>
    </div>
  );

  return (
    <div className="page profile-page">
      <FireBackground />
      
      <header className="profile-header">
        <button onClick={() => navigate('/home')} className="back-btn">
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
            <h2>{user?.name || user?.email}</h2>
            <p>{user?.email}</p>
            <p>{user?.phone}</p>
            <p>Device: {user?.deviceCode}</p>
          </div>
        </div>

        <div className="risk-history">
          <h3>Risk History</h3>
          <div className="history-list">
            {alerts.length > 0 ? (
              alerts.map((incident, index) => (
                <div key={index} className="history-item">
                  <div className="history-date">{new Date(incident.timestamp).toLocaleDateString()}</div>
                  <div className="history-details">
                    <h4>{incident.type}</h4>
                    <span className="severity medium">
                      {incident.message}
                    </span>
                  </div>
                  <div className="history-status resolved">
                    Resolved
                  </div>
                </div>
              ))
            ) : (
              <p>No risk history found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 