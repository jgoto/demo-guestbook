import {test, expect} from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';

test('Newly created post displays on the home page', async ({page}) => {
    const randomStr = `test: ${Math.random().toString(36).slice(2)}`;
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.createNewPost(randomStr);

    const newPost = await homePage.messageFeed.getByText(randomStr);
    await expect(newPost).toBeVisible();
})