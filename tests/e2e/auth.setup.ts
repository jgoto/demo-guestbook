import {test as setup, expect} from '@playwright/test';
import LoginPage from '../pom/pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PW);
    await expect(page).toHaveURL(/\/$/);

    await page.context().storageState({path: authFile});
});