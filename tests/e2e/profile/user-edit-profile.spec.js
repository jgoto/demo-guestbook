import { test, expect } from '@playwright/test';
import ProfilePage from '../../pom/pages/ProfilePage';

test('Profile fields can be edited', async ({page}, testInfo) => {
    const profilePage = new ProfilePage({page});
    const testFname = `Sally-${testInfo.title} - ${testInfo.workerIndex}`;
    const testLname = `Example-${Date.now()}`;
    const testNickname = `Sally`;
    await profilePage.goto();
    await profilePage.editProfileBtn.click();
    await expect(profilePage.profileEditForm).toBeVisible();
    await profilePage.updateProfile(testFname, testLname, testNickname);
    await expect(profilePage.profileFname).toContainText(testFname);
    await expect(profilePage.profileLname).toContainText(testLname);
    await expect(profilePage.profileNickname).toContainText(testNickname);
});