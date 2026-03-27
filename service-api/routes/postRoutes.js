const express = require('express');
const router = express.Router();
const {routeGetFeedWithAuthors, routeCreateMessage} = require('../controllers/postController');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/feed', routeGetFeedWithAuthors);
router.post('/message', verifyToken, routeCreateMessage);

module.exports = router;