import React from 'react';
import type { Plant as PlantType, Position } from '../../types/game';
import './SnowPea.css';

interface SnowPeaProps {
  plant: PlantType;
  position: Position;
}

const SnowPea: React.FC<SnowPeaProps> = ({ plant: _plant, position: _position }) => {
  return (
    <div className="snowpea">
      <div className="snowpea-body">
        <div className="snowpea-head">
          <div className="snowpea-mouth"></div>
        </div>
        <div className="snowpea-leaves">
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="leaf leaf-3"></div>
        </div>
        <div className="snow-crystals">
          <div className="crystal crystal-1"></div>
          <div className="crystal crystal-2"></div>
          <div className="crystal crystal-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SnowPea;
