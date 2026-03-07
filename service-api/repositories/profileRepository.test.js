const mockMaybeSingle = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockFrom = jest.fn();
const mockSingle = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../util/supabaseClient', ()=>({ //keep this until updateProfile is updated to support rls
    supabase: {from: mockFrom}
}));

const mockClient = {

    from: mockFrom
}

const { selectProfile, updateProfile } = require('./profileRepository');

describe('selectProfile', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('returns profile data when the query succeeds', async () => {
        const testProfile = {
            id: 123,
            user_id: "abc",
            name: "Tester"
        };
        mockMaybeSingle.mockResolvedValue({data: testProfile});
        mockEq.mockReturnValue({maybeSingle: mockMaybeSingle});
        mockSelect.mockReturnValue({eq: mockEq});
        mockFrom.mockReturnValue({select: mockSelect});

        const result = await selectProfile('abc', mockClient);

        expect(result).toEqual(testProfile);
        expect(mockFrom).toHaveBeenCalled();
        expect(mockEq).toHaveBeenCalledWith('user_id', 'abc');
    })

    test('returns undefined and logs an error when the query fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        mockMaybeSingle.mockRejectedValue(new Error('DB error'));
        const result = await selectProfile('abc', mockClient);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
})

describe('updateProfile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    const testChanges = {            
            first_name: 'omed',
            last_name: 'retset'
        };
    test('returns new profile data when the query succeeds', async () => {
        mockSingle.mockResolvedValue({data: testChanges, error: null});
        mockSelect.mockReturnValue({single: mockSingle});
        mockEq.mockReturnValue({select: mockSelect});
        mockUpdate.mockReturnValue({eq: mockEq});
        mockFrom.mockReturnValue({update: mockUpdate});

        const result = await updateProfile('abc', testChanges);

        expect(result).toEqual(testChanges);
        expect(mockFrom).toHaveBeenCalled();
        expect(mockEq).toHaveBeenCalledWith('user_id', 'abc');
    })

    test('return undefined and throws an error when the query fails', async () => {
        
        mockSingle.mockResolvedValue({data: null, error: new Error('DB Error')});
        await expect(updateProfile('abc', testChanges)).rejects.toThrow('DB Error');
    })
})
