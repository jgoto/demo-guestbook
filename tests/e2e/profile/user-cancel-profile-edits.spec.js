import {test, expect} from '@playwright/test';
import ProfilePage from '../../pom/pages/ProfilePage';

test('Authenticated user can cancel profile changes before saving', async ({page}) => {
    const profilePage = new ProfilePage({page});
    await profilePage.goto();
    await profilePage.editProfileBtn.click();
    await expect(profilePage.profileEditForm.locator('input')).toHaveCount(3);
    await expect(profilePage.firstNameInput).toBeVisible();
    await expect(profilePage.lastNameInput).toBeVisible();
    await expect(profilePage.nicknameInput).toBeVisible();
    await profilePage.editProfileCancelBtn.click();
    await expect(profilePage.profileEditForm).toHaveCount(0);
    await expect(profilePage.profileDetails).toHaveCount(1);
})