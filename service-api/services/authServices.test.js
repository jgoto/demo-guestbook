jest.mock('../util/supabaseClient', () => ({
    auth: {
        signInWithPassword: jest.fn()
    }
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

const supabase = require('../util/supabaseClient');
const jwt = require('jsonwebtoken');
const { login } = require('./authServices');

beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret';
});

test('returns id and token when login succeeds', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
        data: {
            user: {
                id: 'user-123',
                email: 'test@example.com'
            }
        },
        error: null
    });

    jwt.sign.mockReturnValue('fake-jwt-token');

    const result = await login('test@example.com', 'password');

    expect(result).toEqual({
        id: 'user-123',
        token: 'fake-jwt-token'
    });
});

test('returns undefined and logs error when login fails', async () => {
    supabase.auth.signInWithPassword.mockRejectedValue( new Error('Supabase down'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await login('test@example.com', 'password');

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
});