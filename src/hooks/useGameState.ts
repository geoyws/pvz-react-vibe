import { useState, useCallback, useRef, useEffect } from 'react';
import type { GameState, GridPosition, PlantType, ZombieType } from '../types/game';
import { GAME_CONSTANTS, PLANT_COSTS } from '../utils/constants';
import { 
  createPlant, 
  createZombie, 
  createProjectile, 
  gridToPixel, 
  // pixelToGrid, 
  isValidGridPosition,
  canAffordPlant,
  isPlantOnCooldown,
  findZombieInRow,
  updateZombiePosition,
  updateProjectilePosition,
  generateSun,
  checkCollision
} from '../utils/gameLogic';

const initialState: GameState = {
  sun: 50,
  wave: 1,
  zombies: [],
  plants: [],
  projectiles: [],
  isGameOver: false,
  isPaused: false,
  selectedPlant: null,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [sunDrops, setSunDrops] = useState<Array<{ id: string; position: { x: number; y: number }; value: number }>>([]);
  const lastTimeRef = useRef<number>(0);
  const zombieSpawnTimerRef = useRef<number>(0);
  const sunGenerationTimerRef = useRef<number>(0);

  const addSun = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      sun: Math.min(prev.sun + amount, GAME_CONSTANTS.MAX_SUN),
    }));
  }, []);

  const selectPlant = useCallback((plantType: PlantType | null) => {
    setGameState(prev => ({
      ...prev,
      selectedPlant: plantType,
    }));
  }, []);

  const placePlant = useCallback((gridPos: GridPosition) => {
    setGameState(prev => {
      if (!prev.selectedPlant || !canAffordPlant(prev.selectedPlant, prev.sun)) {
        return prev;
      }

      // Check if position is valid and empty
      if (!isValidGridPosition(gridPos)) return prev;
      
      const existingPlant = prev.plants.find(
        plant => plant.position.row === gridPos.row && 
                 plant.position.col === gridPos.col &&
                 plant.isAlive
      );
      
      if (existingPlant) return prev;

      const newPlant = createPlant(prev.selectedPlant, gridPos);
      
      return {
        ...prev,
        plants: [...prev.plants, newPlant],
        sun: prev.sun - PLANT_COSTS[prev.selectedPlant],
        selectedPlant: null,
      };
    });

    return true;
  }, []);

  const collectSun = useCallback((sunId: string) => {
    const sunDrop = sunDrops.find(sun => sun.id === sunId);
    if (sunDrop) {
      addSun(sunDrop.value);
      setSunDrops(prev => prev.filter(sun => sun.id !== sunId));
    }
  }, [sunDrops, addSun]);

  // Removed unused functions - they're now handled directly in the game loop

  const gameLoopRef = useRef<(currentTime: number) => void>(() => {});

  const gameLoop = useCallback((currentTime: number) => {
    setGameState(prev => {
      if (prev.isPaused || prev.isGameOver) return prev;

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Skip first frame to avoid huge deltaTime
      if (deltaTime > 1000) return prev;
      
      // Debug: log every 60 frames (about once per second)
      if (Math.floor(currentTime / 1000) !== Math.floor((currentTime - deltaTime) / 1000)) {
        console.log('Game loop running, time:', Math.floor(currentTime / 1000));
      }

      let newState = { ...prev };

      // Update zombie spawn timer
      zombieSpawnTimerRef.current += deltaTime;
      if (zombieSpawnTimerRef.current >= GAME_CONSTANTS.ZOMBIE_SPAWN_RATE) {
        const row = Math.floor(Math.random() * GAME_CONSTANTS.GRID_HEIGHT);
        const zombieType: ZombieType = Math.random() < 0.7 ? 'basic' : 
                                      Math.random() < 0.9 ? 'conehead' : 'buckethead';
        const newZombie = createZombie(zombieType, row);
        newState.zombies = [...newState.zombies, newZombie];
        zombieSpawnTimerRef.current = 0;
      }

      // Update sun generation timer
      sunGenerationTimerRef.current += deltaTime;
      if (sunGenerationTimerRef.current >= 10000) { // Generate sun every 10 seconds
        const position = generateSun();
        const newSun = {
          id: `sun-${Date.now()}-${Math.random()}`,
          position,
          value: GAME_CONSTANTS.SUN_VALUE,
        };
        setSunDrops(prevSun => [...prevSun, newSun]);
        sunGenerationTimerRef.current = 0;
      }

      // Update zombies
      newState.zombies = newState.zombies.map(zombie => {
        if (!zombie.isAlive) return zombie;
        
        const updatedZombie = updateZombiePosition(zombie, deltaTime);
        
        // Check if zombie reached the end
        if (updatedZombie.position.x <= 0) {
          newState.isGameOver = true;
          return { ...updatedZombie, isAlive: false };
        }
        
        return updatedZombie;
      }).filter(zombie => zombie.isAlive);

      // Update projectiles
      newState.projectiles = newState.projectiles.map(projectile => {
        if (!projectile.isAlive) return projectile;
        return updateProjectilePosition(projectile, deltaTime);
      }).filter(projectile => projectile.isAlive);

      // Handle plant shooting
      newState.plants.forEach(plant => {
        if (!plant.isAlive || plant.type === 'sunflower' || plant.type === 'wallnut') return;
        
        const targetZombie = findZombieInRow(newState.zombies, plant.position.row);
        if (targetZombie && !isPlantOnCooldown(plant, currentTime)) {
          const plantPos = gridToPixel(plant.position);
          const zombiePos = targetZombie.position;
          
          const projectileType = plant.type === 'snowpea' ? 'snowpea' : 'pea';
          const damage = plant.type === 'snowpea' ? 20 : 20;
          
          const newProjectile = createProjectile(projectileType, plantPos, zombiePos, damage);
          newState.projectiles = [...newState.projectiles, newProjectile];
          plant.lastShot = currentTime;
        }
      });

      // Handle projectile collisions
      newState.projectiles.forEach(projectile => {
        if (!projectile.isAlive) return;
        
        newState.zombies.forEach(zombie => {
          if (!zombie.isAlive) return;
          
          if (checkCollision(projectile.position, zombie.position, 30)) {
            zombie.health -= projectile.damage;
            if (zombie.health <= 0) {
              zombie.isAlive = false;
            }
            
            // Apply slow effect
            if (projectile.effects?.some(effect => effect.type === 'slow')) {
              zombie.isSlowed = true;
              zombie.slowDuration = projectile.effects[0].duration || 2000;
            }
            
            projectile.isAlive = false;
          }
        });
      });

      return newState;
    });
  }, []);

  useEffect(() => {
    let animationId: number;
    
    gameLoopRef.current = gameLoop;
    
    const startGameLoop = (currentTime: number) => {
      if (gameLoopRef.current) {
        gameLoopRef.current(currentTime);
      }
      animationId = requestAnimationFrame(startGameLoop);
    };
    
    animationId = requestAnimationFrame(startGameLoop);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [gameLoop]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
    setSunDrops([]);
    zombieSpawnTimerRef.current = 0;
    sunGenerationTimerRef.current = 0;
  }, []);

  return {
    gameState,
    sunDrops,
    addSun,
    selectPlant,
    placePlant,
    collectSun,
    pauseGame,
    resetGame,
  };
};
