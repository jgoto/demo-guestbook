class LoginPage{
    constructor(page){
        this.page = page;

        this.emailInput = page.locator('#login-email');
        this.passwordInput = page.locator('#login-password');
        this.loginBtn = page.getByRole('button', { name: /Login/i});

        this.page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        this.logoutBtn = page.getByRole('button', {name: /Logout/i});
        this.loginPageMsg = page.getByTestId('login-page-msg');
        this.LOGOUT_MSG = 'You have logged out';
    }

    async goto(){
        await this.page.goto('http://localhost:5173/login');
    }

    async triggerAndHandleAlert(){
        await this.alertBtn.click();
    }

    async login(email, password){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async logout(){
        await this.logoutBtn.click();
    }
}

export default LoginPage;