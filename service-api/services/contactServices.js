const {AppError} = require('../errors/AppError');
const {insertContactRequest} = require('../repositories/contactRepository');

/**
 * Process contact message request
 * @param {Object} contact - Payload with the Contact Message 
 * @returns {Promise<Object|undefined>} 
 */
async function createContactMessage(contact){
    if(contact.hasOwnProperty('honeypot'))
        throw new AppError(400, 'Invalid Request')
    // Call antispam here
    // Enforce rate limiting
    result = await insertContactRequest(contact);
    return result;
}

module.exports = {createContactMessage}