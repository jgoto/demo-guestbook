class ProfilePage{
    constructor({page}){
        this.page = page;
        this.profileFname = page.getByTestId('profile-fname');
        this.profileLname = page.getByTestId('profile-lname');
        this.profileNickname = page.getByTestId('profile-nickname');
        this.profileEmail = page.getByTestId('profile-email');
        this.profileAvatar = page.getByRole('img');
    }

    async goto(){
        await this.page.goto('http://localhost:5173/profile');
    }
}

export default ProfilePage;