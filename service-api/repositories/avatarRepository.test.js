const mockCreateSignedUrl = jest.fn();
const mockFrom = jest.fn();
jest.mock('../util/supabaseClient', () => ({
    supabase: {
        storage: {from: mockFrom}
    }
}));

const {selectAvatarSignedUrl} = require('./avatarRepository');

describe('selectAvatarSignedUrl', (() => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('On success recive signed url', async ()=>{
        const testData = {data: 'signed_url'}
        mockFrom.mockReturnValue({createSignedUrl: mockCreateSignedUrl});
        mockCreateSignedUrl.mockResolvedValue({data: testData});

        result = await selectAvatarSignedUrl('abc')
        expect(result).toEqual(testData);
        expect(mockFrom).toHaveBeenCalledWith('avatars');
        expect(mockCreateSignedUrl).toHaveBeenCalled();
    });

    test('On failure return an error', async ()=>{
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        mockCreateSignedUrl.mockRejectedValue(new Error('DB Error'));
        const result = await selectAvatarSignedUrl('abc');

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    })
}))