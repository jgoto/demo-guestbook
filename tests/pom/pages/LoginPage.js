class LoginPage{
    constructor(page){
        this.page = page;

        this.emailInput = page.locator('#login-email');
        this.passwordInput = page.locator('#login-password');
        this.loginBtn = page.getByRole('button', { name: /Login/i});
    }

    async goto(){
        await this.page.goto('http://localhost:5173/login')
    }

    async login(email, password){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}

export default LoginPage;