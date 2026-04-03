import {test, expect} from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';

test('Guest can read posts on the home page', async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await expect(homePage.loadingText).toBeHidden();
    await expect(homePage.messageFeed).toBeVisible();
})