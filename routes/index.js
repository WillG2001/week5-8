const express = require('express');
const router = express.Router();

router.use('/orders', require('./orders'));

router.use('/', require('./swagger'));

module.exports = router;