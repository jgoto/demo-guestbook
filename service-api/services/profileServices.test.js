const AppError = require('../errors/AppError')

jest.mock('../repositories/profileRepository', ()=> ({
    selectProfile: jest.fn()
}))

const { selectProfile } = require("../repositories/profileRepository");

describe('selectProfile', (()=>{
    const testUser = { user_id: 'abc', first_name: 'test', last_name: 'user', nickname: 'tester'};
    test("Recive test user's data when selectProfile succeeds", async () => {
        selectProfile.mockResolvedValue(testUser);
        const result = await selectProfile(testUser.user_id);

        expect(result).toEqual(testUser);
        expect(selectProfile).toHaveBeenCalledWith(testUser.user_id);
    })
    test("Throw an error if the uuid is empty or null or otherwise invalid", async () => {
        const invalidId = '';
        try {
            await selectProfile(invalidId);    
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error.status).toBe(400);
            expect(error.message).toBe('No user id');    
        }
    })
    test("Throw an error if the resulting data is null", async () => {
        selectProfile.mockResolvedValue(null);
        try {
            const result = await selectProfile('def');
            expect(result).toBe(null);
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error.status).toBe(400);
            expect(error.message).toBe('Record not found');
        }
    })
}))