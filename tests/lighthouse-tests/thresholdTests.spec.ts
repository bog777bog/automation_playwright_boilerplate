import { test, expect, Page } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse'
import playwright from 'playwright';

test.describe('Lighthouse Threshold Tests', () => {
  ['https://www.avis.com.ua/',
   'https://www.avis.com.ua/offers/Ukraine-offers/',
   'https://www.avis.com.ua/our-fleet/core/']
   .forEach((pageName, index) => {
      test(`Verifies SEO and Accessibility scores for ${pageName} page`, { tag: '@thresholdTests' }, async ({ }) => {
        const browser = await playwright['chromium'].launch({
          args: [`--remote-debugging-port=${9222 + index}`],
        });
        const page = await browser.newPage();
        await page.goto(pageName);

        await playAudit({
          page: page,
          thresholds: {
            performance: 50,
            accessibility: 50,
            'best-practices': 50,
            seo: 92,
            pwa: 50,
          },
          port: 9222 + index,

          reports: {
            formats: {
              // json: true, //defaults to false
              html: true, //defaults to false
              // csv: true, //defaults to false
            },
            name: `lighthouse---${new Date().getTime()}`,
            directory: `seo-report`, //defaults to `${process.cwd()}/lighthouse`
          }
        });

        await browser.close();
        }
      );
    });
});