import React from 'react';
import type { Projectile as ProjectileType, Position } from '../../types/game';
import Pea from './Pea';
import SnowPea from './SnowPea';
import './Projectile.css';

interface ProjectileProps {
  projectile: ProjectileType;
  position: Position;
}

const Projectile: React.FC<ProjectileProps> = ({ projectile, position }) => {
  const renderProjectile = () => {
    switch (projectile.type) {
      case 'pea':
        return <Pea projectile={projectile} position={position} />;
      case 'snowpea':
        return <SnowPea projectile={projectile} position={position} />;
      default:
        return <Pea projectile={projectile} position={position} />;
    }
  };

  if (!projectile.isAlive) {
    return null;
  }

  return (
    <div
      className={`projectile projectile-${projectile.type}`}
      style={{
        left: position.x,
        top: position.y,
        width: 8,
        height: 8,
      }}
    >
      {renderProjectile()}
    </div>
  );
};

export default Projectile;
