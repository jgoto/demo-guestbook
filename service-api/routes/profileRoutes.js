const express = require('express');
const router = express.Router();
const { routeGetProfile, routePatchProfile } = require('../controllers/profileController');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/view/:userId', verifyToken, routeGetProfile);
//router.patch('/profile/update', verifyToken, routePatchProfile);

module.exports = router;