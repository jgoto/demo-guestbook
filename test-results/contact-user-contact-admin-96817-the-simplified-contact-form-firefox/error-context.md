# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact/user-contact-admin-simple-form.spec.js >> Authenticated user uses the simplified contact form
- Location: tests/e2e/contact/user-contact-admin-simple-form.spec.js:4:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('simple-contact-form')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('simple-contact-form')

```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import ContactPage from '../../pom/pages/ContactPage';
  3  | 
  4  | test('Authenticated user uses the simplified contact form', async ({page}) =>{
  5  |     const contactPage = new ContactPage(page);
  6  | 
  7  |     await contactPage.goto();
  8  |     
  9  |     await expect(contactPage.appLoadingMsg).toHaveCount(0);
  10 |     await page.pause();
> 11 |     await expect(contactPage.simpleContactForm).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  12 |     await contactPage.submitSimpleContact("Test Message", "This is a test, only a test");
  13 |     await expect(contactPage.submitMsg).toBeVisible();
  14 | });
```