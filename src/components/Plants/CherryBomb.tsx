import React from 'react';
import type { Plant as PlantType, Position } from '../../types/game';
import './CherryBomb.css';

interface CherryBombProps {
  plant: PlantType;
  position: Position;
}

const CherryBomb: React.FC<CherryBombProps> = ({ plant: _plant, position: _position }) => {
  return (
    <div className="cherrybomb">
      <div className="cherrybomb-body">
        <div className="cherrybomb-stem"></div>
        <div className="cherrybomb-fuse"></div>
      </div>
    </div>
  );
};

export default CherryBomb;
