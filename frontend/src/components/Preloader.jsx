import React from 'react';
import { Flame } from 'lucide-react';

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

export default Preloader; 