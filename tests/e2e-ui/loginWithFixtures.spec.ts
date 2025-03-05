import { Data } from '@data/users.data';
import { test } from '../../fixtures/fixturePages';
import { expect } from '@playwright/test';
import { urlsData } from '@data/urls.data';
import { Application } from '@pages/index';
import { userData } from '@data/login.data';
import { authenticated } from '@fixtures/fixtures';

// example of page initialiser https://github.com/microsoft/playwright/issues/12176
test.describe.configure({ mode: 'serial' });

test.describe('Login', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto(urlsData.baseUrl);
  });

  ['validUser', 'problemUser', 'lockedUser'].forEach((userType) => {
    test(`${userType} user is able to login with valid creds and logout`, async ({
      page,
      loginPage,
      accountPage,
    }) => {
      await loginPage.login(
        userData[userType].email,
        userData[userType].password,
      );
      await loginPage.checkLoginButtonIsNotVisible();

      await page.waitForURL(urlsData.plpUrl, { timeout: 10000 });

      await accountPage.logOutFromAccount();
      expect(await page.content()).toContain('Accepted usernames are');
    });
  });

  authenticated(
    'user logs out form My Account',
    async ({ page, authenticatedPage }) => {
      await test.step('Logging out from My Account', async () => {
        await authenticatedPage.logOutFromAccount();
        expect(await page.content()).toContain('Accepted usernames are');
      });
    },
  );

  test('problem user is able to login', async ({ page, APP }) => {
    await test.step('Logging in as a problem user', async () => {
      await APP.loginPage.login(
        userData.problemUser.email,
        userData.problemUser.password,
      );
    });
    await test.step('Verify that the problem user is logged in', async () => {
      await page.waitForURL(urlsData.plpUrl);
    });
    await test.step('Logout from Account', async () => {
      await APP.accountPage.logOutFromAccount();
    });
    await test.step('Verify that the problem user is logged out', async () => {
      expect.soft(await page.content()).toContain('WRONG TEXT');
      expect(await page.content()).toContain('Accepted usernames are');
    });
  });

  test.skip('problem user is not able to login', async ({ page, APP }) => {
    await test.step('Logging in as a problem user', async () => {
      await APP.loginPage.login(
        userData.problemUser.email,
        userData.problemUser.password,
      );
    });
    await test.step('Verify that the problem user is logged in', async () => {
      await page.waitForURL(urlsData.plpUrl);
    });
    await test.step('Logout from Account', async () => {
      await APP.accountPage.logOutFromAccount();
    });
    await test.step('Verify that the problem user is logged out', async () => {
      expect.soft(await page.content()).toContain('WRONG TEXT');
      expect(await page.content()).toContain('Accepted usernames are');
    });
  });

  test.only(
    'incomplete test scenario - missing development',
    {
      annotation: {
        type: 'issue',
        description:
          'https://github.com/microsoft/demo.playwright.dev/issues/58',
      },
    },
    async ({ page, APP }) => {
      await test.step('Logging in as a problem user', async () => {
        await APP.loginPage.login(
          userData.problemUser.email,
          userData.problemUser.password,
        );
      });
      await test.step('Verify that the problem user is logged in', async () => {
        expect.soft(await page.content()).toContain('WRONG TEXT');
        await page.waitForURL(urlsData.plpUrl);
      });
    },
  );
});
