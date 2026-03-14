const {createContactMessage} = require('../services/contactServices');

/**
 * Create a new contact request using supplied data
 * @param {import('express'.Request)} req - Express Request
 * @param {import('express'.Response)} res - Express Response
 * @returns {Promise<void>}
 * @description
 * returns http status 201 on success
 * returns http status 500 on failure
 */
async function routeSendContact(req, res){
    const contact = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        ip: req.ip,
        user_agent: req.headers['user-agent'],
        ...(req.body.company ? {honeypot: req.body.company} : {})
    };
    
    try {
        await createContactMessage(contact);
        res.status(201).json({message: "Thank you for contacting us"});
    } catch (error) {
        console.error(error);
        res.status(500).json('Something went wrong');
    }    
}

module.exports = {routeSendContact}