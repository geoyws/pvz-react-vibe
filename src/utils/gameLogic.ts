import type { Plant, Zombie, Projectile, GridPosition, Position, PlantType, ZombieType } from '../types/game';
import { GAME_CONSTANTS, PLANT_COSTS, PLANT_HEALTH, ZOMBIE_HEALTH, ZOMBIE_SPEED } from './constants';

export const createPlant = (type: PlantType, position: GridPosition): Plant => {
  const config = {
    peashooter: { health: PLANT_HEALTH.peashooter, cooldown: 1500 },
    sunflower: { health: PLANT_HEALTH.sunflower, cooldown: 7500 },
    wallnut: { health: PLANT_HEALTH.wallnut, cooldown: 0 },
    cherrybomb: { health: PLANT_HEALTH.cherrybomb, cooldown: 0 },
    snowpea: { health: PLANT_HEALTH.snowpea, cooldown: 1500 },
  }[type];

  return {
    id: `${type}-${Date.now()}-${Math.random()}`,
    type,
    position,
    health: config.health,
    maxHealth: config.health,
    cost: PLANT_COSTS[type],
    cooldown: config.cooldown,
    lastShot: 0,
    isAlive: true,
  };
};

export const createZombie = (type: ZombieType, row: number): Zombie => {
  const health = ZOMBIE_HEALTH[type];
  const speed = ZOMBIE_SPEED[type];
  
  return {
    id: `${type}-${Date.now()}-${Math.random()}`,
    type,
    position: { x: GAME_CONSTANTS.ZOMBIE_SPAWN_X, y: row * GAME_CONSTANTS.CELL_SIZE },
    gridPosition: { row, col: GAME_CONSTANTS.GRID_WIDTH },
    health,
    maxHealth: health,
    speed,
    damage: 100,
    isAlive: true,
    isSlowed: false,
    slowDuration: 0,
  };
};

export const createProjectile = (
  type: 'pea' | 'snowpea',
  startPos: Position,
  targetPos: Position,
  damage: number = 20
): Projectile => {
  return {
    id: `projectile-${Date.now()}-${Math.random()}`,
    type,
    position: startPos,
    target: targetPos,
    speed: GAME_CONSTANTS.PROJECTILE_SPEED,
    damage,
    isAlive: true,
    effects: type === 'snowpea' ? [{ type: 'slow', value: 0.5, duration: 2000 }] : undefined,
  };
};

export const gridToPixel = (gridPos: GridPosition): Position => {
  return {
    x: gridPos.col * GAME_CONSTANTS.CELL_SIZE,
    y: gridPos.row * GAME_CONSTANTS.CELL_SIZE,
  };
};

export const pixelToGrid = (pixelPos: Position): GridPosition => {
  return {
    row: Math.floor(pixelPos.y / GAME_CONSTANTS.CELL_SIZE),
    col: Math.floor(pixelPos.x / GAME_CONSTANTS.CELL_SIZE),
  };
};

export const isValidGridPosition = (pos: GridPosition): boolean => {
  return (
    pos.row >= 0 &&
    pos.row < GAME_CONSTANTS.GRID_HEIGHT &&
    pos.col >= 0 &&
    pos.col < GAME_CONSTANTS.GRID_WIDTH
  );
};

export const canAffordPlant = (plantType: PlantType, sun: number): boolean => {
  return sun >= PLANT_COSTS[plantType];
};

export const isPlantOnCooldown = (plant: Plant, currentTime: number): boolean => {
  return currentTime - plant.lastShot < plant.cooldown;
};

export const findZombieInRow = (zombies: Zombie[], row: number): Zombie | null => {
  return zombies.find(zombie => 
    zombie.isAlive && 
    zombie.gridPosition.row === row && 
    zombie.position.x > 0
  ) || null;
};

export const getDistance = (pos1: Position, pos2: Position): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const checkCollision = (pos1: Position, pos2: Position, radius: number = 20): boolean => {
  return getDistance(pos1, pos2) < radius;
};

export const updateZombiePosition = (zombie: Zombie, deltaTime: number): Zombie => {
  const speed = zombie.isSlowed ? zombie.speed * 0.5 : zombie.speed;
  const newX = zombie.position.x - speed * deltaTime;
  
  return {
    ...zombie,
    position: { ...zombie.position, x: newX },
    gridPosition: { ...zombie.gridPosition, col: Math.floor(newX / GAME_CONSTANTS.CELL_SIZE) },
  };
};

export const updateProjectilePosition = (projectile: Projectile, deltaTime: number): Projectile => {
  const dx = projectile.target.x - projectile.position.x;
  const dy = projectile.target.y - projectile.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < 10) {
    return { ...projectile, isAlive: false };
  }
  
  const moveX = (dx / distance) * projectile.speed * deltaTime;
  const moveY = (dy / distance) * projectile.speed * deltaTime;
  
  return {
    ...projectile,
    position: {
      x: projectile.position.x + moveX,
      y: projectile.position.y + moveY,
    },
  };
};

export const generateSun = (): Position => {
  return {
    x: Math.random() * (GAME_CONSTANTS.GAME_WIDTH - 100) + 50,
    y: Math.random() * (GAME_CONSTANTS.GAME_HEIGHT - 100) + 50,
  };
};
