const {rateLimit} = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56,
    handler: (req, res, ) => {
        res.status(429).json({
            error: "Too many requests. Try again later"
        })
    }
});

module.exports = rateLimiter;