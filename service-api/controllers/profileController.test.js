const {AppError} = require('../errors/AppError');

jest.mock('../services/profileServices', ()=>({
    viewProfile: jest.fn()
}));

const {routeGetProfile} = require('../controllers/profileController');
const {viewProfile} = require('../services/profileServices');

describe('profileController', () => {
    const req = { 
        params: {userId: 'abc'} 
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
        viewProfile.mockResolvedValue(testData);
        await routeGetProfile(req, res);
        expect(viewProfile).toHaveBeenCalledWith('abc');
        expect(res.json).toHaveBeenCalledWith(testData);
    });
    test('returns 500 status when request generates an error', async ()=>{
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        viewProfile.mockRejectedValue(new Error('DB Error'));
        await routeGetProfile(req, res);
        
        expect(consoleSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal Server Error'});

        consoleSpy.mockRestore();
    })
    test('keep and return the message and status when an AppError is caught', async ()=>{
        const testErr = new AppError("No user id", 400);
        viewProfile.mockRejectedValue(testErr);
        await routeGetProfile({params: {userId: ''}}, res);
        expect(res.json).toHaveBeenCalledWith('No user id');
        expect(res.status).toHaveBeenCalledWith(400);
    })
})