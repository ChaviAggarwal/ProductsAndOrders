const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');


router.get('/', (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate('productId')
        .exec()
        .then(docs => {
            if (docs.length) {
                res.status(200).json(
                    {
                        count: docs.length,
                        orders: docs
                    }
                )
            }
            else {
                res.status(404).json({ message: "No enteries found" })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                productId: req.body.productId,
                quantity: req.body.quantity
            })
            return order.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling orders post request',
                creadtedOrder: result
            })
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/:orderId', (req, res, next) => {

    const id = req.params.orderId;
    Order.findById(id)
    .populate('productId')
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(201).json({
                message: 'Handling orders get request by Id',
                creadtedOrder: doc
            })
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(
                {message:"Order deleted",result:result})
        })
        .catch(err => res.status(500).json({ error: err }))
});
module.exports = router;