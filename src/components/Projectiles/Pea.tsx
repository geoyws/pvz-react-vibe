import React from 'react';
import type { Projectile as ProjectileType, Position } from '../../types/game';
import './Pea.css';

interface PeaProps {
  projectile: ProjectileType;
  position: Position;
}

const Pea: React.FC<PeaProps> = ({ projectile: _projectile, position: _position }) => {
  return (
    <div className="pea">
      <div className="pea-body"></div>
    </div>
  );
};

export default Pea;
