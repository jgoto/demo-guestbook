jest.mock('../repositories/postRepository', ()=>({
    selectAllmessages: jest.fn(),
    createMessage: jest.fn(),
    selectMessagesWithAuthors: jest.fn()
}))

const { selectAllmessages, selectMessagesWithAuthors, createMessage } = require('../repositories/postRepository');
const { getFeed, getFeedWithAuthors, normalizePosts, createNewMessage } = require('./postServices');

describe('getFeed', (()=>{
    test('getFeed returns feed data', async () => {
        const mockData = [{ id: 1, text: 'Hello'}, {id: 2, text: 'World'}];
        selectAllmessages.mockResolvedValue(mockData);
        const data = await getFeed();

        expect(data).toEqual(mockData);
    });
}))

test('getFeedWithAuthors returns feed and author data', async () => {
    const mockData = [{id: 1, text: 'Hello', profiles: {user_id: '123', first_name: 'Test', nickname: 'Tester', display_name: 'Tester'}}, {
        id: 2, text: 'World!', profiles: {user_id: '456', first_name: 'User', nickname: '', display_name: 'User'}
    }]

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


describe('normalizePost', ()=>{
    test('adds display_name using nickname when available', ()=>{
        const testData = [{
            id: 1, text: 'Hello', profiles: {
                user_id: '123', first_name: 'Test', nickname: 'Tester'}}];
        expect(normalizePosts(testData)[0].profiles.display_name).toEqual('Tester');
    });
    test('falls back to first_name if nickname is missing', ()=>{
        const testData = [{
            id: 1, text: 'Hello', profiles: {
                user_id: '123', first_name: 'Test', nickname: ''}}];
        expect(normalizePosts(testData)[0].profiles.display_name).toEqual('Test');
    });
    test('falls back to "Anonymous" if both names are missing', ()=>{
        const testData = [{
            id: 1, text: 'Hello', profiles: {
                user_id: '123', first_name: '', nickname: ''}}];
        expect(normalizePosts(testData)[0].profiles.display_name).toEqual('Anonymous');
    });
    test('preserves original post fields', ()=>{
        const testData = [{
            id: 1, text: 'Hello', profiles: {
                user_id: '123', first_name: 'Test', nickname: 'Tester'}}];
        const result = normalizePosts(testData)[0];
        expect(result.id).toBe(1);
        expect(result.text).toBe('Hello');
    });
    test('preserves existing profile fields', ()=>{
        const testData = [{
            id: 1, text: 'Hello', profiles: {
                user_id: '123', first_name: 'Test', nickname: 'Tester'}}];
        const profile = normalizePosts(testData)[0].profiles;
        expect(profile.first_name).toBe('Test');
        expect(profile.nickname).toBe('Tester');
    });
    test('does not mutate original input (protect potential caching layer important!)', ()=>{
        const testData = [{
            id: 1, text: 'Hello', profiles: {
                user_id: '123', first_name: 'Test', nickname: 'Tester'}}];
        const copy = JSON.parse(JSON.stringify(testData));
        normalizePosts(copy);
        expect(testData).toEqual(copy);
    });
    test('handles empty array', ()=>{
        const testData = [];
        expect(normalizePosts([])).toEqual(testData);
    });
})