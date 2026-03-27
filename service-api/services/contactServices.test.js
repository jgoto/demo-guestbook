const AppError = require('../errors/AppError')
jest.mock('../repositories/contactRepository', ()=>({
    insertContactRequest: jest.fn()
}))

const {insertContactRequest} = require('../repositories/contactRepository');
const {createContactMessage} = require('./contactServices');

describe('createContactMessage', (() => {
    const testContact = {
        'user_id': 'abc',
        'name': 'test user',
        'subject': 'Test',
        'message': 'Only a test'
    }
    test('On success, createContactMessage returns data', async () => {
        insertContactRequest.mockResolvedValue(testContact);

        const result = await createContactMessage(testContact);
        expect(result).toEqual(testContact);
    });
    test('Reject as likely spam if the honeypot field contains data', async () => {
        try {
            const result = await createContactMessage({...testContact, honeypot: 'spam'});            
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error.status).toBe(400);
            expect(error.message).toBe('Invalid Request');
        }
    });
}))