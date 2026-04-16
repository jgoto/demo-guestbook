import { test, expect } from '@playwright/test';
import LoginPage from '../../pom/pages/LoginPage';

test.use({storageState: {cookies: [], origins: []}});

test('Authenticated User Logs out when the logout button is clicked', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();    
    await loginPage.login(process.env.AUTH_TEST_EMAIL, process.env.AUTH_TEST_PW);
    await expect(page).toHaveURL(/\/$/);
    await loginPage.goto();
    await loginPage.logout();
    await expect(loginPage.loginPageMsg).toContainText(loginPage.LOGOUT_MSG);
})