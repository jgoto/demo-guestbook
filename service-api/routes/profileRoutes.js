const express = require('express');
const router = express.Router();
const { routeGetProfile, routeEditProfile } = require('../controllers/profileController');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/view/:userId', verifyToken, routeGetProfile);
router.post('/update/:userId', verifyToken, routeEditProfile);

module.exports = router;