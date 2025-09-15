import React from 'react';
import type { Plant as PlantType, Position } from '../../types/game';
import './Sunflower.css';

interface SunflowerProps {
  plant: PlantType;
  position: Position;
}

const Sunflower: React.FC<SunflowerProps> = ({ plant: _plant, position: _position }) => {
  return (
    <div className="sunflower">
      <div className="sunflower-center">
        <div className="sunflower-seeds"></div>
      </div>
      <div className="sunflower-petals">
        <div className="petal petal-1"></div>
        <div className="petal petal-2"></div>
        <div className="petal petal-3"></div>
        <div className="petal petal-4"></div>
        <div className="petal petal-5"></div>
        <div className="petal petal-6"></div>
        <div className="petal petal-7"></div>
        <div className="petal petal-8"></div>
      </div>
      <div className="sunflower-stem"></div>
    </div>
  );
};

export default Sunflower;
