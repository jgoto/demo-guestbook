const express = require('express');
const router = express.Router();
const {routeGetAvatar} = require('../controllers/avatarController');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/view/:userId', verifyToken, routeGetAvatar);

module.exports = router;