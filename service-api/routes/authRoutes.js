const express = require('express');
const router = express.Router();
const {routeLogin} = require('../controllers/authController');

router.post('/login', routeLogin)

module.exports = router;