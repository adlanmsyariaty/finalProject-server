const request = require("supertest");
const app = require("../app.js");
const { User, Category,  } = require("../models");

beforeAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});

describe("POST /users/payment", () => {
  describe("POST /users/payment -- success case to get midtrans payment gateway", () => {
    test("should return wallet data", async () => {
      const res = await request(app).post("/users/payment");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token", expect.any(String));
      expect(res.body).toHaveProperty("redirect_url", expect.any(String));
    });
  });
});