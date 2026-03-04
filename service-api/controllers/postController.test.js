jest.mock('../services/postServices', ()=>({
    getFeed: jest.fn(),
    createNewMessage: jest.fn()
}));

const {routeGetFeed, routeCreateMessage} = require('./postController');
const {getFeed, createNewMessage} = require('../services/postServices');
const req = {
        body: {
            content: { message: 'This is a test' }
        },
        user_id: 'abc'        
    }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

describe('postController', () => {
    test('routeGetFeed returns an array of messages', async ()=>{
        const testFeed = [{message: 'test one'}, {message: 'test two'}, {message: 'test three'}];
        getFeed.mockResolvedValue(testFeed)
        await routeGetFeed(req, res);
        expect(res.json).toHaveBeenCalledWith(testFeed);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    test('on failure, routeGetFeed catches an error and responds with an http status of 500', async ()=>{
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        getFeed.mockRejectedValue(new Error('Something went wrong'));
        await routeGetFeed(req, res);
        expect(consoleSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        consoleSpy.mockRestore();
    })
})

describe('routeCreateMessage', () => {
    test('routeCreatePost returns a confirmation with a copy of the created message and an http status of 200', 
        async ()=>{
        const testData = {user_id: 'abc', message: 'This is a test'}
        createNewMessage.mockResolvedValue(testData);
        await routeCreateMessage(req, res);
        expect(res.json).toHaveBeenCalledWith(testData);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    test('on failure, routeCreatePost catches an error and responds with an http status of 500', async () =>{    
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        createNewMessage.mockRejectedValue(new Error('Something went wrong'));
        await routeCreateMessage(req, res);
        expect(consoleSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        consoleSpy.mockRestore();
    })     
})