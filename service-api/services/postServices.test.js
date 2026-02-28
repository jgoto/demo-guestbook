const mockOrder = jest.fn();
const mockSelect = jest.fn();
const mockInsert = jest.fn();
const mockFrom = jest.fn();

jest.mock('../util/supabaseClient', () => ({
    supabase: {from: mockFrom},
}));

const { getFeed, postMessage } = require('./postServices');

describe('getFeed', (()=>{
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('getFeed returns feed data', async () => {
        const mockData = [{ id: 1, text: 'Hello'}, {id: 2, text: 'World'}];
        mockOrder.mockResolvedValue({ data: mockData});
        mockSelect.mockReturnValue({order: mockOrder});
        mockFrom.mockReturnValue({select: mockSelect});

        const result = await getFeed();

        expect(result).toEqual(mockData);
        expect(mockFrom).toHaveBeenCalledWith('messages');
        expect(mockSelect).toHaveBeenCalledWith('*');
        expect(mockOrder).toHaveBeenCalledWith('created_at', {ascending: false});
    });
}))

test('postMessage returns inserted data', async () => {
    const post = {text: 'new post'};
    const mockReply = { data: [{ id: 1, ...post }]};

    mockInsert.mockResolvedValue(mockReply);
    mockFrom.mockReturnValue({insert: mockInsert})

    const result = await postMessage(post);
    expect(result).toEqual(mockReply);
    expect(mockFrom).toHaveBeenCalledWith('messages');
    expect(mockInsert).toHaveBeenCalledWith(post);
});

test('getFeed records error and returns undefined when Supabase fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockOrder.mockRejectedValue(new Error('Something went wrong'));
    mockSelect.mockReturnValue(mockOrder);
    mockFrom.mockReturnValue(mockSelect);

    const result = await getFeed();

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error fetching feed'), expect.any(Error));

    consoleSpy.mockRestore();
});

test('postMessage records error and returns undefined when Supabase fails', async () => {
    const post = { text: 'Failing post' };
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockInsert.mockRejectedValue(new Error('Something went wrong'));
    mockFrom.mockReturnValue(mockInsert);
    
    const result = await postMessage(post);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error adding post'), expect.any(Error));

    consoleSpy.mockRestore();
})