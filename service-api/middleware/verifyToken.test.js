jest.mock('../util/supabaseClient', () => ({
    auth: { getUser: jest.fn() }
}));

const supabase = require('../util/supabaseClient');
const { verifyToken } = require('./verifyToken');

test('calls next and attaches user on valid token', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    supabase.auth.getUser.mockResolvedValue({ data: {user: mockUser}, error: null });

    const req = { headers: {authorization: 'Bearer validtoken'}};
    const res = {};
    const next = jest.fn();

    await verifyToken(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
});

test('returns 401 if auth header is missing or not a string', async () => {
    const req = { headers: {} };
    const jsonMock = jest.fn();
    const res = { status: jest.fn(() => ({json: jsonMock}))};
    const next = jest.fn();

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Auth header missing or malformed"} );
    expect(next).not.toHaveBeenCalled();
});

test('returns 401 if token is missing', async () => {
    const req = { headers: {authorization: 'Bearer ' }};
    const jsonMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: jsonMock }))};
    const next = jest.fn();

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Token missing or not provided" });
    expect(next).not.toHaveBeenCalled();
});

test('returns 403 if Supabase returns error or no user', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: null, error: new Error('Invalid')});

    const req = { headers: {authorization: 'Bearer sometoken' }};
    const jsonMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: jsonMock}))};
    const next = jest.fn();

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid token"});
    expect(next).not.toHaveBeenCalled();
})