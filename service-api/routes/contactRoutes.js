const express = require('express');
const router = express.Router();
const rateLimiter = require('../middleware/rateLimiter');

const {routeSendContact} = require('../controllers/contactController')

router.post('/send', rateLimiter, routeSendContact)

module.exports = router;