import {test, expect} from '@playwright/test'
import PasswordChangePage from '../../pom/pages/PasswordChangePage'

test('Authenticated user can update password. submitting mismatched passwords are rejected', async ({page}) =>{
    const changePwPage = new PasswordChangePage(page);
    await changePwPage.goto();
    await expect(changePwPage.pwChangeInput).toHaveCount(1);
    await expect(changePwPage.confirmPwChangeInput).toHaveCount(1);
    await changePwPage.submitPwChange('Password1@', '1@wordPass');
    await expect(changePwPage.pwMsg).toContainText(changePwPage.MISMATCHED_PW_MSG);
})

test('Authenticated user submitting invalid passwords are rejected', async ({page}) => {
    const changePwPage = new PasswordChangePage(page);
    await changePwPage.goto();
    await changePwPage.submitPwChange('password', 'password');
    await expect(changePwPage.pwMsg).toContainText(changePwPage.INVALID_PW_MSG);
})