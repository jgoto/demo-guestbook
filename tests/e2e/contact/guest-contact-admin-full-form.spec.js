import {test, expect} from '@playwright/test';
import ContactPage from '../../pom/pages/ContactPage';

test.use({storageState: {cookies: [], origins: []}});

test('Guest can fill out the contact form and submit it', async ({page}) => {
    const contactPage = new ContactPage(page);

    await contactPage.goto();
    await expect(contactPage.publicContactForm).toBeVisible();
    await contactPage.submitContact('Test Tester', 'test234@example.com', 'Hello World!', 'This is a test message');
    await expect(contactPage.submitMsg).toBeVisible();
})