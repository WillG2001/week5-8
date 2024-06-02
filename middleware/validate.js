// this code was adapted from Bro. Birch and LogRocket

const validator = require('../helpers/validate');

const saveOrder = (req, res, next) => {
    const validationRule = {
        orderName: 'required|string',
        orderType: 'required|string',
        orderTime: 'required|string',
        entrees: 'required|string',
        sides: 'required|string',
        drinks: 'required|string',
        other: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Data validation has failed',
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveOrder
};