const mockInsert = jest.fn();
const mockFrom = jest.fn();

jest.mock('../util/supabaseClient', ()=>({
    supabase: {
        from: mockFrom
    }
}));

const {insertContactRequest} = require('./contactRepository');

describe('insertContactRequest', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    const testContact = {
        'user_id': 'abc',
        'name': 'test user',
        'subject': 'Test',
        'message': 'Only a test'
    }
    test('Send supabase the contact request, On success, insertContactRequest returns a copy of the data', async ()=>{
        const mockReply = {
            data: [{
                id: '123',
                ...testContact
            }]
        }
        mockInsert.mockResolvedValue(mockReply);
        mockFrom.mockReturnValue({insert: mockInsert});

        const result = await insertContactRequest(testContact);
        expect(result).toEqual(mockReply.data);
        expect(mockFrom).toHaveBeenCalledWith('contact_requests');
        expect(mockInsert).toHaveBeenCalledWith(testContact);
    })
    test('Send supabase the contact request, On failure return an error', async () => {
        const mockError = new Error('DB Error');
        mockInsert.mockResolvedValue({data: null, error: mockError});
        mockFrom.mockReturnValue({insert: mockInsert});

        await expect(insertContactRequest(testContact)).rejects.toThrow('DB Error');
    })
})