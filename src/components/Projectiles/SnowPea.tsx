import React from 'react';
import type { Projectile as ProjectileType, Position } from '../../types/game';
import './SnowPea.css';

interface SnowPeaProps {
  projectile: ProjectileType;
  position: Position;
}

const SnowPea: React.FC<SnowPeaProps> = ({ projectile: _projectile, position: _position }) => {
  return (
    <div className="snowpea-projectile">
      <div className="snowpea-body"></div>
      <div className="snow-crystals">
        <div className="crystal crystal-1"></div>
        <div className="crystal crystal-2"></div>
        <div className="crystal crystal-3"></div>
      </div>
    </div>
  );
};

export default SnowPea;
