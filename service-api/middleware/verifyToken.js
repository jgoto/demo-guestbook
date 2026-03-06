const {supabase} = require('../util/supabaseClient');
const {createUserClient} = require('../util/createUserClient');

/**
 * Middleware for Express that verifies a jsonwebtoken via Supabase
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 * @returns {Promise<void>}
 * 
 * @throws Does not throw; responds with HTTP errors instead
 */
async function verifyToken(req, res, next){
    const authHeaders = req.headers['authorization'];

    if(!authHeaders || typeof authHeaders !== 'string'){
        return res.status(401).json({message: "Auth header missing or malformed"});
    }
    const parts = authHeaders.split(' ');
    if(parts.length!==2 || parts[0].toLocaleLowerCase()!=='bearer'){
        return res.status(401).json({message: "Auth header must be 'Bearer <token>'"})
    }

    const token = parts[1];

    try {
        const {data, error} = await supabase.auth.getUser(token);
            if(error || !data?.user){
                return res.status(403).json({message: "Invalid token"});
            }
        req.user = data.user;
        req.userClient = createUserClient(token);
        next();
    } catch (error) {
        console.error("Token authentication failed: ", error);
        return res.status(500).json({message: "Authentication failed"});
    }
}

module.exports = { verifyToken };
