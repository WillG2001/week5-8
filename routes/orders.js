const express = require('express');
const ordersRouter = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');

ordersRouter.get('/', ordersController.getAllOrders);
ordersRouter.get('/:id', ordersController.getOneOrder);
ordersRouter.post('/', validation.saveOrder, ordersController.newOrder);
ordersRouter.put('/:id', validation.saveOrder, ordersController.updateOrder);
ordersRouter.delete('/:id', ordersController.deleteOrder);

module.exports = ordersRouter;