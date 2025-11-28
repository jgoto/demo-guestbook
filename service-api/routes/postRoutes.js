const express = require('express');
const router = express.Router();
const {routeGetFeed} = require('../controllers/postController');

router.post('/feed', routeGetFeed);

module.exports = router;