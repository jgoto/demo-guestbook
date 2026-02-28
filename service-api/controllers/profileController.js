const {getProfile} = require('../services/profileServices');

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
 *   404 status on missing profile
 *   500 status on Error
 */
async function routeGetProfile(req, res){
    const {userId} = req.params;
    try {
        const profile = await getProfile(userId);
        if (!profile)
        {
            return res.status(404).json({error: 'Profile not found'});
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = { routeGetProfile };