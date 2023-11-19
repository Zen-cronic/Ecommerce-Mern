import { checkOut } from "../../../services/checkout.service.js";

const currentOrder = {
  productsArr: [{ ab12: 5 }, { abc123: 6 }],
  totalAmount: 500,
};


describe("checkOut function", () => {
  it("should return currentOrder after storing in database", async() => {

        const user = {
            orders: [],
            save: jest.fn().mockResolvedValue(this)
        }

        const result = await checkOut(currentOrder, user)

        expect(result).toHaveProperty("orderDate")
        expect(result).toHaveProperty("orderItems")

        expect(result.orderItems).toEqual([
            { productID: 'ab12', count: 5},
            { productID: 'abc123', count: 6 },
          ]);
        expect(result).toHaveProperty("orderTotal", currentOrder.totalAmount)
        expect(user.save).toHaveBeenCalled()
        expect(user.orders).toContainEqual(result)

        
     });
});
