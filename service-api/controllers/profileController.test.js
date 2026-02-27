jest.mock('../services/profileServices', ()=>({
    getProfile: jest.fn()
}));

const {routeGetProfile} = require('../controllers/profileController');
const {getProfile} = require('../services/profileServices');

describe('profileController', () => {
    const req = { 
        body: {user_id: 'abc'} 
    };
    const res = {
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    }
    const testData = {
        id: '123',
        user_id: 'abc',
        name: 'Tester'
    }
    beforeEach(() => jest.clearAllMocks());
    test('recive user profile data and updates res with data as json and http status 200', async ()=>{
        getProfile.mockResolvedValue(testData);
        await routeGetProfile(req, res);
        expect(getProfile).toHaveBeenCalledWith('abc');
        expect(res.json).toHaveBeenCalledWith(testData);
    });
    test('returns 500 status when request generates an error', async ()=>{
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        getProfile.mockRejectedValue(new Error('DB Error'));
        await routeGetProfile(req, res);
        
        expect(consoleSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal Server Error'});

        consoleSpy.mockRestore();
    })
    test('returns 404 status when the request is successful but has a null value', async ()=>{
        const missingProfile = {
            body: {user_id: '000'}
        };
        getProfile.mockResolvedValue(null);
        await routeGetProfile(missingProfile, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({error: 'Profile not found'});
    })
})