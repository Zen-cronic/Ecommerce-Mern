import mongoose from "mongoose";
import UserModel from "../../../models/user.model.js";
import { findUserById } from "../../../services/user.service";

jest.mock("../../../models/user.model");

const userID = new mongoose.Types.ObjectId().toString();

describe("findUserById function", () => {
  let mockFindUserById;
  let mockQuery;

  beforeEach(() => {

    mockQuery = {
        select: jest.fn().mockReturnThis(),
        exec: jest.fn()

    }
      mockFindUserById = UserModel.findById.mockReturnValue(mockQuery)
  });

  afterEach(() => {
      jest.clearAllMocks()
  });

  describe("given that user is NOT a valid user", () => {
    it("should return false", async () => {
    //   UserModel.findById.mockReturnValue({
    //     select: jest.fn().mockReturnThis(),
    //     exec: jest.fn().mockResolvedValue(undefined),
    //   });

    // mockFindUserById.exec.mockResolvedValue(undefined)

    mockQuery.exec.mockResolvedValue(undefined)
      const result = await findUserById(userID);

      expect(result).toBe(false);
      expect(UserModel.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe("given that user is a valid user", () => {
    it("should return the user object", async () => {
      
      const expectedUser = {
        _id: expect.any(String),
        username: expect.any(String),
        __v: expect.any(Number),
      };

      const userWithPassword = {
        ...expectedUser,
        password: expect.any(String),
      };

    //   UserModel.findById.mockReturnValue({
    //     select: jest.fn().mockReturnThis(),
    //     exec: jest.fn().mockResolvedValue(expectedUser),
    //   });

      mockQuery.exec.mockResolvedValue(expectedUser)

      const result = await findUserById(userID);

      expect(result).not.toEqual(userWithPassword);
      //   expect(result).toEqual(expectedUser)

      expect(UserModel.findById).toHaveBeenCalledTimes(1);
    });
  });
});