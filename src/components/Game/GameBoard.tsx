import React from 'react';
import type { GridPosition } from '../../types/game';
import { GAME_CONSTANTS } from '../../utils/constants';
import Plant from '../Plants/Plant';
import Zombie from '../Zombies/Zombie';
import Projectile from '../Projectiles/Projectile';
import SunDrop from '../UI/SunDrop';
import './GameBoard.css';

interface GameBoardProps {
  plants: any[];
  zombies: any[];
  projectiles: any[];
  sunDrops: Array<{ id: string; position: { x: number; y: number }; value: number }>;
  selectedPlant: string | null;
  onCellClick: (gridPos: GridPosition) => void;
  onSunCollect: (sunId: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  plants,
  zombies,
  projectiles,
  sunDrops,
  selectedPlant,
  onCellClick,
  onSunCollect,
}) => {
  const handleCellClick = (row: number, col: number) => {
    onCellClick({ row, col });
  };

  const renderGrid = () => {
    const cells = [];
    
    for (let row = 0; row < GAME_CONSTANTS.GRID_HEIGHT; row++) {
      for (let col = 0; col < GAME_CONSTANTS.GRID_WIDTH; col++) {
        const isSelected = selectedPlant !== null;
        const hasPlant = plants.some(
          plant => plant.position.row === row && 
                   plant.position.col === col && 
                   plant.isAlive
        );
        
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`grid-cell ${isSelected ? 'selectable' : ''} ${hasPlant ? 'occupied' : ''}`}
            style={{
              left: col * GAME_CONSTANTS.CELL_SIZE,
              top: row * GAME_CONSTANTS.CELL_SIZE,
              width: GAME_CONSTANTS.CELL_SIZE,
              height: GAME_CONSTANTS.CELL_SIZE,
            }}
            onClick={() => handleCellClick(row, col)}
          />
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="game-board">
      <div className="grid-container">
        {renderGrid()}
        
        {/* Render plants */}
        {plants.map(plant => (
          <Plant
            key={plant.id}
            plant={plant}
            position={{
              x: plant.position.col * GAME_CONSTANTS.CELL_SIZE,
              y: plant.position.row * GAME_CONSTANTS.CELL_SIZE,
            }}
          />
        ))}
        
        {/* Render zombies */}
        {zombies.map(zombie => (
          <Zombie
            key={zombie.id}
            zombie={zombie}
            position={zombie.position}
          />
        ))}
        
        {/* Render projectiles */}
        {projectiles.map(projectile => (
          <Projectile
            key={projectile.id}
            projectile={projectile}
            position={projectile.position}
          />
        ))}
        
        {/* Render sun drops */}
        {sunDrops.map(sun => (
          <SunDrop
            key={sun.id}
            sunId={sun.id}
            position={sun.position}
            value={sun.value}
            onCollect={onSunCollect}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
