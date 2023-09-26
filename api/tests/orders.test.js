const getOrder = require("../services/order.service");

const { expect } = require("chai");
const Order = require("../models/order");
const sinon = require("sinon");

describe("Order Service Unit Tests", function () {
    this.afterEach(() => {
      sinon.restore();
    })
  
    describe("Get Orders functionality", function () {

        it("should return list of saved orders", async function () {
          const orderId = 2;
          const fakeObject = {
            productId: 1,
            _id: 2,
            name: "Order-1",
            quantity: 1
          }
          sinon.stub(Order, 'findById').returns(fakeObject)
          const returnedOrder = await getOrder(orderId);
          expect(returnedOrder.name).to.equal(fakeObject.name)
          expect(returnedOrder.quantity).to.equal(fakeObject.quantity)
        });
    });
});