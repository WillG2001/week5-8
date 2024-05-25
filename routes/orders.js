const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');

router.get('/', ordersController.getAllOrders);

router.get('/:id', ordersController.getOneOrder);

router.post('/', ordersController.newOrder);

router.put('/:id', ordersController.updateOrder);

router.delete('/:id', ordersController.deleteOrder);

module.exports = router;