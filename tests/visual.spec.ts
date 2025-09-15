import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should match game interface snapshot', async ({ page }) => {
    // Take screenshot of the main game interface
    await expect(page).toHaveScreenshot('game-interface.png');
  });

  test('should match plant selector snapshot', async ({ page }) => {
    const plantSelector = page.locator('.plant-selector');
    await expect(plantSelector).toHaveScreenshot('plant-selector.png');
  });

  test('should match game board snapshot', async ({ page }) => {
    const gameBoard = page.locator('.game-board');
    await expect(gameBoard).toHaveScreenshot('game-board.png');
  });

  test('should match selected plant state', async ({ page }) => {
    // Select a plant
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    
    // Take screenshot of selected state
    await expect(page.locator('.plant-selector')).toHaveScreenshot('plant-selected.png');
  });

  test('should match grid selectable state', async ({ page }) => {
    // Select a plant to show selectable grid
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    
    // Take screenshot of selectable grid
    await expect(page.locator('.game-board')).toHaveScreenshot('grid-selectable.png');
  });

  test('should match pause overlay', async ({ page }) => {
    // Pause the game
    const pauseButton = page.locator('text=Pause');
    await pauseButton.click();
    
    // Take screenshot of pause overlay
    await expect(page.locator('.pause-overlay')).toHaveScreenshot('pause-overlay.png');
  });

  test('should match mobile layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Take screenshot of mobile layout
    await expect(page).toHaveScreenshot('mobile-layout.png');
  });

  test('should match plant placement', async ({ page }) => {
    // Place a plant
    const peashooterCard = page.locator('.plant-card').first();
    await peashooterCard.click();
    const gridCell = page.locator('.grid-cell').first();
    await gridCell.click();
    
    // Take screenshot with plant placed
    await expect(page.locator('.game-board')).toHaveScreenshot('plant-placed.png');
  });

  test('should match zombie appearance', async ({ page }) => {
    // Wait for zombie to spawn
    await page.waitForTimeout(4000);
    
    // Take screenshot with zombie
    await expect(page.locator('.game-board')).toHaveScreenshot('zombie-spawned.png');
  });

  test('should match sun drop appearance', async ({ page }) => {
    // Wait for sun to be generated
    await page.waitForTimeout(11000);
    
    // Take screenshot with sun drop
    await expect(page.locator('.game-board')).toHaveScreenshot('sun-drop.png');
  });
});
