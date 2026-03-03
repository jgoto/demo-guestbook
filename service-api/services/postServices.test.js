jest.mock('../repositories/postRepository', ()=>({
    selectAllmessages: jest.fn(),
    createMessage: jest.fn()
}))

const { selectAllmessages, createMessage } = require('../repositories/postRepository');
const { getFeed, createNewMessage } = require('./postServices');

describe('getFeed', (()=>{
    test('getFeed returns feed data', async () => {
        const mockData = [{ id: 1, text: 'Hello'}, {id: 2, text: 'World'}];
        selectAllmessages.mockResolvedValue({data: mockData, error: null});
        const result = await getFeed();

        expect(result).toEqual(mockData);
    });
}))

test('postMessage returns inserted data', async () => {
    const post = {text: 'new post'};
    createMessage.mockResolvedValue({data: post, error: null})

    const result = await createNewMessage(post);
    expect(result).toEqual(post);
});

test('getFeed records error and returns undefined when Supabase fails', async () => {    
    const result = await getFeed();
    selectAllmessages.mockRejectedValue(new Error('Something went wrong'));
    await expect(getFeed()).rejects.toThrow('Something went wrong');
});

test('createNewMessage records error and returns undefined when Supabase fails', async () => {
    const post = { text: 'Failing post' };
    createMessage.mockRejectedValue(new Error('Something went wrong'));
    await expect(createMessage(post)).rejects.toThrow('Something went wrong');
})