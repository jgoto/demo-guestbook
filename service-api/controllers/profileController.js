const {viewProfile} = require('../services/profileServices');
const {AppError} = require('../errors/AppError');

/**
 * Route API request to get profile data from DB
 * @param {import('express'.Request)} req - Express Request
 * @param {import('express'.Response)} res - Express Response
 * @returns {Promise<void>}
 * 
 * @throws will return 500 if database call fails
 * @description
 * return: 
 *   200 status on success
 *   AppError (400 or 404) are dispatched on Error
 *   500 status on other Error
 */
async function routeGetProfile(req, res){
    const {userId} = req.params;
    try {
        const profile = await viewProfile(userId);
        res.status(200).json(profile);
    } catch (err) {
        if(err instanceof AppError){
            return res.status(err.status).json(err.message);
        }
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = { routeGetProfile };