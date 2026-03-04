const express = require('express');
const router = express.Router();
const {routeGetFeed, routeCreateMessage} = require('../controllers/postController');

router.get('/feed', routeGetFeed);
router.post('/message', routeCreateMessage);

module.exports = router;