import {test, expect } from '@playwright/test';
import Navigation from '../pom/components/Navigation';

test.use({storageState: {cookies: [], origins: []}});

test('navbar links navigate correctly for logged-out user', async ({page}) => {
    const nav = new Navigation(page);

    await page.goto('http://localhost:5173');

    await nav.goGuestbook();
    await expect(page).toHaveURL(/\/$/);

    await nav.goContact();
    await expect(page).toHaveURL(/\/contact/);

    await nav.goLogin();
    await expect(page).toHaveURL(/\/login/);

    expect(await nav.profileLink.count()).toBe(0);
})