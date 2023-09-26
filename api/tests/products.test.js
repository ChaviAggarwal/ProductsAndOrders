const saveProduct = require("../services/product.service");
const getProduct = require("../services/product.service");

const { expect } = require("chai");
const Product = require("../models/product");
const sinon = require("sinon");

describe("User Service Unit Tests", function () {
    this.afterEach(() => {
      sinon.restore();
    })
  
    describe("Get Products functionality", function () {

        it("should return list of saved products", async function () {
          const productId = 2;
          const fakeObject = {
            _id: 2,
            name: "Product-2",
            price: "400"
          }
          sinon.stub(Product, 'findById').returns(fakeObject)
          const returnedUser = await getProduct(productId);
          expect(returnedUser.name).to.equal(fakeObject.name)
          expect(returnedUser.price).to.equal(fakeObject.price)
        });
    });

     describe("Product", function () {
        describe("Save Product functionality", function () {
            it("should successfully save product", async function () {
                const name = "Product-1";
                const price = "200";
                const _id = 1;
                sinon.stub(Product.prototype, "save").returns(
                    { _id, name, price }
                );
                const returnedUser = await saveProduct({
                    _id,
                    name,
                    price
                });
                expect(returnedUser.name).to.equal(name);
                expect(returnedUser.price).to.equal(price);
                expect(returnedUser._id).to.equal(_id);
            });
        });
    });
});