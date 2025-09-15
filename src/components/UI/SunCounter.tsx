import React from 'react';
import './SunCounter.css';

interface SunCounterProps {
  sun: number;
}

const SunCounter: React.FC<SunCounterProps> = ({ sun }) => {
  return (
    <div className="sun-counter">
      <div className="sun-icon">☀️</div>
      <div className="sun-amount">{sun}</div>
    </div>
  );
};

export default SunCounter;
