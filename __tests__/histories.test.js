const request = require("supertest");
const app = require("../app.js");
const { User, Wallet, History } = require("../models");
const { tokenGenerator } = require("../helpers/jwt");

let validTokenUser;
let invalidToken = 'askjijniudsnhfiusjhndiufjhsuih384798384'

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
  ];

  await User.bulkCreate(data);

  const newUser = await User.findOne({
    where: {
      id: 2,
    },
  });

  await Wallet.bulkCreate([{ UserId: 2 }, { UserId: 4 }]);

  validTokenUser = tokenGenerator({
    id: newUser.id,
    email: newUser.email,
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Wallet.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /users/histories", () => {
  describe("POST /users/histories -- success case to create histories chat", () => {
    test("should return histories data", async () => {
      const newHistory = {
        ConsultantId: 3,
      };
      const res = await request(app)
        .post("/users/histories")
        .set("access_token", validTokenUser)
        .send(newHistory);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("UserId");
      expect(res.body).toHaveProperty("UserId", expect.any(Number));
      expect(res.body).toHaveProperty("ConsultantId");
      expect(res.body).toHaveProperty("ConsultantId", expect.any(Number));
      expect(res.body).toHaveProperty("MongoConsultationId");
      expect(res.body).toHaveProperty(
        "MongoConsultationId",
        expect.any(String)
      );
    });
  });

  describe("POST /users/histories -- fail case to create histories chat", () => {
    test("should return histories data", async () => {
      const newHistory = {
        ConsultantId: '',
      };
      const res = await request(app)
        .post("/users/histories")
        .set("access_token", validTokenUser)
        .send(newHistory);
      expect(res.status).toBe(400);
    });
  });
});

describe("GET /users/histories", () => {
  describe("GET /users/histories -- success case to get histories chat", () => {
    test("should return histories data", async () => {
      const res = await request(app)
        .get("/users/histories")
        .set("access_token", validTokenUser)
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Array));
    });
  });
});

describe("GET /users/histories/:consultantId", () => {
  describe("GET /users/histories/:consultantId -- success case to get histories chat by consultantId", () => {
    test("should return histories data", async () => {
      const res = await request(app)
        .get("/users/histories/3")
        .set("access_token", validTokenUser)
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Array));
    });
  });
});
