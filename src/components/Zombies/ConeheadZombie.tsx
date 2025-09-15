import React from 'react';
import type { Zombie as ZombieType, Position } from '../../types/game';
import './ConeheadZombie.css';

interface ConeheadZombieProps {
  zombie: ZombieType;
  position: Position;
}

const ConeheadZombie: React.FC<ConeheadZombieProps> = ({ zombie: _zombie, position: _position }) => {
  return (
    <div className="conehead-zombie">
      <div className="traffic-cone">
        <div className="cone-stripes">
          <div className="stripe stripe-1"></div>
          <div className="stripe stripe-2"></div>
          <div className="stripe stripe-3"></div>
        </div>
      </div>
      <div className="zombie-head">
        <div className="zombie-eyes">
          <div className="eye eye-left"></div>
          <div className="eye eye-right"></div>
        </div>
        <div className="zombie-mouth"></div>
      </div>
      <div className="zombie-body">
        <div className="zombie-arms">
          <div className="arm arm-left"></div>
          <div className="arm arm-right"></div>
        </div>
      </div>
      <div className="zombie-legs">
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
      </div>
    </div>
  );
};

export default ConeheadZombie;
