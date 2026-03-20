const express = require('express');
const router = express.Router();
const {routeGetFeed, routeCreateMessage} = require('../controllers/postController');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/feed', routeGetFeed);
router.post('/message', verifyToken, routeCreateMessage);

module.exports = router;