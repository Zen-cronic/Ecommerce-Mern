import ProductModel from "../../../models/product.model.js";
import { searchProducts } from "../../../services/search.service.js";

// jest.mock(ProductModel)
jest.mock("../../../models/product.model.js");

describe("searchProducts service", () => {
  it("should return an array of products", async () => {
    const products = [
      { productName: "Product 1", price: 100 },
      { productName: "Product 2", price: 200 },
      { productName: "Product 3", price: 300 },
      { productName: "Product 4", price: 400 },
      { productName: "Product 5", price: 500 },
    ];

    ProductModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(products),
    });

    // ProductModel.find.mockResolvedValue(products)

    const result = await searchProducts("Product 1");

    expect(result).toEqual(expect.arrayContaining([products[0]]));
    expect(ProductModel.find).toHaveBeenCalled();
  });
});
