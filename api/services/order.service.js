const Order = require("../models/order");

const getOrder = async (id) => {
    const order = await Order.findById(id);
    return { name: order.name, quantity: order.quantity }    
};
  
module.exports = getOrder;