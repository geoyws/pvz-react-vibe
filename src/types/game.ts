export interface Position {
  x: number;
  y: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

export type PlantType = 
  | 'peashooter'
  | 'sunflower'
  | 'wallnut'
  | 'cherrybomb'
  | 'snowpea';

export type ZombieType = 
  | 'basic'
  | 'conehead'
  | 'buckethead'
  | 'flag';

export type ProjectileType = 
  | 'pea'
  | 'snowpea'
  | 'explosion';

export interface ProjectileEffect {
  type: 'slow' | 'explode' | 'pierce';
  value: number;
  duration?: number;
}

export interface Plant {
  id: string;
  type: PlantType;
  position: GridPosition;
  health: number;
  maxHealth: number;
  cost: number;
  cooldown: number;
  lastShot: number;
  isAlive: boolean;
}

export interface Zombie {
  id: string;
  type: ZombieType;
  position: Position;
  gridPosition: GridPosition;
  health: number;
  maxHealth: number;
  speed: number;
  damage: number;
  isAlive: boolean;
  isSlowed: boolean;
  slowDuration: number;
}

export interface Projectile {
  id: string;
  type: ProjectileType;
  position: Position;
  target: Position;
  speed: number;
  damage: number;
  isAlive: boolean;
  effects?: ProjectileEffect[];
}

export interface GameState {
  sun: number;
  wave: number;
  zombies: Zombie[];
  plants: Plant[];
  projectiles: Projectile[];
  isGameOver: boolean;
  isPaused: boolean;
  selectedPlant: PlantType | null;
}

export interface GameConfig {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  sunGenerationRate: number;
  zombieSpawnRate: number;
  waveDelay: number;
}

export const GAME_CONFIG: GameConfig = {
  gridWidth: 9,
  gridHeight: 5,
  cellSize: 80,
  sunGenerationRate: 25,
  zombieSpawnRate: 3000,
  waveDelay: 10000,
};

export const PLANT_CONFIGS = {
  peashooter: {
    cost: 25,
    health: 100,
    damage: 20,
    cooldown: 1500,
    range: 1,
  },
  sunflower: {
    cost: 50,
    health: 100,
    sunGeneration: 25,
    cooldown: 7500,
  },
  wallnut: {
    cost: 50,
    health: 4000,
    damage: 0,
  },
  cherrybomb: {
    cost: 150,
    health: 100,
    damage: 1800,
    explosionRadius: 1.5,
  },
  snowpea: {
    cost: 175,
    health: 100,
    damage: 20,
    cooldown: 1500,
    range: 1,
    slowEffect: 0.5,
    slowDuration: 2000,
  },
};

export const ZOMBIE_CONFIGS = {
  basic: {
    health: 200,
    speed: 0.5,
    damage: 100,
  },
  conehead: {
    health: 640,
    speed: 0.5,
    damage: 100,
  },
  buckethead: {
    health: 1370,
    speed: 0.5,
    damage: 100,
  },
  flag: {
    health: 200,
    speed: 0.8,
    damage: 100,
  },
};
