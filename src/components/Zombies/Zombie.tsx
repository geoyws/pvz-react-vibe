import React from 'react';
import type { Zombie as ZombieType, Position } from '../../types/game';
import BasicZombie from './BasicZombie';
import ConeheadZombie from './ConeheadZombie';
import BucketheadZombie from './BucketheadZombie';
import './Zombie.css';

interface ZombieProps {
  zombie: ZombieType;
  position: Position;
}

const Zombie: React.FC<ZombieProps> = ({ zombie, position }) => {
  const renderZombie = () => {
    switch (zombie.type) {
      case 'basic':
        return <BasicZombie zombie={zombie} position={position} />;
      case 'conehead':
        return <ConeheadZombie zombie={zombie} position={position} />;
      case 'buckethead':
        return <BucketheadZombie zombie={zombie} position={position} />;
      default:
        return <BasicZombie zombie={zombie} position={position} />;
    }
  };

  if (!zombie.isAlive) {
    return null;
  }

  return (
    <div
      className={`zombie zombie-${zombie.type} ${zombie.isSlowed ? 'slowed' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: 60,
        height: 80,
      }}
    >
      {renderZombie()}
      <div className="health-bar">
        <div 
          className="health-fill"
          style={{
            width: `${(zombie.health / zombie.maxHealth) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Zombie;
