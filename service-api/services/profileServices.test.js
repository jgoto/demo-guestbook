jest.mock('../util/supabaseClient', () => {
    const mockMaybeSingle = jest.fn();
    const mockEq = jest.fn(()=>({ maybeSingle: mockMaybeSingle }));
    const mockSelect = jest.fn(()=>({ eq: mockEq }));
    const mockFrom = jest.fn(()=>({ select: mockSelect }));
    const supabase = {from: mockFrom}

    return {
        supabase,
        __mocks: {
            mockMaybeSingle,
            mockEq,
            mockSelect,
            mockFrom
        }
    };
});

const {supabase, __mocks} = require('../util/supabaseClient');
const { getProfile } = require('./profileServices');

describe('getProfile', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('returns profile data when the query succeeds', async () => {
        const testProfile = {
            id: 123,
            user_id: "abc",
            name: "Tester"
        };
        __mocks.mockMaybeSingle.mockResolvedValue({data: testProfile});
        const result = await getProfile('abc');

        expect(result).toEqual(testProfile);
        expect(__mocks.mockFrom).toHaveBeenCalled();
        expect(__mocks.mockEq).toHaveBeenCalledWith('user_id', 'abc');
    })

    it('returns undefined and logs an error when the query fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        __mocks.mockMaybeSingle.mockRejectedValue(new Error('DB error'));
        const result = await getProfile('abc');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
})
