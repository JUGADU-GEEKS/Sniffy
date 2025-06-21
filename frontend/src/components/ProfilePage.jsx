import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const riskHistory = [
    { date: '2024-06-10', type: 'Gas Leak', severity: 'Medium', resolved: true },
    { date: '2024-06-05', type: 'High Temperature', severity: 'Low', resolved: true },
    { date: '2024-05-28', type: 'Flame Detection', severity: 'High', resolved: true },
    { date: '2024-05-15', type: 'Gas Leak', severity: 'Low', resolved: true }
  ];

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

export default ProfilePage; 