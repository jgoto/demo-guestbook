const { AppError } = require("../errors/AppError");
const { selectAvatarSignedUrl } = require("../repositories/avatarRepository");

/**
 * viewAvatar
 * @param {import('express'.Request)} req - Express request
 * @param {import('express'.Response)} res - Express response
 * @returns {Promise<void>} - Object with signed url to avatar
 */
async function viewAvatar(user_id, userClient){
    if(!user_id || typeof user_id !== 'string' || user_id.trim()==='')
        throw new AppError("No user id", 400);
    const results = await selectAvatarSignedUrl(user_id, userClient);
    if(!results)
        throw new AppError("Record not found", 404); // in future replace with fallback image
    return results;
}

module.exports = {viewAvatar}