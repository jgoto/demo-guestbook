jest.mock('../services/contactServices', () => ({
    createContactMessage: jest.fn()
}));

const { createContactMessage } = require('../services/contactServices');
const {routeSendContact} = require('./contactController');
const testContact = {
    'user_id': 'abc',
    'name': 'test user',
    'subject': 'Test',
    'message': 'Only a test'
};
const req = {
    body: testContact,
    ip: '::ffff:127.0.0.1',
    headers: {
        'user-agent': 'test-user-agent'
    }
}
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('routeSendContact', () => {
    
    test('On success, routeSendContact returns an http status of 201 and a copy of the reply', async () => {
        const testResult = {...testContact, ip: req.ip, user_agent: req.headers['user-agent']}
        createContactMessage.mockResolvedValue(testResult);
        await routeSendContact(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({message: "Thank you for contacting us"});
    })
    test('On failure, routeSendContact returns an error', async () =>{
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        createContactMessage.mockRejectedValue(new Error('Something went wrong'));
        await routeSendContact(req, res);
        expect(consoleSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        consoleSpy.mockRestore();
    })
})