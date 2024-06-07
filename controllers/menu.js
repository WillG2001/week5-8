const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllItems = async (req, res) => {
    mongodb.getDb().db().collection('menu').find().toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getOneItem = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The item id must be valid to return an item.')
    }
    const itemId = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('menu').find({_id: itemId}).toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};

const newItem = async (req, res) => {
    const item = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice
    };
    const response = await mongodb.getDb().db().collection('menu').insertOne(item);
    if (response.acknowledged) {
        res.status(201).json(response);
    }
    else
    {
        res.status(500).json(response.error || 'There was an error while trying to add the item.');
    }
};

const updateItem = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The item id must be valid to update an item.')
    }
    const itemId = new ObjectId(req.params.id);
    const item = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice
    };
    const response = await mongodb.getDb().db().collection('menu').replaceOne({_id: itemId}, item);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || 'There was an error while trying to update the item.');
    }
};

const deleteItem = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('The order id must be valid to delete an item.')
    }
    const itemId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('menu').deleteOne({_id: itemId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    }
    else {
        res.status(500).json(response.error || 'There was an error while trying to delete the item.');
    }
};

module.exports = {getAllItems, getOneItem, newItem,
                    updateItem, deleteItem};