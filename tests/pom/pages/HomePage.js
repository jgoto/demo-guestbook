class HomePage{
    constructor(page){
        this.page = page;

        this.newPostForm = page.getByTestId('new-post-form');
        this.newPostInput = page.getByRole('textbox', {name: 'Write a message'});
        this.sendBtn = page.getByRole('button', {name: 'Send'});

        this.loadingText = page.getByTestId('loading-text');
        this.messageFeed = page.getByTestId('message-feed')
    }

    async goto(){
        await this.page.goto('http://localhost:5173/');
    }
}

export default HomePage;