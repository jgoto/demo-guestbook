import {test, expect} from '@playwright/test';
import ContactPage from '../../pom/pages/ContactPage';

test('Authenticated user uses the simplified contact form', async ({page}) =>{
    const contactPage = new ContactPage(page);

    await contactPage.goto();
    
    await expect(contactPage.appLoadingMsg).toHaveCount(0);
    await page.pause();
    await expect(contactPage.simpleContactForm).toBeVisible();
    await contactPage.submitSimpleContact("Test Message", "This is a test, only a test");
    await expect(contactPage.submitMsg).toBeVisible();
});