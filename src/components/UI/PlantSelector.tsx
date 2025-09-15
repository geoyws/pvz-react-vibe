import React from 'react';
import type { PlantType } from '../../types/game';
import { PLANT_COSTS } from '../../utils/constants';
import './PlantSelector.css';

interface PlantSelectorProps {
  selectedPlant: PlantType | null;
  sun: number;
  onPlantSelect: (plantType: PlantType | null) => void;
}

const PlantSelector: React.FC<PlantSelectorProps> = ({
  selectedPlant,
  sun,
  onPlantSelect,
}) => {
  const plants: Array<{ type: PlantType; name: string; cost: number; icon: string }> = [
    { type: 'peashooter', name: 'Peashooter', cost: PLANT_COSTS.peashooter, icon: '🌱' },
    { type: 'sunflower', name: 'Sunflower', cost: PLANT_COSTS.sunflower, icon: '🌻' },
    { type: 'wallnut', name: 'Wall-nut', cost: PLANT_COSTS.wallnut, icon: '🥜' },
    { type: 'cherrybomb', name: 'Cherry Bomb', cost: PLANT_COSTS.cherrybomb, icon: '🍒' },
    { type: 'snowpea', name: 'Snow Pea', cost: PLANT_COSTS.snowpea, icon: '❄️' },
  ];

  const handlePlantClick = (plantType: PlantType) => {
    if (sun >= PLANT_COSTS[plantType]) {
      onPlantSelect(selectedPlant === plantType ? null : plantType);
    }
  };

  return (
    <div className="plant-selector">
      <div className="selector-title">Choose your plants!</div>
      <div className="plants-grid">
        {plants.map(plant => {
          const canAfford = sun >= plant.cost;
          const isSelected = selectedPlant === plant.type;
          
          return (
            <div
              key={plant.type}
              className={`plant-card ${isSelected ? 'selected' : ''} ${!canAfford ? 'disabled' : ''}`}
              onClick={() => handlePlantClick(plant.type)}
            >
              <div className="plant-icon">{plant.icon}</div>
              <div className="plant-name">{plant.name}</div>
              <div className="plant-cost">
                <span className="sun-icon">☀️</span>
                {plant.cost}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlantSelector;
