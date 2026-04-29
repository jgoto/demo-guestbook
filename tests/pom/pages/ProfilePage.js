class ProfilePage{
    constructor({page}){
        this.page = page;
        this.profileDetails = page.getByTestId('profile-details');
        this.profileFname = this.profileDetails.getByTestId('profile-fname');
        this.profileLname = this.profileDetails.getByTestId('profile-lname');
        this.profileNickname = this.profileDetails.getByTestId('profile-nickname');
        this.profileEmail = this.profileDetails.getByTestId('profile-email');
        this.profileAvatar = page.getByRole('img');
        this.editProfileBtn = page.getByRole('button', { name: /Edit/i});
        this.profileEditForm = page.getByTestId('edit-profile-form');
        this.firstNameInput = this.profileEditForm.getByLabel(/first name/i);
        this.lastNameInput = this.profileEditForm.getByLabel(/last name/i);
        this.nicknameInput = this.profileEditForm.getByLabel(/nickname/i);
        this.submitBtn = page.getByRole('button', {name: /Submit/i});
        this.editProfileCancelBtn = page.getByRole('button', {name: /cancel/i});
    }

    async goto(){
        await this.page.goto('http://localhost:5173/profile');
    }

    async updateProfile(fname, lname, nickname){
        await this.firstNameInput.fill(fname);
        await this.lastNameInput.fill(lname);
        await this.nicknameInput.fill(nickname);
        await this.submitBtn.click();
    }
}

export default ProfilePage;