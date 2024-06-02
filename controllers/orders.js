const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllOrders = async (req, res) => {
    mongodb.getDb().db().collection('orders').find().toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getOneOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The order id must be valid to return an order.')
    }
    const orderId = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('orders').find({_id: orderId}).toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
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
    const response = await mongodb.getDb().db().collection('orders').insertOne(order);
    if (response.acknowledged) {
        res.status(201).json(response);
    }
    else
    {
        res.status(500).json(response.error || 'There was an error while trying to add the order.');
    }
};

const updateOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The order id must be valid to update an order.')
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
    const response = await mongodb.getDb().db().collection('orders').replaceOne({_id: orderId}, order);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || 'There was an error while trying to update the order.');
    }
};

const deleteOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The order id must be valid to delete an order.')
    }
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('orders').deleteOne({_id: orderId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    }
    else {
        res.status(500).json(response.error || 'There was an error while trying to delete the order.');
    }
};

module.exports = {getAllOrders, getOneOrder, newOrder,
                    updateOrder, deleteOrder};