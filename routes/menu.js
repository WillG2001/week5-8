const express = require('express');
const menuRouter = express.Router();

const menuController = require('../controllers/menu');
const validation = require('../middleware/validate');

menuRouter.get('/', menuController.getAllItems);
menuRouter.get('/:id', menuController.getOneItem);
menuRouter.post('/', validation.saveMenuItem, menuController.newItem);
menuRouter.put('/:id', validation.saveMenuItem, menuController.updateItem);
menuRouter.delete('/:id', menuController.deleteItem);

module.exports = menuRouter;