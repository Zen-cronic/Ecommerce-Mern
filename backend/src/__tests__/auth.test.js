import mongoose from "mongoose";
import * as UserService from "../services/user.service.js"
import supertest from "supertest";
import createServer from "../utils/server.js";

const userId = new mongoose.Types.ObjectId().toString()

const loginInput = {

    username: "Jan Joe",
    password: "abc123"
}

const userPayload= {

    _id: userId,
    username: "Jan Joe",
    password: "abc123"
    
}

const app = createServer()

describe("auth", () => {
  describe("register new user", () => {
    describe("given the user registration is successsful", () => {
      it("should return the create user object",async () => {

            const createUserServiceMock = jest.spyOn(UserService, "createUser").mockReturnValueOnce(userPayload)

            const {statusCode, body} = await supertest(app).post("/auth/register").send(loginInput)

            expect(statusCode).toBe(200)
            expect(body.newUser).toEqual(userPayload)
            expect(body.message).toBe(`${userPayload.username} is registered successfully`)
            
            expect(createUserServiceMock).toHaveBeenCalledWith(loginInput)
          

      });
    });

    describe("given the user has already registered with the same username", () => {
      it("should throw a 409 with message", () => {
        ;
      });
    });
  });

  describe("login user", () => {
    describe("given a valid username exists and correct passowrd is entered", () => {
      it("should return accessToken and set cookie in browser", () => {});
    });

    describe("given a invalid username and/or incorrect password entered", () => {
      it("should return a 401 with message", () => {
        ;
      });
    });
  });
});
