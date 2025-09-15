import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import GameBoard from './GameBoard';
import PlantSelector from '../UI/PlantSelector';
import SunCounter from '../UI/SunCounter';
import './Game.css';

const Game: React.FC = () => {
  const {
    gameState,
    sunDrops,
    selectPlant,
    placePlant,
    collectSun,
    pauseGame,
    resetGame,
  } = useGameState();

  const handleCellClick = (gridPos: { row: number; col: number }) => {
    placePlant(gridPos);
  };

  const handleSunCollect = (sunId: string) => {
    collectSun(sunId);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-title">
          <h1>🌱 Plants vs Zombies 🌱</h1>
          <p>Defend your garden from the zombie invasion!</p>
        </div>
        <div className="game-controls">
          <SunCounter sun={gameState.sun} />
          <div className="control-buttons">
            <button 
              className="control-btn pause-btn"
              onClick={pauseGame}
            >
              {gameState.isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
            <button 
              className="control-btn reset-btn"
              onClick={resetGame}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      <PlantSelector
        selectedPlant={gameState.selectedPlant}
        sun={gameState.sun}
        onPlantSelect={selectPlant}
      />

      <div className="game-area">
        <GameBoard
          plants={gameState.plants}
          zombies={gameState.zombies}
          projectiles={gameState.projectiles}
          sunDrops={sunDrops}
          selectedPlant={gameState.selectedPlant}
          onCellClick={handleCellClick}
          onSunCollect={handleSunCollect}
        />
      </div>

      {gameState.isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h2>💀 Game Over! 💀</h2>
            <p>The zombies have reached your house!</p>
            <button 
              className="restart-btn"
              onClick={resetGame}
            >
              🌱 Try Again
            </button>
          </div>
        </div>
      )}

      {gameState.isPaused && (
        <div className="pause-overlay">
          <div className="pause-content">
            <h2>⏸️ Game Paused</h2>
            <p>Click Resume to continue playing</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
