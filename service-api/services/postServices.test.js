jest.mock('../repositories/postRepository', ()=>({
    selectAllmessages: jest.fn(),
    createMessage: jest.fn(),
    selectMessagesWithAuthors: jest.fn()
}))

const { selectAllmessages, selectMessagesWithAuthors, createMessage } = require('../repositories/postRepository');
const { getFeed, getFeedWithAuthors, createNewMessage } = require('./postServices');

describe('getFeed', (()=>{
    test('getFeed returns feed data', async () => {
        const mockData = [{ id: 1, text: 'Hello'}, {id: 2, text: 'World'}];
        selectAllmessages.mockResolvedValue(mockData);
        const data = await getFeed();

        expect(data).toEqual(mockData);
    });
}))

test('getFeedWithAuthors returns feed and author data', async () => {
    const mockData = [{id: 1, text: 'Hello', profiles: {user_id: '123', first_name: 'Test', nickname: 'Tester'}}, {
        id: 2, text: 'World!', profiles: {user_id: '456', first_name: 'User', nickname: 'User'}
    }];
    selectMessagesWithAuthors.mockResolvedValue(mockData);
    const data = await getFeedWithAuthors();

    expect(data).toEqual(mockData);
})

test('postMessage returns inserted data', async () => {
    const post = {text: 'new post'};
    createMessage.mockResolvedValue(post)

    const result = await createNewMessage(post);
    expect(result).toEqual(post);
});

test('getFeed records error and returns undefined when Supabase fails', async () => {    
    selectAllmessages.mockRejectedValue(new Error('Something went wrong'));
    await expect(getFeed()).rejects.toThrow('Something went wrong');
});

test('createNewMessage records error and returns undefined when Supabase fails', async () => {
    const post = { text: 'Failing post' };
    createMessage.mockRejectedValue(new Error('Something went wrong'));
    await expect(createMessage(post)).rejects.toThrow('Something went wrong');
});

test('getFeedWithAuthors throws an error when Supabase fails', async () => {
    selectMessagesWithAuthors.mockRejectedValue(new Error('Something went wrong'));
    await expect(getFeedWithAuthors()).rejects.toThrow('Something went wrong');
})