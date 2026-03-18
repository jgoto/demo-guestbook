const {viewProfile, editProfile} = require('../services/profileServices');
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
        const profile = await viewProfile(userId, req.userClient);
        res.status(200).json(profile);
    } catch (err) {
        if(err instanceof AppError){
            return res.status(err.status).json(err.message);
        }
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

/**
 * Route API to edit the user's profile
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
async function routeEditProfile(req, res){
    const {userId} = req.params;
    try {
        const result = await editProfile(userId, req.userClient, req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json('Something went wrong')
    }
}

module.exports = { routeGetProfile, routeEditProfile };