import React from 'react';
import type { Plant as PlantType, Position } from '../../types/game';
import Peashooter from './Peashooter';
import Sunflower from './Sunflower';
import WallNut from './WallNut';
import CherryBomb from './CherryBomb';
import SnowPea from './SnowPea';
import './Plant.css';

interface PlantProps {
  plant: PlantType;
  position: Position;
}

const Plant: React.FC<PlantProps> = ({ plant, position }) => {
  const renderPlant = () => {
    switch (plant.type) {
      case 'peashooter':
        return <Peashooter plant={plant} position={position} />;
      case 'sunflower':
        return <Sunflower plant={plant} position={position} />;
      case 'wallnut':
        return <WallNut plant={plant} position={position} />;
      case 'cherrybomb':
        return <CherryBomb plant={plant} position={position} />;
      case 'snowpea':
        return <SnowPea plant={plant} position={position} />;
      default:
        return null;
    }
  };

  if (!plant.isAlive) {
    return null;
  }

  return (
    <div
      className={`plant plant-${plant.type}`}
      style={{
        left: position.x,
        top: position.y,
        width: 80,
        height: 80,
      }}
    >
      {renderPlant()}
      <div className="health-bar">
        <div 
          className="health-fill"
          style={{
            width: `${(plant.health / plant.maxHealth) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Plant;
