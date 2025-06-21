import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle, X } from 'lucide-react';
import './AlertPopup.css';

const AlertPopup = () => {
  const [alerts, setAlerts] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('https://sniffy.onrender.com/alert/getLastAlerts');
        if (response.data.success) {
          setAlerts(response.data.alerts);
        }
      } catch (error) {
        console.error('Failed to fetch last 5 alerts:', error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (!alerts.length || !visible) {
    return null;
  }

  return (
    <div className="alert-popup-container">
      <button onClick={() => setVisible(false)} className="close-btn">
        <X size={20} />
      </button>
      <h3>Recent Alerts</h3>
      {alerts.map(alert => (
        <div key={alert._id} className="alert-item">
          <AlertTriangle size={20} />
          <div className="alert-details">
            <strong>{alert.type}</strong>
            <p>{alert.message}</p>
            <small>{new Date(alert.timestamp).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertPopup; 