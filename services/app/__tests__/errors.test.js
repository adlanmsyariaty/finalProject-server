const request = require("supertest");
const app = require("../app.js");
const { User, Category, Wallet, History } = require("../models");
const { tokenGenerator } = require("../helpers/jwt");

let validTokenUser;
let validTokenUser1;

beforeAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  const newAdmin = await User.create({
    name: "malik",
    username: "malik",
    email: "malik@mail.com",
    password: "12345",
    role: "admin",
  });

  let data = [
    {
      name: "debby",
      username: "debbyria",
      email: "debbyria@mail.com",
      password: "12345",
      role: "user",
    },
    {
      name: "zakiy",
      username: "zakiynurhasyim",
      email: "zakiynurhasyim@mail.com",
      password: "12345",
      role: "consultant",
    },
    {
      name: "andrew",
      username: "andrew",
      email: "andrew@mail.com",
      password: "12345",
      role: "user",
    },
    {
      name: "adlan",
      username: "adlan",
      email: "adlan@mail.com",
      password: "12345",
      role: "consultant",
    },
  ];

  await User.bulkCreate(data);

  const newUser = await User.findOne({
    where: {
      id: 2,
    },
  });

  const newUser1 = await User.findOne({
    where: {
      id: 3,
    },
  });

  const newUser2 = await User.findOne({
    where: {
      id: 4,
    },
  });

  const newConsultant = await User.findOne({
    where: {
      id: 5,
    },
  });

  await Wallet.bulkCreate([{ UserId: 2 }, { UserId: 3 }, { UserId: 4 }]);

  validTokenUser = tokenGenerator({
    id: newUser.id,
    email: newUser.email,
  });

  validTokenUser1 = tokenGenerator({
    id: newUser1.id,
    email: newUser1.email,
  });

  validTokenUser2 = tokenGenerator({
    id: newUser2.id,
    email: newUser2.email,
  });

  validToken = tokenGenerator({
    id: newAdmin.id,
    email: newAdmin.email,
  });

  validTokenConsultant = tokenGenerator({
    id: newConsultant.id,
    email: newConsultant.email,
  });
});

describe("GET /categories", () => {
  describe("GET /categories -- fail case to get categories", () => {
    jest.spyOn(Category, "findAll").mockRejectedValue("Error");
    test("should return wallet data", async () => {
      const res = await request(app).get("/categories");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("PATCH /users/consultants", () => {
  describe("PATCH /users/consultants -- fail case to patch consultant", () => {
    jest.spyOn(User, "update").mockRejectedValue("Error");
    test("should return error message", async () => {
      const data = { videoCode: "akjshdjksniuniun" };
      const res = await request(app).patch("/users/consultants").send(data).set("access_token", validTokenConsultant)
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("GET /wallet", () => {
  describe("GET /users/wallet -- fail case to get wallet", () => {
    jest.spyOn(Wallet, "findOne").mockRejectedValue("Error");
    test("should return wallet data", async () => {
      const res = await request(app)
        .get("/users/wallet")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("GET /users/transactions", () => {
  describe("GET /users/transactions -- fail case to get wallet", () => {
    jest.spyOn(Wallet, "findOne").mockRejectedValue("Error");
    test("should return wallet data", async () => {
      const res = await request(app)
        .get("/users/transactions")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("GET /users/transactions/report", () => {
  describe("GET /users/transactions/reportt -- fail case to get wallet", () => {
    jest.spyOn(Wallet, "findOne").mockRejectedValue("Error");
    test("should return wallet data", async () => {
      const res = await request(app)
        .get("/users/transactions/report")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("GET /users/histories", () => {
  describe("GET /users/histories -- fail case to get histories chat", () => {
    jest.spyOn(History, "findAll").mockRejectedValue("Error");
    test("should return histories data", async () => {
      const res = await request(app)
        .get("/users/histories")
        .set("access_token", validTokenUser)
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });
})

describe("GET /users/histories", () => {
  describe("GET /users/histories -- fail case to get histories chat", () => {
    jest.spyOn(History, "findAll").mockRejectedValue("Error");
    test("should return histories data", async () => {
      const res = await request(app)
        .get("/users/histories/3")
        .set("access_token", validTokenUser)
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });
})

