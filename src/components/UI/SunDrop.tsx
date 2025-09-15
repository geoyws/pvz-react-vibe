import React from 'react';
import './SunDrop.css';

interface SunDropProps {
  sunId: string;
  position: { x: number; y: number };
  value: number;
  onCollect: (sunId: string) => void;
}

const SunDrop: React.FC<SunDropProps> = ({ sunId, position, value, onCollect }) => {
  const handleClick = () => {
    onCollect(sunId);
  };

  return (
    <div
      className="sun-drop"
      style={{
        left: position.x,
        top: position.y,
      }}
      onClick={handleClick}
    >
      <div className="sun-glow"></div>
      <div className="sun-core">
        <div className="sun-rays">
          <div className="ray ray-1"></div>
          <div className="ray ray-2"></div>
          <div className="ray ray-3"></div>
          <div className="ray ray-4"></div>
          <div className="ray ray-5"></div>
          <div className="ray ray-6"></div>
          <div className="ray ray-7"></div>
          <div className="ray ray-8"></div>
        </div>
        <div className="sun-face">
          <div className="sun-eyes">
            <div className="eye eye-left"></div>
          </div>
          <div className="sun-mouth"></div>
        </div>
      </div>
      <div className="sun-value">{value}</div>
    </div>
  );
};

export default SunDrop;
