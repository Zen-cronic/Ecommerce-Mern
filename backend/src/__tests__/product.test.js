import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct, getOneProduct } from "../services/product.service";

const app = createServer();

const sampleProductInfo = {
  productName: "Bike Gloves",
  price: 500,
};

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("get product route", () => {
    describe("given the productId DNE ", () => {
      it("should return a 404 error", async () => {
        const productId = "abc123";

        expect(false).toBe(false);

        await supertest(app).get(`/products/${productId}`).expect(404);
      });
    });
    describe("given the existing productId ", () => {
      it("should return the found product and a 200 statusCode", async () => {
        const product = await createProduct(sampleProductInfo);
        const productId = product._id;

        const { body, statusCode } = await supertest(app).get(
          `/products/${productId}`
        );

        // console.log(body);
        // console.log(typeof body.product._id); //string
        expect(body.product._id).toEqual(productId.toString());
        expect(statusCode).toBe(200);
      });
    });
  });

  describe("post product route", () => {
    describe("given the product is created successfully", () => {
      it("should return the product mongodb document", async () => {
        const { body, statusCode } = await supertest(app)
          .post("/products")
          .send(sampleProductInfo);

        const returnedProduct = await getOneProduct(body.newProduct._id);

        const returnedProductObj = {
          _id: returnedProduct._id.toString(),
          productName: returnedProduct.productName,
          price: returnedProduct.price,
          __v: expect.any(Number),
        };

        // console.log(returnedProduct);

        expect(statusCode).toBe(201);
        expect(body.newProduct).toEqual(returnedProductObj);
      });
    });

    describe("given the product fails to be created", () => {

      it("should return 404 from custom errorHandler", async () => {
        const { statusCode } = await supertest(app).post("/products");

        expect(statusCode).toBe(404);
      });
    });
  });
});
