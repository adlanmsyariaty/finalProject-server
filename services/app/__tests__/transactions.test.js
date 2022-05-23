const request = require("supertest");
const app = require("../app.js");
const { User, Wallet } = require("../models");
const { tokenGenerator } = require("../helpers/jwt");

let validToken;
let validTokenUser;
let validTokenUser1;
let validTokenUser2;
let validTokenUser3;

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
      role: "user",
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
      role: "user",
    },
  ];

  for (let i = 0; i < data.length; i++) {
    await User.create(data[i]);
  }

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

  const newUser3 = await User.findOne({
    where: {
      id: 5,
    },
  });

  await Wallet.bulkCreate([{ UserId: 2 }, { UserId: 3 }, { UserId: 4 }, { UserId: 5 }]);

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

  validTokenUser3 = tokenGenerator({
    id: newUser3.id,
    email: newUser3.email,
  });

  validToken = tokenGenerator({
    id: newAdmin.id,
    email: newAdmin.email,
  });
});

// afterAll(async () => {
//   await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
//   await Wallet.destroy({
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });
// });

describe("GET /users/wallet", () => {
  describe("GET /users/wallet -- success case to get wallet", () => {
    test("should return wallet data", async () => {
      const res = await request(app)
        .get("/users/wallet")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("UserId");
      expect(res.body.data).toHaveProperty("UserId", expect.any(Number));
    });
  });

  describe("GET /users/wallet -- fail case to get wallet", () => {
    test("should return wallet data", async () => {
      const res = await request(app)
        .get("/users/wallet")
        .set("access_token", validToken);
      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", "Unauthorized access account");
    });
  });
});

describe("POST /users/transactions", () => {
  describe("POST /users/transactions -- success case to create transaction", () => {
    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 1000000,
        imageReceipt: "this is for image recipt 1",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 8,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 500000,
        imageReceipt: "this is for image recipt 2",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 12,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 500000,
        imageReceipt: "this is for image recipt 6",
        transactionDate: "2022-05-17 18:54:33.783 +00:00",
        CategoryId: 26,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 500000,
        imageReceipt: "this is for image recipt 6",
        transactionDate: "2022-05-17 18:54:33.783 +00:00",
        CategoryId: 22,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser1)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return error message", async () => {
      const NewTransaction = {
        amount: 1000000,
        imageReceipt: "this is for image recipt 9",
        transactionDate: "2022-05-17 18:54:33.783 +00:00",
        CategoryId: 10,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser1)
        .send(NewTransaction);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return error message", async () => {
      const NewTransaction = {
        amount: 100000,
        imageReceipt: "this is for image recipt 9",
        transactionDate: "2022-05-17 18:54:33.783 +00:00",
        CategoryId: 7,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser1)
        .send(NewTransaction);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return error message", async () => {
      const NewTransaction = {
        amount: 1000000,
        imageReceipt: "this is for image recipt 9",
        transactionDate: "2022-05-17 18:54:33.783 +00:00",
        CategoryId: 14,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser2)
        .send(NewTransaction);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });
  });

  describe("POST /users/transactions -- fail case to create transaction", () => {
    test("should return error message after create transaction", async () => {
      const NewTransaction = {
        amount: -4,
        imageReceipt: "this is for image recipt 1",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 8,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser)
        .send(NewTransaction);
      expect(res.status).toBe(400);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message", expect.any(Array));
      expect(res.body.message).toContain("Amount should be more than equal 0");
    });
  });
});

describe("GET /users/transactions", () => {
  describe("GET /users/transactions -- success case to get transaction", () => {
    test("should return new transaction data", async () => {
      const res = await request(app)
        .get("/users/transactions")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Array));
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("amount");
      expect(res.body.data[0]).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("WalletId");
      expect(res.body.data[0]).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("CategoryId");
      expect(res.body.data[0]).toHaveProperty("CategoryId", expect.any(Number));
    });
  });
});

describe("GET /users/transactions", () => {
  describe("GET /users/transactions -- success case to get transaction", () => {
    test("should return new transaction data", async () => {
      const res = await request(app)
        .get("/users/transactions/3")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });
  });

  describe("GET /users/transactions -- fail case to get transaction", () => {
    test("should return error message data", async () => {
      const res = await request(app)
        .get("/users/transactions/10")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Transaction not found")
    });
  });
});

describe("PUT /users/transactions/:id", () => {
  describe("PUT /users/transactions/:id -- success case to update transaction data", () => {
    test("should return updated transaction data", async () => {
      const updateTransaction = {
        amount: 10000000,
        imageReceipt: "this is for image recipt 1",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 6,
      };
      const res = await request(app)
        .put("/users/transactions/1")
        .set("access_token", validTokenUser)
        .send(updateTransaction);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return updated transaction data", async () => {
      const updateTransaction = {
        amount: 10000000,
        imageReceipt: "this is for image recipt 1",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 9,
      };
      const res = await request(app)
        .put("/users/transactions/1")
        .set("access_token", validTokenUser)
        .send(updateTransaction);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return updated transaction data", async () => {
      const updateTransaction = {
        amount: 2000000,
        imageReceipt: "this is for image recipt 3",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 9,
      };
      const res = await request(app)
        .put("/users/transactions/2")
        .set("access_token", validTokenUser)
        .send(updateTransaction);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return updated transaction data", async () => {
      const updateTransaction = {
        amount: 15000000,
        imageReceipt: "this is for image recipt 4",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 6,
      };
      const res = await request(app)
        .put("/users/transactions/2")
        .set("access_token", validTokenUser)
        .send(updateTransaction);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });
  });

  describe("PUT /users/transactions/:id -- fail case to update transaction data", () => {
    test("should return updated transaction data", async () => {
      const updateTransaction = {
        amount: 15000000,
        imageReceipt: "this is for image recipt 4",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 6,
      };
      const res = await request(app)
        .put("/users/transactions/10")
        .set("access_token", validTokenUser)
        .send(updateTransaction);
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Transaction not found");
    });
  });
});

describe("GET /users/transactions/report", () => {
  describe("GET /users/transactions/report -- success case to get report", () => {
    test("should return report transaction data", async () => {
      const res = await request(app)
        .get("/users/transactions/report")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Array));
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("Category");
      expect(res.body.data[0]).toHaveProperty("Category", expect.any(Object));
      expect(res.body.data[0]).toHaveProperty("amount");
      expect(res.body.data[0]).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("WalletId");
      expect(res.body.data[0]).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("CategoryId");
      expect(res.body.data[0]).toHaveProperty("CategoryId", expect.any(Number));
      expect(res.body.moneyStatus).toEqual(expect.any(String));
      expect(res.body.totalIncome).toEqual(expect.any(Number));
      expect(res.body.totalExpenses).toEqual(expect.any(Number));
      expect(res.body.expense).toEqual(expect.any(Object));
      expect(res.body.income).toEqual(expect.any(Object));
    });

    test("should return report transaction data", async () => {
      const res = await request(app)
        .get("/users/transactions/report")
        .set("access_token", validTokenUser1);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Array));
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("Category");
      expect(res.body.data[0]).toHaveProperty("Category", expect.any(Object));
      expect(res.body.data[0]).toHaveProperty("amount");
      expect(res.body.data[0]).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("WalletId");
      expect(res.body.data[0]).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("CategoryId");
      expect(res.body.data[0]).toHaveProperty("CategoryId", expect.any(Number));
      expect(res.body.moneyStatus).toEqual(expect.any(String));
      expect(res.body.totalIncome).toEqual(expect.any(Number));
      expect(res.body.totalExpenses).toEqual(expect.any(Number));
      expect(res.body.expense).toEqual(expect.any(Object));
      expect(res.body.income).toEqual(expect.any(Object));
    });

    test("should return new transaction data", async () => {
      const res = await request(app)
        .get("/users/transactions/report?month=5&year=2022")
        .set("access_token", validTokenUser2);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Array));
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("Category");
      expect(res.body.data[0]).toHaveProperty("Category", expect.any(Object));
      expect(res.body.data[0]).toHaveProperty("amount");
      expect(res.body.data[0]).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("WalletId");
      expect(res.body.data[0]).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("CategoryId");
      expect(res.body.data[0]).toHaveProperty("CategoryId", expect.any(Number));
      expect(res.body.moneyStatus).toEqual(expect.any(String));
      expect(res.body.totalIncome).toEqual(expect.any(Number));
      expect(res.body.totalExpenses).toEqual(expect.any(Number));
      expect(res.body.expense).toEqual(expect.any(Object));
      expect(res.body.income).toEqual(expect.any(Object));
    });
  });
});

describe("DELETE /users/transactions/:id", () => {
  describe("DELETE /users/transactions/:id -- success case to delete transaction", () => {
    test("should return deleted transaction data", async () => {
      const res = await request(app)
        .delete("/users/transactions/1")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return deleted transaction data", async () => {
      const res = await request(app)
        .delete("/users/transactions/2")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });
  });

  describe("DELETE /users/transactions/:id -- fail case to delete transaction", () => {
    test("should return error message data", async () => {
      const res = await request(app)
        .delete("/users/transactions/10")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Transaction not found");
    });
  });
});

describe("GET /categories", () => {
  describe("GET /categories -- success case to get categories", () => {
    test("should return  categories data", async () => {
      const res = await request(app)
        .get("/categories")
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("incomeCategories", expect.any(Array));
      expect(res.body.data).toHaveProperty("expenseCategories", expect.any(Array));
    });
  });
});

describe("GET /categories", () => {
  describe("GET /categories -- success case to get categories", () => {
    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 50000000,
        imageReceipt: "this is for image recipt 1",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 6,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser3)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 5000000,
        imageReceipt: "this is for image recipt 300",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 10,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser3)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 5000000,
        imageReceipt: "this is for image recipt 300",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 3,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser3)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 5000000,
        imageReceipt: "this is for image recipt 300",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 4,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser3)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 5000000,
        imageReceipt: "this is for image recipt 300",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 1,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser3)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });

    test("should return new transaction data", async () => {
      const NewTransaction = {
        amount: 5000000,
        imageReceipt: "this is for image recipt 300",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 2,
      };
      const res = await request(app)
        .post("/users/transactions")
        .set("access_token", validTokenUser3)
        .send(NewTransaction);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });
  });

  describe("PUT /users/transactions/:id -- success case to update transaction data", () => {
    test("should return updated transaction data", async () => {
      const updateTransaction = {
        amount: 10000000,
        imageReceipt: "this is for image recipt 1",
        transactionDate: "2022-05-19 18:54:33.783 +00:00",
        CategoryId: 6,
      };
      const res = await request(app)
        .put("/users/transactions/9")
        .set("access_token", validTokenUser3)
        .send(updateTransaction);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Object));
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("id", expect.any(Number));
      expect(res.body.data).toHaveProperty("amount");
      expect(res.body.data).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data).toHaveProperty("WalletId");
      expect(res.body.data).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data).toHaveProperty("CategoryId");
      expect(res.body.data).toHaveProperty("CategoryId", expect.any(Number));
    });
  })
});

describe("GET /users/transactions/report", () => {
  describe("GET /users/transactions/report -- success case to get report", () => {
    test("should return new transaction data", async () => {
      const res = await request(app)
        .get("/users/transactions/report")
        .set("access_token", validTokenUser3);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body.data).toEqual(expect.any(Array));
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("Category");
      expect(res.body.data[0]).toHaveProperty("Category", expect.any(Object));
      expect(res.body.data[0]).toHaveProperty("amount");
      expect(res.body.data[0]).toHaveProperty("amount", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("WalletId");
      expect(res.body.data[0]).toHaveProperty("WalletId", expect.any(Number));
      expect(res.body.data[0]).toHaveProperty("CategoryId");
      expect(res.body.data[0]).toHaveProperty("CategoryId", expect.any(Number));
      expect(res.body.moneyStatus).toEqual(expect.any(String));
      expect(res.body.totalIncome).toEqual(expect.any(Number));
      expect(res.body.totalExpenses).toEqual(expect.any(Number));
      expect(res.body.expense).toEqual(expect.any(Object));
      expect(res.body.income).toEqual(expect.any(Object));
    });
  });
});