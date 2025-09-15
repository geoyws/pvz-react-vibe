import { test, expect } from '@playwright/test';

test.describe('Debug Tests', () => {
  test('should check console for errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for any async operations
    await page.waitForTimeout(2000);
    
    console.log('Console errors:', errors);
    
    // Check if game elements are present
    const gameBoard = page.locator('.game-board');
    await expect(gameBoard).toBeVisible();
    
    const plantSelector = page.locator('.plant-selector');
    await expect(plantSelector).toBeVisible();
    
    // Check if we can see the game state in the DOM
    const gameState = await page.evaluate(() => {
      // Try to access the game state from the window object or React dev tools
      return (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ || 'No React dev tools';
    });
    
    console.log('Game state access:', gameState);
  });

  test('should check if game loop is running', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Add a simple test to see if the game is updating
    const initialSun = await page.locator('.sun-amount').textContent();
    console.log('Initial sun:', initialSun);
    
    // Wait and check if anything changes
    await page.waitForTimeout(3000);
    
    const finalSun = await page.locator('.sun-amount').textContent();
    console.log('Final sun:', finalSun);
    
    // Check if there are any zombies in the DOM
    const zombieCount = await page.locator('.zombie').count();
    console.log('Zombie count:', zombieCount);
    
    // Check if there are any plants in the DOM
    const plantCount = await page.locator('.plant').count();
    console.log('Plant count:', plantCount);
  });
});
