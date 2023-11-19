import mongoose from "mongoose";
import * as UserService from "../../services/user.service.js";
import supertest from "supertest";
import createServer from "../../utils/server.js";
import { loginUserHandler } from "../../controllers/auth.controller.js";

const userId = new mongoose.Types.ObjectId().toString();

const userInput = {
  username: "Jan Joe",
  password: "abc123",
};

const userPayload = {
  _id: userId,
  username: "Jan Joe",
  password: "abc123",
};

const app = createServer();

describe("auth", () => {
  let createUserServiceMock;
  let validatePasswordServiceMock;
  describe("register new user", () => {
    beforeEach(() => {
      createUserServiceMock = jest.spyOn(UserService, "createUser");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("given the user registration is successsful", () => {
      it("should return the create user object", async () => {
        // const createUserServiceMock = jest.spyOn(UserService, "createUser").mockReturnValueOnce(userPayload)

        createUserServiceMock.mockReturnValueOnce(userPayload);
        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send(userInput);

        expect(statusCode).toBe(200);
        expect(body.newUser).toEqual(userPayload);
        expect(body.message).toBe(
          `${userPayload.username} is registered successfully`
        );

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the user has already registered with the same username", () => {
      it("should throw a 409 with message", async () => {
        createUserServiceMock.mockReturnValueOnce(false);

        const { statusCode, body } = await supertest(app)
          .post("/auth/register")
          .send(userInput);

        expect(statusCode).toBe(409);
        expect(body.message).toContain("duplicate username");
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });

  describe("login user", () => {
    beforeEach(() => {
      validatePasswordServiceMock = jest.spyOn(UserService, "validatePassword");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    describe("given a valid username exists and correct passowrd is entered", () => {
      it("should return accessToken and set cookie in browser", async () => {
        validatePasswordServiceMock.mockReturnValueOnce(userPayload);

        const cookie = jest.fn();
        const status = jest.fn().mockReturnThis();
        const json = jest.fn().mockReturnThis();

        const res = {
          cookie,
          json,
          status,
        };

        const req = {
          body: userInput,
        };

        await loginUserHandler(req, res);

        expect(cookie).toHaveBeenCalledWith("jwt", expect.any(String));
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({
          accessToken: expect.any(String),
        });

        expect(validatePasswordServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given a invalid username and/or incorrect password entered", () => {
      it("should return a 401 with message", async () => {
        validatePasswordServiceMock.mockReturnValueOnce(false);

        const { statusCode, body } = await supertest(app)
          .post("/auth/login")
          .send(userInput);

        expect(statusCode).toBe(401);
        expect(body.message).toContain("Invalid username or password");

        expect(validatePasswordServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });
});
