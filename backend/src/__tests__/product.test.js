import supertest from "supertest"
import createServer from "../utils/server";
// import { app } from "../app";

describe("product", () => {
  describe("get product route", () => {
    describe("given the productId DNE ", () => {

      it("should return a 404 error", async() => {
        const productId = "abc123"

        expect(false).toBe(false)

        const app = createServer()

        await supertest(app).get(`/products/${productId}`).expect(404)
      });

    });
  });
});
