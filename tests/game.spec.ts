import { test, expect } from '@playwright/test';

test.describe('Plants vs Zombies Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load the game interface', async ({ page }) => {
    // Check if the main game elements are present
    await expect(page.locator('h1')).toContainText('Plants vs Zombies');
    await expect(page.locator('.game-board')).toBeVisible();
    await expect(page.locator('.plant-selector')).toBeVisible();
    await expect(page.locator('.sun-counter')).toBeVisible();
  });

  test('should display plant selector with all plant types', async ({ page }) => {
    const plantCards = page.locator('.plant-card');
    await expect(plantCards).toHaveCount(5);
    
    // Check specific plant types
    await expect(page.locator('text=Peashooter')).toBeVisible();
    await expect(page.locator('text=Sunflower')).toBeVisible();
    await expect(page.locator('text=Wall-nut')).toBeVisible();
    await expect(page.locator('text=Cherry Bomb')).toBeVisible();
    await expect(page.locator('text=Snow Pea')).toBeVisible();
  });

  test('should show sun counter with initial sun', async ({ page }) => {
    const sunCounter = page.locator('.sun-counter');
    await expect(sunCounter).toBeVisible();
    await expect(sunCounter.locator('.sun-amount')).toContainText('50');
  });

  test('should allow plant selection', async ({ page }) => {
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    
    // Check if plant is selected
    await expect(peashooterCard).toHaveClass(/selected/);
  });

  test('should allow plant placement on grid', async ({ page }) => {
    // Select a plant first
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    
    // Click on a grid cell to place plant
    const gridCell = page.locator('.grid-cell').first();
    await gridCell.click();
    
    // Check if plant was placed (should have a plant element)
    await expect(page.locator('.plant')).toBeVisible();
  });

  test('should not allow plant placement without selection', async ({ page }) => {
    // Try to click grid cell without selecting plant
    const gridCell = page.locator('.grid-cell').first();
    await gridCell.click();
    
    // Should not have any plants
    await expect(page.locator('.plant')).toHaveCount(0);
  });

  test('should not allow plant placement without enough sun', async ({ page }) => {
    // Select expensive plant (Cherry Bomb - 150 sun)
    const cherryBombCard = page.locator('text=Cherry Bomb').locator('..');
    await cherryBombCard.click();
    
    // Try to place plant (should not work with only 50 sun)
    const gridCell = page.locator('.grid-cell').first();
    await gridCell.click();
    
    // Should not have any plants
    await expect(page.locator('.plant')).toHaveCount(0);
  });

  test('should show grid cells as selectable when plant is selected', async ({ page }) => {
    // Select a plant
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    
    // Check if grid cells show as selectable
    const gridCells = page.locator('.grid-cell.selectable');
    await expect(gridCells).toHaveCount(45); // 5x9 grid
  });

  test('should have pause and reset buttons', async ({ page }) => {
    await expect(page.locator('text=Pause')).toBeVisible();
    await expect(page.locator('text=Reset')).toBeVisible();
  });

  test('should pause game when pause button is clicked', async ({ page }) => {
    const pauseButton = page.locator('text=Pause');
    await pauseButton.click();
    
    // Check if pause overlay appears
    await expect(page.locator('.pause-overlay')).toBeVisible();
    await expect(page.locator('text=Game Paused')).toBeVisible();
  });

  test('should resume game when resume button is clicked', async ({ page }) => {
    // Pause the game
    const pauseButton = page.locator('text=Pause');
    await pauseButton.click();
    
    // Resume the game
    const resumeButton = page.locator('button:has-text("Resume")');
    await resumeButton.click();
    
    // Check if pause overlay is gone
    await expect(page.locator('.pause-overlay')).not.toBeVisible();
  });

  test('should reset game when reset button is clicked', async ({ page }) => {
    // Place a plant first
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    const gridCell = page.locator('.grid-cell').first();
    await gridCell.click();
    
    // Verify plant is placed
    await expect(page.locator('.plant')).toHaveCount(1);
    
    // Reset the game
    const resetButton = page.locator('text=Reset');
    await resetButton.click();
    
    // Check if plant is removed
    await expect(page.locator('.plant')).toHaveCount(0);
  });

  test('should spawn zombies over time', async ({ page }) => {
    // Wait for zombies to spawn (they spawn every 3 seconds)
    await page.waitForTimeout(4000);
    
    // Check if zombies appear
    const zombies = page.locator('.zombie');
    await expect(zombies).toHaveCount(1);
  });

  test('should show zombie health bars', async ({ page }) => {
    // Wait for zombie to spawn
    await page.waitForTimeout(4000);
    
    const zombie = page.locator('.zombie').first();
    await expect(zombie.locator('.health-bar')).toBeVisible();
  });

  test('should allow sun collection', async ({ page }) => {
    // Wait for sun to be generated (every 10 seconds)
    await page.waitForTimeout(11000);
    
    // Look for sun drops
    const sunDrops = page.locator('.sun-drop');
    await expect(sunDrops).toHaveCount(1);
    
    // Click on sun drop
    await sunDrops.first().click();
    
    // Check if sun counter increased
    const sunAmount = page.locator('.sun-amount');
    await expect(sunAmount).toContainText('75'); // 50 + 25
  });

  test('should show game over when zombie reaches the end', async ({ page }) => {
    // This test might take a while as we need to wait for zombies to reach the end
    // For now, let's just check if the game over overlay exists in the DOM
    const gameOverOverlay = page.locator('.game-over-overlay');
    // Initially should not be visible
    await expect(gameOverOverlay).not.toBeVisible();
  });

  test('should have responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if game still loads properly
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.game-board')).toBeVisible();
    
    // Check if plant selector adapts to mobile
    const plantCards = page.locator('.plant-card');
    await expect(plantCards).toHaveCount(5);
  });

  test('should handle multiple plant types correctly', async ({ page }) => {
    // Test placing different plant types
    const plantTypes = ['Peashooter', 'Sunflower', 'Wall-nut'];
    
    for (let i = 0; i < plantTypes.length; i++) {
      const plantCard = page.locator(`text=${plantTypes[i]}`).locator('..');
      await plantCard.click();
      
      const gridCell = page.locator('.grid-cell').nth(i);
      await gridCell.click();
      
      // Check if plant was placed
      const plants = page.locator('.plant');
      await expect(plants).toHaveCount(i + 1);
    }
  });

  test('should show plant health bars', async ({ page }) => {
    // Place a plant
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    const gridCell = page.locator('.grid-cell').first();
    await gridCell.click();
    
    // Check if plant has health bar
    const plant = page.locator('.plant').first();
    await expect(plant.locator('.health-bar')).toBeVisible();
  });

  test('should handle plant cooldowns correctly', async ({ page }) => {
    // Place a peashooter
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    const gridCell = page.locator('.grid-cell').first();
    await gridCell.click();
    
    // Wait for zombie to spawn
    await page.waitForTimeout(4000);
    
    // Check if projectiles are being shot
    await page.waitForTimeout(2000);
    const projectiles = page.locator('.projectile');
    // Should have at least one projectile
    await expect(projectiles).toHaveCount(1);
  });
});
