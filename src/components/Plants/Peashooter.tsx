import React from 'react';
import type { Plant as PlantType, Position } from '../../types/game';
import './Peashooter.css';

interface PeashooterProps {
  plant: PlantType;
  position: Position;
}

const Peashooter: React.FC<PeashooterProps> = ({ plant: _plant, position: _position }) => {
  return (
    <div className="peashooter">
      <div className="peashooter-body">
        <div className="peashooter-head">
          <div className="peashooter-mouth"></div>
        </div>
        <div className="peashooter-leaves">
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="leaf leaf-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Peashooter;
