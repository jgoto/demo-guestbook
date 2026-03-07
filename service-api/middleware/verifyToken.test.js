jest.mock('../util/createUserClient');

jest.mock('../util/supabaseClient', () => ({
    supabase: {
        auth: {
            getUser: jest.fn()
        }
    }
}));
const { supabase } = require('../util/supabaseClient');
const { verifyToken } = require('./verifyToken');
const { createUserClient } = require('../util/createUserClient');

describe('verifyToken', (() => {
    const jsonMock = jest.fn();
    const next = jest.fn();

    beforeEach(()=>{
        jsonMock.mockClear();
        next.mockClear();
    })
    test('calls next and attaches user on valid token', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    supabase.auth.getUser.mockResolvedValue({ data: {user: mockUser}, error: null });
    createUserClient.mockReturnValue({});

    const req = { headers: {authorization: 'Bearer validtoken'}};
    const res = { status: jest.fn(() => ({json: jsonMock}))};

    await verifyToken(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
});

test('returns 401 if auth header is missing or not a string', async () => {
    const req = { headers: {} }; 
    const res = { status: jest.fn(() => ({json: jsonMock}))};  
    
    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Auth header missing or malformed"} );
    expect(next).not.toHaveBeenCalled();
});

test('returns 401 if auth header is not formatted as "Bearer <token>"', async () => {
    const req = {headers: {authorization: 'not validtoken'}};
    const res = { status: jest.fn(() => ({json: jsonMock}))};

    await verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({message: "Auth header must be 'Bearer <token>'"});
    expect(next).not.toHaveBeenCalled();
})

test('returns 403 if Supabase returns error or no user', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: null, error: new Error('Invalid')});
    const req = { headers: {authorization: 'Bearer sometoken' }};
    const res = { status: jest.fn(() => ({json: jsonMock}))};

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid token"});
    expect(next).not.toHaveBeenCalled();
})

test('returns 500 if a thrown error is caught', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(()=>{});    supabase.auth.getUser.mockRejectedValue(new Error('Network failure'));
    const req = { headers: {authorization: 'Bearer sometoken'}};
    const res = { status: jest.fn(() => ({json: jsonMock}))};

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({message: "Authentication failed"})
    expect(next).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
})
}));


