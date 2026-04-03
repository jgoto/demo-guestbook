class Navigation {
    constructor(page) {
        this.page = page;

        this.guestbookLink = page.getByRole('link', { name: 'Guestbook' });
        this.contactLink = page.getByRole('link', { name: 'Contact' });
        this.loginLink = page.getByRole('link', { name: 'Login'});

        this.profileLink = page.getByRole('link', { name: 'Profile'});
    }

    async goGuestbook() {
        await this.guestbookLink.click();
    }

    async goContact() {
        await this.contactLink.click();
    }

    async goLogin() {
        await this.loginLink.click();
    }

    async goProfile() {
        if(await this.profileLink.count() > 0) {
            await this.profileLink.click();
        } else {
            throw new Error("Profile link not visible (user may not be logged in)");
        }
    }
}

export default Navigation;