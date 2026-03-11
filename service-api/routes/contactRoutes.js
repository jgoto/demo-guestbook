const express = require('express');
const router = express.Router();

const {routeSendContact} = require('../controllers/contactController')

router.post('/send', routeSendContact)

module.exports = router;