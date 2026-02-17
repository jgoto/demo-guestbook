const supabase = require('../util/supabaseClient');
const jwt = require('jsonwebtoken');

/**
 * Middleware for Express that verifies a jsonwebtoken via Supabase
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Functon} next - Express next middleware
 * @returns {Promise<void>}
 * 
 * @throws Does not throw; responds with HTTP errors instead
 */
async function verifyToken(req, res, next){
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    if(!authHeaders || typeof authHeaders !== 'string'){
        return res.status(401).json({message: "Auth header missing or malformed"});
    }
    else if(!token){
        return res.status(401).json({message: "Token missing or not provided"});
    }

    const {data, error} = await supabase.auth.getUser(token);
    if(error || !data?.user){
        return res.status(403).json({message: "Invalid token"});
    }
    req.user = data.user;
    next();
}

module.exports = { verifyToken };
