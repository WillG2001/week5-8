const express = require('express');
const ordersRouter = express.Router();
const menuRouter = express.Router();

ordersRouter.use('/orders', require('./orders'));
ordersRouter.use('/', require('./swagger'));

menuRouter.use('/menu', require('./menu'));
menuRouter.use('/', require('./swagger'));

module.exports = ordersRouter, menuRouter;