export const GAME_CONSTANTS = {
  GRID_WIDTH: 9,
  GRID_HEIGHT: 5,
  CELL_SIZE: 80,
  GAME_WIDTH: 720,
  GAME_HEIGHT: 400,
  
  // Timing
  SUN_GENERATION_RATE: 25,
  ZOMBIE_SPAWN_RATE: 2000,
  WAVE_DELAY: 10000,
  PLANT_COOLDOWN: 1500,
  
  // Game mechanics
  SUN_VALUE: 25,
  MAX_SUN: 9999,
  ZOMBIE_SPAWN_X: 800,
  ZOMBIE_TARGET_X: -50,
  
  // Animation
  ANIMATION_FPS: 60,
  PROJECTILE_SPEED: 300,
  ZOMBIE_SPEED: 0.5,
  
  // UI
  PLANT_SELECTOR_HEIGHT: 100,
  UI_PADDING: 20,
};

export const PLANT_COSTS = {
  peashooter: 25,
  sunflower: 50,
  wallnut: 50,
  cherrybomb: 150,
  snowpea: 175,
} as const;

export const PLANT_HEALTH = {
  peashooter: 100,
  sunflower: 100,
  wallnut: 4000,
  cherrybomb: 100,
  snowpea: 100,
} as const;

export const ZOMBIE_HEALTH = {
  basic: 200,
  conehead: 640,
  buckethead: 1370,
  flag: 200,
} as const;

export const ZOMBIE_SPEED = {
  basic: 0.5,
  conehead: 0.5,
  buckethead: 0.5,
  flag: 0.8,
} as const;
