const express = require('express');
const ordersRouter = express.Router();
const { requiresAuth } = require('express-openid-connect');

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');

ordersRouter.get('/', requiresAuth(), ordersController.getAllOrders);
ordersRouter.get('/:id', requiresAuth(), ordersController.getOneOrder);
ordersRouter.post('/', requiresAuth(), validation.saveOrder, ordersController.newOrder);
ordersRouter.put('/:id', requiresAuth(), validation.saveOrder, ordersController.updateOrder);
ordersRouter.delete('/:id', requiresAuth(), ordersController.deleteOrder);

module.exports = ordersRouter;