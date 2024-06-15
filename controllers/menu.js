// this controller code has been modified from last week's code, I received help from class teammate
// Joe Burner and we decided to have ChatGPT see what was causing my connection issues; this code
// implements ChatGPT's changes

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllItems = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db().collection('menu').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getOneItem = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('The item id must be valid to return an item.');
    }
    const itemId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db().collection('menu').find({ _id: itemId }).toArray();
        if (result.length === 0) {
            return res.status(404).json('Item not found');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const newItem = async (req, res) => {
    const item = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice
    };
    try {
        const response = await mongodb.getDb().db().collection('menu').insertOne(item);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json('There was an error while trying to add the item.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateItem = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('The item id must be valid to update an item.');
    }
    const itemId = new ObjectId(req.params.id);
    const item = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice
    };
    try {
        const response = await mongodb.getDb().db().collection('menu').replaceOne({ _id: itemId }, item);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('There was an error while trying to update the item.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteItem = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('The item id must be valid to delete an item.');
    }
    const itemId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('menu').deleteOne({ _id: itemId });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json('There was an error while trying to delete the item.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllItems, getOneItem, newItem, updateItem, deleteItem };