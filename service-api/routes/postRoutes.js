const express = require('express');
const router = express.Router();
const {routeGetFeed, routeNewPost} = require('../controllers/postController');

router.post('/feed', routeGetFeed);
router.post('/message', routeNewPost);

module.exports = router;