import {test, expect} from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';

test.use({storageState: {cookies: [], origins: []}});

test('Guest to be restricted from making posts by hiding option', async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    expect(await homePage.newPostForm.count()).toBe(0);
})
