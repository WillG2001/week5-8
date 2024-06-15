// this controller code has been modified from last week's code, I received help from class teammate
// Joe Burner and we decided to have ChatGPT see what was causing my connection issues; this code
// implements ChatGPT's changes

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllOrders = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db().collection('orders').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getOneOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('The order id must be valid to return an order.');
    }
    const orderId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db().collection('orders').find({ _id: orderId }).toArray();
        if (result.length === 0) {
            return res.status(404).json('Order not found');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const newOrder = async (req, res) => {
    const order = {
        orderName: req.body.orderName,
        orderType: req.body.orderType,
        orderTime: req.body.orderTime,
        entrees: req.body.entrees,
        sides: req.body.sides,
        drinks: req.body.drinks,
        other: req.body.other
    };
    try {
        const response = await mongodb.getDb().db().collection('orders').insertOne(order);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json('There was an error while trying to add the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('The order id must be valid to update an order.');
    }
    const orderId = new ObjectId(req.params.id);
    const order = {
        orderName: req.body.orderName,
        orderType: req.body.orderType,
        orderTime: req.body.orderTime,
        entrees: req.body.entrees,
        sides: req.body.sides,
        drinks: req.body.drinks,
        other: req.body.other
    };
    try {
        const response = await mongodb.getDb().db().collection('orders').replaceOne({ _id: orderId }, order);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('There was an error while trying to update the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('The order id must be valid to delete an order.');
    }
    const orderId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('orders').deleteOne({ _id: orderId });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json('There was an error while trying to delete the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllOrders, getOneOrder, newOrder, updateOrder, deleteOrder };