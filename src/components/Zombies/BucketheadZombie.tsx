import React from 'react';
import type { Zombie as ZombieType, Position } from '../../types/game';
import './BucketheadZombie.css';

interface BucketheadZombieProps {
  zombie: ZombieType;
  position: Position;
}

const BucketheadZombie: React.FC<BucketheadZombieProps> = ({ zombie: _zombie, position: _position }) => {
  return (
    <div className="buckethead-zombie">
      <div className="metal-bucket">
        <div className="bucket-handle"></div>
        <div className="bucket-dent"></div>
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

export default BucketheadZombie;
