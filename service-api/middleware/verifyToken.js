const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    if(!authHeaders || typeof authHeaders !== 'string'){
        return res.status(401).json({message: "Auth header missing or malformed"});
    }
    else if(!token){
        return res.status(401).json({message: "Token missing or not provided"});
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err){
            return res.status(403).json({message: "Invalid or expired token"});
        }
        req.user = user;
        next();
    });
}