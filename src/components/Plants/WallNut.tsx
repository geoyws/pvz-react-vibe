import React from 'react';
import type { Plant as PlantType, Position } from '../../types/game';
import './WallNut.css';

interface WallNutProps {
  plant: PlantType;
  position: Position;
}

const WallNut: React.FC<WallNutProps> = ({ plant: _plant, position: _position }) => {
  return (
    <div className="wallnut">
      <div className="wallnut-shell">
        <div className="wallnut-texture"></div>
      </div>
    </div>
  );
};

export default WallNut;
