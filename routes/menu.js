const express = require('express');
const menuRouter = express.Router();
const { requiresAuth } = require('express-openid-connect');

const menuController = require('../controllers/menu');
const validation = require('../middleware/validate');

menuRouter.get('/', requiresAuth(), menuController.getAllItems);
menuRouter.get('/:id', requiresAuth(), menuController.getOneItem);
menuRouter.post('/', requiresAuth(), validation.saveMenuItem, menuController.newItem);
menuRouter.put('/:id', requiresAuth(), validation.saveMenuItem, menuController.updateItem);
menuRouter.delete('/:id', requiresAuth(), menuController.deleteItem);

module.exports = menuRouter;