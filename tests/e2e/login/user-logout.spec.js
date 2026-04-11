import { test, expect } from '@playwright/test';
import LoginPage from '../../pom/pages/LoginPage';

test.use({storageState: {cookies: [], origins: []}});

test('Authenticated User Logs out when the logout button is clicked', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();    
    await loginPage.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PW);
    await expect(page).toHaveURL(/\/$/);
    await loginPage.goto();
    await loginPage.logout();
    await expect(loginPage.loginPageMsg).toBeVisible();
    await expect(loginPage.loginPageMsg).toContainText(loginPage.LOGOUT_MSG);
})