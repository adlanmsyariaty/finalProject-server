const request = require("supertest");
const app = require("../app.js");
const { User, Transaction } = require("../models");
const { tokenGenerator } = require("../helpers/jwt");

describe("Testing user", () => {
	beforeAll(async () => {
		await User.create({
      name: "malik",
      username: "malik",
      email: "malik@mail.com",
      password: "12345",
      role: "user",
    });

    const newUser = await User.findOne({
      where: {
        id: 1,
      },
    });

    validTokenUser = tokenGenerator({
      id: newUser.id,
      email: newUser.email,
    });
	});

	beforeEach(() => {
		jest.restoreAllMocks();
	});

	afterAll(async () => {
		await User.deleteAll();
	});

	it("Should be return error when hit findAll", (done) => {
    Transaction.findAll = jest.fn().mockRejectedValue('Error')
		request(app)
			.get("/users/transactions")
      .set("access_token", validTokenUser)
			.then((res) => {
        // expect your response here
				expect(res.status).toBe(500);
				expect(res.body).toBe("Internal Server Error");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});