class ContactPage{
    constructor(page){
        this.page = page;

        this.publicContactForm = page.getByTestId('public-contact');
        this.nameInput = page.getByLabel('Name');
        this.emailInput = page.getByLabel('Email');
        this.subjectInput = page.getByLabel('Subject');
        this.messageInput = page.getByLabel('Message');
                
        this.simpleContactForm = page.getByTestId('simple-contact-form');
        this.simpleSubject = page.getByLabel('simple-subject');
        this.simpleMessage = page.getByLabel('simple-message');

        this.submitBtn = page.getByRole('button', {name: 'submit'});
        this.submitMsg = page.getByTestId('submit-msg');
    }
    
    async goto(){
        await this.page.goto('http://localhost:5173/contact');
    }

    async submitContact(name, email, subject, message){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
        await this.submitBtn.click();
    }
}

export default ContactPage;