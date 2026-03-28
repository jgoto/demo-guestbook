const {AppError} = require('../errors/AppError');

jest.mock('../services/avatarServices', () => ({
    viewAvatar: jest.fn()
}));

const {routeGetAvatar} = require('./avatarController');
const {viewAvatar} = require('../services/avatarServices');

describe('routeGetAvatar', (() => {
    const req = {
        params: {
            userId: 'abc'
        }  
    }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    const testData = 'signed_url';

    beforeEach(()=>{
        jest.clearAllMocks();
    })
    test('recieve signed url and updates res data as json and set http status to 200', async () => {
        viewAvatar.mockResolvedValue({data: testData});
        const result = await routeGetAvatar(req, res);
        expect(viewAvatar).toHaveBeenCalledWith('abc');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({data: testData});        
    });
    test('On DB failure, routeGetAvatar catches errors and returns them with http status 500', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        viewAvatar.mockRejectedValue(new Error('something went wrong'));
        const result = await routeGetAvatar(req, res);
        expect(consoleSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal Server Error'});
        consoleSpy.mockRestore();
    });
    test('On other failures, routeGetAvatar returns custom error http status and message', async () => {
        viewAvatar.mockRejectedValue(new AppError("Record not found", 404));
        const result = await routeGetAvatar(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith("Record not found");
    })
}));