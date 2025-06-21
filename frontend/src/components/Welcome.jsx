import React from 'react';
import { Flame, Shield, AlertTriangle, ChefHat, Bell, Mail, Phone, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="fire-background">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="fire-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <Flame size={64} className="header-flame" />
            <h1>LPG Guardian</h1>
          </div>
          <p className="hero-subtitle">Your Smart LPG Safety System</p>
          <div className="hero-cta">
            <button onClick={() => navigate('/register')} className="cta-button primary">
              Get Started
            </button>
            <button onClick={() => navigate('/login')} className="cta-button secondary">
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose LPG Guardian?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Shield size={40} />
            <h3>Real-time Monitoring</h3>
            <p>24/7 monitoring of gas levels and temperature to prevent accidents</p>
          </div>
          <div className="feature-card">
            <Bell size={40} />
            <h3>Instant Alerts</h3>
            <p>Immediate notifications via email and SMS when risks are detected</p>
          </div>
          <div className="feature-card">
            <ChefHat size={40} />
            <h3>Cooking Mode</h3>
            <p>Temporary override for false alarms during normal cooking</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register Your Device</h3>
            <p>Create an account and register your LPG Guardian device using the provided device ID</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Monitor Your Safety</h3>
            <p>Access real-time monitoring of gas levels and temperature through your dashboard</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Stay Protected</h3>
            <p>Receive instant alerts and take action when potential risks are detected</p>
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="safety-features">
        <h2>Safety Features</h2>
        <div className="safety-grid">
          <div className="safety-card">
            <div className="safety-icon">
              <AlertTriangle size={32} />
            </div>
            <div className="safety-content">
              <h3>Risk Detection</h3>
              <p>Advanced sensors detect gas leaks and abnormal temperature changes</p>
            </div>
          </div>
          <div className="safety-card">
            <div className="safety-icon">
              <ChefHat size={32} />
            </div>
            <div className="safety-content">
              <h3>Cooking Mode</h3>
              <p>Temporarily disable alerts for 20 minutes during normal cooking activities</p>
            </div>
          </div>
          <div className="safety-card">
            <div className="safety-icon">
              <Mail size={32} />
            </div>
            <div className="safety-content">
              <h3>Email Notifications</h3>
              <p>Instant email alerts when potential risks are detected</p>
            </div>
          </div>
          <div className="safety-card">
            <div className="safety-icon">
              <Phone size={32} />
            </div>
            <div className="safety-content">
              <h3>SMS Alerts</h3>
              <p>Emergency SMS notifications for immediate attention</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About LPG Safety</h2>
        <div className="about-content">
          <div className="about-text">
            <p>LPG (Liquefied Petroleum Gas) is a common fuel source used in households and industries. While it's efficient and convenient, it requires careful handling and monitoring due to its flammable nature.</p>
            <p>LPG Guardian was developed in response to the increasing number of LPG-related accidents, providing a smart solution to prevent potential disasters.</p>
          </div>
          <div className="safety-stats">
            <div className="stat-card">
              <h3>Prevention Rate</h3>
              <p className="stat-number">99%</p>
              <p>Accident prevention rate with LPG Guardian</p>
            </div>
            <div className="stat-card">
              <h3>Response Time</h3>
              <p className="stat-number">&lt;30s</p>
              <p>Average alert response time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Enhance Your Safety?</h2>
          <p>Join thousands of households protected by LPG Guardian</p>
          <button onClick={() => navigate('/register')} className="cta-button primary">
            Get Started Now <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Welcome; 