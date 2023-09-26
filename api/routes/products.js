const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')
const saveProduct = require('../services/product.service');
const getProduct = require('../services/product.service');



router.get('/', (req, res, next) => {
    Product.find()
        .select("price name")
        .then(docs => {
            if (docs.length) {
                res.status(200).json(docs)
            }
            else {
                res.status(404).json({ message: "No enteries found" })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.post('/', async (req, res, next) => {
    try {
        const { name, price } = req.body;
        const _id = new mongoose.Types.ObjectId()
        const product = await saveProduct({ _id, name, price });
        res.status(201).json({
            message: 'Handling products post request',
            creadtedProduct: product
        })
    }
    catch (err) {
        res.status(500).json({ error: err });
        next(err);
    }
});

router.get('/:productId', async (req, res, next) => {
    try {
        const id = req.params.productId;
        const product = await getProduct(id);
        res.status(200).json({
            message: 'Handling products get request by Id',
            fetchedProduct: product
        })
    }
    catch(err)
    {
        res.status(500).json({ error: err });
        next(err);
    }
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(500).json({ error: err }))
});
module.exports = router;