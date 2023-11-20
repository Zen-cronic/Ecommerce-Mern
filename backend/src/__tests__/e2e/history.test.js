import * as UserService from "../../services/user.service.js";
import * as HistoryService from "../../services/history.service.js";
import supertest from "supertest";
import mongoose from "mongoose";
import createServer from "../../utils/server.js";

const app = createServer()
const userID = new mongoose.Types.ObjectId().toString()

describe("history products", () => {
  let findUserByIdServiceMock;
  let getOrderHistoryServiceMock;
  beforeEach(() => {
    findUserByIdServiceMock = jest.spyOn(UserService, "findUserById");
    getOrderHistoryServiceMock = jest.spyOn(HistoryService, "getOrderHistory");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("given the user is logged in ", () => {
    it("should return an array of orders", async() => {


      const mockUser = {
        _id: userID,
        username: "test",
        orders: [{
            orderDate: new Date(Date.now()).toISOString(),
                orderItems: [
                    {productID: "1", count: 3},
                    {productID: "4", count: 2},
                    {productID: "5", count: 1},
                ],
            orderTotal: 500
            }]
      }

      findUserByIdServiceMock.mockResolvedValue(mockUser)
      getOrderHistoryServiceMock.mockResolvedValue(mockUser.orders)

    const {statusCode, body} = await supertest(app).get(`/history/${userID}`)

    // console.log(body);
    
    expect(statusCode).toBe(200)

    // expect(body).toHaveProperty("allOrders", mockUser.orders)
    
    const receivedOrders = body.allOrders.map(order => ({
        orderDate: order.orderDate,
        orderItems: order.orderItems,
        orderTotal: order.orderTotal,
      }));

    expect(receivedOrders).toEqual(mockUser.orders)

    expect(getOrderHistoryServiceMock).toHaveBeenCalledWith(mockUser)
    });
  });

  describe("given the user is not logged in", () => {
    it("should return 401 with message", async() => {
      findUserByIdServiceMock.mockResolvedValue(false);

      const {statusCode, body} = await supertest(app).get(`/history/${userID}`)

      expect(statusCode).toBe(401)
      expect(body).toHaveProperty("message", "Must be logged in to see order history")

      expect(findUserByIdServiceMock).toHaveBeenCalled()
        expect(getOrderHistoryServiceMock).not.toHaveBeenCalled()
    });
  });
});
