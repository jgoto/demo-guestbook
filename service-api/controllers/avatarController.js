const {AppError} = require('../errors/AppError');
const {viewAvatar} = require('../services/avatarServices');

/**
 * Route API request to get signed Avatar url
 * @param {import('express'.Request)} req - Express request
 * @param {import('express'.Response)} res - Express response
 * @returns {Promise<void>} - Object with signed url to avatar
 */
async function routeGetAvatar(req, res){
    const userId = req.params.userId;
    try {
        const avatar = await viewAvatar(userId, req.userClient);
        res.status(200).json(avatar);
    } catch (error) {
        if(error instanceof AppError)        
            return res.status(error.status).json(error.message);
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {routeGetAvatar};