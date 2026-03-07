jest.mock('../services/avatarServices', () => ({
    viewAvatar: jest.fn()
}));

const {routeGetAvatar} = require('./avatarController');
const {viewAvatar} = require('../services/avatarServices');

describe('routeGetAvatar', (() => {
    const req = {
        params: {
            userId: 'abc'
        },
        userClient: {}        
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
        expect(viewAvatar).toHaveBeenCalledWith('abc', {});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({data: testData});        
    })
}))