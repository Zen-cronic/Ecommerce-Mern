import supertest from "supertest"
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../services/product.service";
// import { app } from "../app";

const app = createServer()

const sampleProductInfo = {
  productName: "Bike Gloves",
  price: 500
}

describe("product", () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(  mongoServer.getUri())

  });

  afterAll(async() => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    
  });
  describe("get product route", () => {
    describe("given the productId DNE ", () => {

      it("should return a 404 error", async() => {
        const productId = "abc123"

        expect(false).toBe(false)


        await supertest(app).get(`/products/${productId}`).expect(404)
      });

    });
    describe("given the existing productId ", () => {

      it("should return the found product and a 200 statusCode", async() => {

        const product = await createProduct(sampleProductInfo)
        const productId = product._id

        const {body, statusCode} =await supertest(app).get(`/products/${productId}`)

        // console.log(body);
        // console.log(typeof body.product._id); //string
        expect(body.product._id).toEqual(productId.toString())
        expect(statusCode).toBe(200)
      });

    });
  });
});
