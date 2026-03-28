const { AppError } = require('../errors/AppError');

jest.mock('../repositories/avatarRepository', () => ({
    selectAvatarSignedUrl: jest.fn()
}))

const userId = 'abc'

const { selectAvatarSignedUrl } = require('../repositories/avatarRepository');

describe('selectAvatarSignedUrl', (() => {
    const testData = 'signed_url';

    test('recieve signed url on success', async () => {
        selectAvatarSignedUrl.mockResolvedValue(testData);
        const result = await selectAvatarSignedUrl(userId);

        expect(result).toEqual(testData);
        expect(selectAvatarSignedUrl).toHaveBeenCalledWith('abc');
    })
}))