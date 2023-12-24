//integration

import supertest from "supertest";
import * as CheckOutService from "../../services/checkout.service.js";
import * as UserService from "../../services/user.service.js";
import createServer from "../../utils/server";
import mongoose from "mongoose";

const app = createServer();

let userID = new mongoose.Types.ObjectId().toString();
const currentOrder = {
  productsArr: [{ ab12: 5 }, { abc123: 6 }],
  totalAmount: 500,
};

const userPayload = {
  _id: userID,
  username: "Test name",
};
describe("checkout products", () => {
  let findUserByIdServiceMock;

  let checkOutServiceMock;
  beforeEach(() => {
    findUserByIdServiceMock = jest.spyOn(UserService, "findUserById");
    checkOutServiceMock = jest.spyOn(CheckOutService, "checkOut");
  });

  afterEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks()
    // jest.restoreAllMocks()
  });

  describe("given the user is not logged in", () => {
    it("should return a 401 with message", async () => {
      findUserByIdServiceMock.mockResolvedValueOnce(false);

      const { statusCode, body } = await supertest(app)
        .put(`/checkout/${userID}`)
        .send(currentOrder);

      expect(statusCode).toBe(401);
      expect(body.message).toContain("Must be logged in to checkout");

      expect(checkOutServiceMock).not.toHaveBeenCalled();
      expect(findUserByIdServiceMock).toHaveBeenCalled();
    });
  });

  describe("given the user is logged in", () => {
    it("should return the currentOrder and update database", async () => {
      findUserByIdServiceMock.mockResolvedValueOnce(userPayload);
      checkOutServiceMock.mockResolvedValueOnce(currentOrder);

      const { statusCode, body } = await supertest(app)
        .put(`/checkout/${userID}`)
        .send(currentOrder);

      expect(statusCode).toBe(200);
      //   expect(body).toEqual({currentOrder})
      expect(body).toHaveProperty("currentOrder");

      expect(findUserByIdServiceMock).toHaveBeenCalled();
      expect(checkOutServiceMock).toHaveBeenCalledWith(
        currentOrder,
        userPayload
      );
    });
  });
});
