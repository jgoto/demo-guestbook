const { AppError } = require("../errors/AppError");
const { selectAvatarSignedUrl } = require("../repositories/avatarRepository");

const avatarCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min

/**
 * viewAvatar
 * @param {import('express'.Request)} req - Express request
 * @param {import('express'.Response)} res - Express response
 * @returns {Promise<void>} - Object with signed url to avatar
 */
async function viewAvatar(user_id){
    if(!user_id || typeof user_id !== 'string' || user_id.trim()==='')
        throw new AppError("No user id", 400);
    const cached = avatarCache.get(user_id);
    if(cached && cached.expiry > Date.now()) {
        console.log(`Recovering signed URL for ${user_id} from cache`)
        return cached.signedUrl;
    }

    const results = await selectAvatarSignedUrl(user_id);
    if(!results)
        throw new AppError("Record not found", 404); // in future replace with fallback image

    avatarCache.set(user_id, {signedUrl: results, expiry: Date.now() + CACHE_TTL_MS});
    return results;
}

module.exports = {viewAvatar}