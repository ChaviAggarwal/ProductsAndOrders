const Product = require("../models/product");

const saveProduct = async ({ _id,name,price }) => {
  const product = await new Product({
    _id,
    name,
    price
  }).save();
  return product;
};

const getProduct = async (id) => {
    const product = await Product.findById(id);
    return { name: product.name, price: product.price }    
};
  
module.exports = saveProduct;
module.exports = getProduct;