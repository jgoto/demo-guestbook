const mockOrder = jest.fn();
const mockSelect = jest.fn();
const mockInsert = jest.fn();
const mockFrom = jest.fn();

jest.mock('../util/supabaseClient', () => ({
    supabase: {from: mockFrom},
}));

const mockClient = {
    from: mockFrom
}

const { selectAllmessages, selectMessagesWithAuthors, createMessage } = require('./postRepository');

describe('selectAllMessages', (()=>{
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('selectAllMessages returns feed data ordered most recent post first', async () => {
        const mockData = [{ id: 1, text: 'Hello'}, {id: 2, text: 'World'}];
        mockOrder.mockResolvedValue({ data: mockData});
        mockSelect.mockReturnValue({order: mockOrder});
        mockFrom.mockReturnValue({select: mockSelect});

        const data = await selectAllmessages();

        expect(data).toEqual(mockData);
        expect(mockFrom).toHaveBeenCalledWith('messages');
        expect(mockSelect).toHaveBeenCalledWith('*');
        expect(mockOrder).toHaveBeenCalledWith('created_at', {ascending: false});
    });
}))

test('selectMessagesWithAuthors returns feed data and author data and is ordered most recent first', async () => {
    const mockData = [{id: 1, text: 'Hello', profiles: {user_id: '123', first_name: 'Test', nickname: 'Tester'}}, {
        id: 2, text: 'World!', profiles: {user_id: '456', first_name: 'User', nickname: ''}
    }]

    mockOrder.mockResolvedValue({ data: mockData});
    mockSelect.mockReturnValue({order: mockOrder});
    mockFrom.mockReturnValue({select: mockSelect});

    const data = await selectMessagesWithAuthors();

    expect(data).toEqual(mockData);
    expect(mockFrom).toHaveBeenCalledWith('messages');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockOrder).toHaveBeenCalledWith('created_at', {ascending: false});
})

test('createMessage sends a request to Supabase and recieves the inserted data', async () => {
    const post = {content: 'new post', user_id: 'qwerty'};
    const mockReply = { data: [{ id: 1, ...post }]};

    mockInsert.mockResolvedValue(mockReply);
    mockFrom.mockReturnValue({insert: mockInsert})

    const result = await createMessage(mockClient, post);
    expect(result).toEqual(mockReply.data);
    expect(mockFrom).toHaveBeenCalledWith('messages');
    expect(mockInsert).toHaveBeenCalledWith(post);
});

test('selectAllRecords records error and returns undefined when Supabase fails', async () => {
    mockOrder.mockResolvedValue({data: null, error: new Error('Something went wrong')});
    mockSelect.mockReturnValue({order: mockOrder});
    mockFrom.mockReturnValue({select: mockSelect});

    await expect(selectAllmessages()).rejects.toThrow('Something went wrong');
});

test('selectMessagesWithAuthors throws an error when Supabase fails', async ()=>{
    mockOrder.mockResolvedValue({data: null, error: new Error('Something went wrong')});
    mockSelect.mockReturnValue({order:mockOrder});
    mockFrom.mockReturnValue({select: mockSelect});
    await expect(selectMessagesWithAuthors()).rejects.toThrow('Something went wrong');
} )

test('postMessage records error and returns undefined when Supabase fails', async () => {
    const post = { text: 'Failing post' };

    mockInsert.mockResolvedValue({data: null, error: new Error('Something went wrong')});
    mockFrom.mockReturnValue({insert: mockInsert});
    
    await expect(createMessage(mockClient, post)).rejects.toThrow('Something went wrong');
})
