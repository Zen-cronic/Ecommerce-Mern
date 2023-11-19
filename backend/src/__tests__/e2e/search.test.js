import supertest from "supertest";
import * as SearchService from "../../services/search.service.js";
import createServer from "../../utils/server.js";
import { Document } from "mongoose";

const app = createServer();

describe("search products", () => {
  let searchProductsServiceMock;

  beforeEach(() => {
    searchProductsServiceMock = jest.spyOn(SearchService, "searchProducts");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("given search term is invalid(is null)", () => {
    it("should return a status 401 with apt message", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/search")
        .query({ q: "" });

      expect(statusCode).toBe(401);
      expect(body).toHaveProperty("message");
      expect(searchProductsServiceMock).not.toHaveBeenCalled();
    });
  });

  describe("given the search term is valid", () => {
    it("should return an array of matching products and the search term", async () => {
      searchProductsServiceMock.mockResolvedValueOnce(expect.any(Array));

      const queryObj = { q: "testTerm" };
      const { statusCode, body } = await supertest(app)
        .post("/search")
        .query(queryObj);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("matchingProducts");

      expect(body.searchTerm).toEqual(queryObj.q);
      expect(searchProductsServiceMock).toHaveBeenCalledWith(
        expect.any(String)
      );
    });
  });
});
