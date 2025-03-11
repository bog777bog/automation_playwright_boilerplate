import { ConsoleMessage, Page, test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    page.on('console', async (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        console.error(`Error: ${msg.text()}`);
        // throw new Error('Error');
      }
    });
    await use(page);
  },
});
