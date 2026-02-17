jest.mock('../util/supabaseClient', () => ({
    from: jest.fn(() => ({
        select: jest.fn(() => ({
            order: jest.fn()
        })),
        insert: jest.fn()
    }))  
}));

const supabase = require('../util/supabaseClient');
const { getFeed, postMessage } = require('./postServices');

test('getFeed returns feed data', async () => {
    const mockData = [{ id: 1, text: 'Hello'}, {id: 2, text: 'World'}];
    
    const orderMock = jest.fn().mockResolvedValue({ data: mockData});
    const selectMock = jest.fn(() => ({order: orderMock}));
    supabase.from.mockReturnValue({select: selectMock});

    const result = await getFeed();

    expect(result).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith('messages');
    expect(selectMock).toHaveBeenCalledWith('*');
    expect(orderMock).toHaveBeenCalledWith('created_at', {ascending: false});
});

test('postMessage returns inserted data', async () => {
    const post = {text: 'new post'};
    const mockReply = { data: [{ id: 1, ...post }]};

    supabase.from.mockReturnValue({ insert: jest.fn().mockResolvedValue(mockReply)});

    const result = await postMessage(post);
    expect(result).toEqual(mockReply);
    expect(supabase.from).toHaveBeenCalledWith('messages');
});

test('getFeed records error and returns undefined when Supabase fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const orderMock = jest.fn().mockRejectedValue(new Error('Something went wrong'));
    const selectMock = jest.fn(() => ({ order: orderMock }));
    supabase.from.mockReturnValue({ select: selectMock });

    const result = await getFeed();

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error fetching feed'), expect.any(Error));

    consoleSpy.mockRestore();
});

test('postMessage records error and returns undefined when Supabase fails', async () => {
    const post = { text: 'Failing post' };
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    supabase.from.mockReturnValue({ insert: jest.fn().mockRejectedValue(new Error('Something went wrong'))});

    const result = await postMessage(post);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error adding post'), expect.any(Error));

    consoleSpy.mockRestore();
})