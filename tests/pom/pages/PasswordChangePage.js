class PasswordChangePage{
    constructor(page){
        this.page = page;

        this.pwChangeInput = page.getByTestId('new-pw');
        this.confirmPwChangeInput = page.getByTestId('confirm-new-pw');
        this.pwChangeSubmitBtn = page.getByRole('button', {name: 'Submit'});
        this.pwMsg = page.getByTestId('password-change-msg');
        this.MISMATCHED_PW_MSG = 'Passwords must match';
        this.INVALID_PW_MSG = 'Password must be 8+ chars, include upper/lowercase, number & special character';
    }

    async goto(){
        await this.page.goto('http://localhost:5173/changepassword');
    }

    async submitPwChange(newPw, confirmPw){
        await this.pwChangeInput.fill(newPw);
        await this.confirmPwChangeInput.fill(confirmPw);
        await this.pwChangeSubmitBtn.click();
    }
}

export default PasswordChangePage;