import { test, expect } from '@playwright/test';
import ProfilePage from '../../pom/pages/ProfilePage';

test('Authenticated user can review their profile populated with correct data', async ({page}) => {
    const profilePage = new ProfilePage({page});
    await profilePage.goto();
    await page.pause();
    await expect(profilePage.profileFname).toHaveText(/Sally/);
    await expect(profilePage.profileLname).toHaveText(/Example/);
    await expect(profilePage.profileNickname).toHaveText(/Sally/);
    await expect(profilePage.profileEmail).toHaveText(/test@example.com/);
    await expect(profilePage.profileAvatar).toHaveAttribute('src', /.+/);
});