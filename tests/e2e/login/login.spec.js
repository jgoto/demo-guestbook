import {test, expect} from '@playwright/test';
import LoginPage from '../../pom/pages/LoginPage';

test.use({storageState: {cookies: [], origins: []}});

test('user filling in email and password and clicking "login" succesfully logs them in', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto();
    await loginPage.login(process.env.AUTH_TEST_EMAIL, process.env.AUTH_TEST_PW);

    await expect(page).toHaveURL(/\/$/);  // This will do for now, but we need a more robust means of verifying test
})