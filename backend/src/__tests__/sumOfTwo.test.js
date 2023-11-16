import sumOfTwo from "../utils/sumOfTwo.js";

describe("sumOfTwo function", () => {
  it("should add two numbers and return the sum", () => {
    const result = sumOfTwo(99, 1);

    expect(result).toBe(100);
  });

  it("should throw an Error if either or both of the params are not number", () => {

    expect(() => sumOfTwo("cake", "mango")).toThrow("the params must be numbers")
  });
});
