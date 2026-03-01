const mockMaybeSingle = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockFrom = jest.fn();
const mockSingle = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../util/supabaseClient', ()=>({
    supabase: {from: mockFrom}
}))

const { getProfile, patchProfile } = require('./profileServices');

describe('getProfile', () => {
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

        const result = await getProfile('abc');

        expect(result).toEqual(testProfile);
        expect(mockFrom).toHaveBeenCalled();
        expect(mockEq).toHaveBeenCalledWith('user_id', 'abc');
    })

    test('returns undefined and logs an error when the query fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        mockMaybeSingle.mockRejectedValue(new Error('DB error'));
        const result = await getProfile('abc');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
})

describe('patchProfile', () => {
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

        const result = await patchProfile('abc', testChanges);

        expect(result).toEqual(testChanges);
        expect(mockFrom).toHaveBeenCalled();
        expect(mockEq).toHaveBeenCalledWith('user_id', 'abc');
    })

    test('return undefined and throws an error when the query fails', async () => {
        
        mockSingle.mockResolvedValue({data: null, error: new Error('DB Error')});
        await expect(patchProfile('abc', testChanges)).rejects.toThrow('DB Error');
    })

    test('returns an error if there are no changes', () => {
        const noChanges = null;
        expect(patchProfile('abc', noChanges)).rejects.toThrow('No changes provided');
    })

    test('return an error if there is no id', () => {
        expect(patchProfile('', testChanges)).rejects.toThrow('No userId')
    })
})
