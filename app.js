const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

const productRoutes =require('./api/routes/products')
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb+srv://node:"+process.env.MONGO_ATLS_PSWD+"@cluster0.a1huopy.mongodb.net/?retryWrites=true&w=majority"
);
app.use(bodyParser.json());
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

module.exports = app;