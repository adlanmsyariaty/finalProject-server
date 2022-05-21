const request = require("supertest");
const app = require("../app.js");
const { User } = require("../models");
const { tokenGenerator } = require("../helpers/jwt");

let validToken;
let validTokenUser;
let invalidToken = "hsdihsdinj32y7f873yh83473h383hj4j3";

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
      role: "consultant",
    },
    {
      name: "zakiy",
      username: "zakiynurhasyim",
      email: "zakiynurhasyim@mail.com",
      password: "12345",
      role: "consultant",
    },
  ];

  await User.bulkCreate(data);

  const newUser = await User.findOne({
    where: {
      id: 2
    }
  })

  validTokenUser = tokenGenerator({
    id: newUser.id,
    email: newUser.email,
  });

  validToken = tokenGenerator({
    id: newAdmin.id,
    email: newAdmin.email,
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});

describe("POST /register", () => {
  describe("POST /register -- success case for register new user for role user, consultant, and admin", () => {
    test("should return new user with valid name, username, email, password", async () => {
      const newUser = {
        name: "adlan",
        username: "adlan",
        email: "adlan@gmail.com",
        password: "12345",
        role: "user",
      };
      const res = await request(app).post("/users/register").send(newUser);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("name", newUser.name);
      expect(res.body).toHaveProperty("username");
      expect(res.body).toHaveProperty("username", expect.any(String));
      expect(res.body).toHaveProperty("username", newUser.username);
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("email", expect.any(String));
      expect(res.body).toHaveProperty("email", newUser.email);
      expect(res.body).toHaveProperty("role");
      expect(res.body).toHaveProperty("role", expect.any(String));
      expect(res.body).toHaveProperty("role", newUser.role);
    });

    test("should return new admin with valid name, username, email, password", async () => {
      const newAdmin1 = {
        name: "syariaty",
        username: "syariaty",
        email: "syariaty@gmail.com",
        password: "12345",
        role: "admin",
      };
      const res = await request(app)
        .post("/register/admin")
        .send(newAdmin1)
        .set("access_token", validToken);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("name", newAdmin1.name);
      expect(res.body).toHaveProperty("username");
      expect(res.body).toHaveProperty("username", expect.any(String));
      expect(res.body).toHaveProperty("username", newAdmin1.username);
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("email", expect.any(String));
      expect(res.body).toHaveProperty("email", newAdmin1.email);
      expect(res.body).toHaveProperty("role");
      expect(res.body).toHaveProperty("role", expect.any(String));
      expect(res.body).toHaveProperty("role", newAdmin1.role);
    });

    test("should return new consultant with valid name, username, email, password", async () => {
      const newConsultant = {
        name: "consultant234",
        username: "consultant234",
        email: "consultant234@gmail.com",
        password: "12345",
        role: "consultant",
      };
      const res = await request(app)
        .post("/register/consultant")
        .send(newConsultant)
        .set("access_token", validToken);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("name", newConsultant.name);
      expect(res.body).toHaveProperty("username");
      expect(res.body).toHaveProperty("username", expect.any(String));
      expect(res.body).toHaveProperty("username", newConsultant.username);
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("email", expect.any(String));
      expect(res.body).toHaveProperty("email", newConsultant.email);
      expect(res.body).toHaveProperty("role");
      expect(res.body).toHaveProperty("role", expect.any(String));
      expect(res.body).toHaveProperty("role", newConsultant.role);
    });
  });

  describe("POST /register -- failure case for register", () => {
    describe("POST /register -- failure case for register new user", () => {
      test("should return error message Email is required with status 400", async () => {
        const newUser = {
          name: "adlan",
          username: "adlan",
          email: "",
          password: "12345",
          role: "user",
        };
        const res = await request(app).post("/users/register").send(newUser);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message).toContain("Email is required");
        expect(res.body.message).toContain("Invalid email format");
      });

      test("should return error message Name is required with status 400", async () => {
        const newUser = {
          name: "",
          username: "adlan12",
          email: "adlan12@mail.com",
          password: "12345",
          role: "user",
        };
        const res = await request(app).post("/users/register").send(newUser);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message).toContain("Name is required");
      });

      test("should return error message Username is required with status 400", async () => {
        const newUser = {
          name: "adlan13",
          username: "",
          email: "adlan13@mail.com",
          password: "12345",
          role: "user",
        };
        const res = await request(app).post("/users/register").send(newUser);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toContain("Username is required");
      });

      test("should return error message Email is must be unique with status 400", async () => {
        const newUser = {
          name: "adlan",
          username: "adlan",
          email: "adlan@gmail.com",
          password: "12345",
          role: "user",
        };
        const res = await request(app).post("/users/register").send(newUser);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", expect.any(String));
        expect(res.body.message).toContain("Your email is already registered");
      });
    });

    describe("POST /register -- failure case for register new admin", () => {
      test("should return error message Email is required with status 400", async () => {
        const newAdmin3 = {
          name: "adlan",
          username: "adlan",
          email: "",
          password: "12345",
          role: "admin",
        };
        const res = await request(app)
          .post("/register/admin")
          .send(newAdmin3)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message).toContain("Email is required");
        expect(res.body.message).toContain("Invalid email format");
      });

      test("should return error message Name is required with status 400", async () => {
        const newAdmin3 = {
          name: "",
          username: "adlan12",
          email: "adlan12@mail.com",
          password: "12345",
          role: "admin",
        };
        const res = await request(app)
          .post("/register/admin")
          .send(newAdmin3)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message).toContain("Name is required");
      });

      test("should return error message Username is required with status 400", async () => {
        const newAdmin3 = {
          name: "adlan13",
          username: "",
          email: "adlan13@mail.com",
          password: "12345",
          role: "admin",
        };
        const res = await request(app)
          .post("/register/admin")
          .send(newAdmin3)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toContain("Username is required");
      });

      test("should return error message Email is must be unique with status 400", async () => {
        const newAdmin3 = {
          name: "malik",
          username: "malik",
          email: "malik@mail.com",
          password: "12345",
          role: "admin",
        };
        const res = await request(app)
          .post("/register/admin")
          .send(newAdmin3)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", expect.any(String));
        expect(res.body.message).toContain("Your email is already registered");
      });
    });

    describe("POST /register -- failure case for register new consultant", () => {
      test("should return error message Email is required with status 400", async () => {
        const newConsultant = {
          name: "adlan",
          username: "adlan",
          email: "",
          password: "12345",
          role: "consultant",
        };
        const res = await request(app)
          .post("/register/consultant")
          .send(newConsultant)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message).toContain("Email is required");
        expect(res.body.message).toContain("Invalid email format");
      });

      test("should return error message Name is required with status 400", async () => {
        const newConsultant = {
          name: "",
          username: "adlan12",
          email: "adlan12@mail.com",
          password: "12345",
          role: "consultant",
        };
        const res = await request(app)
          .post("/register/consultant")
          .send(newConsultant)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBeInstanceOf(Array);
        expect(res.body.message).toContain("Name is required");
      });

      test("should return error message Username is required with status 400", async () => {
        const newConsultant = {
          name: "adlan13",
          username: "",
          email: "adlan13@mail.com",
          password: "12345",
          role: "consultant",
        };
        const res = await request(app)
          .post("/register/consultant")
          .send(newConsultant)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toContain("Username is required");
      });

      test("should return error message Email is must be unique with status 400", async () => {
        const newConsultant = {
          name: "debbyria",
          username: "debbyria",
          email: "debbyria@mail.com",
          password: "12345",
          role: "consultant",
        };
        const res = await request(app)
          .post("/register/consultant")
          .send(newConsultant)
          .set("access_token", validToken);
        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", expect.any(String));
        expect(res.body.message).toContain("Your email is already registered");
      });
    });
  });
});

describe("POST /login", () => {
  describe("POST /login -- success case for login", () => {
    test("should return access_token for user with valid email, password", async () => {
      const user = { email: "adlan@gmail.com", password: "12345" };
      const res = await request(app).post("/users/login").send(user);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("access_token", expect.any(String));
    });

    test("should return access_token for admin with valid email, password", async () => {
      const admin = { email: "malik@mail.com", password: "12345" };
      const res = await request(app).post("/login").send(admin);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("POST /login -- failure case for login", () => {
    describe("POST /login -- failure case for admin login", () => {
      test("should return error message Invalid email or password with status 401 due to wrong email for admin login", async () => {
        const admin = {
          email: "adlan@gmail.com",
          password: "12345",
        };
        const res = await request(app).post("/login").send(admin);
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid email or password");
      });

      test("should return error message Invalid email or password with status 401 due to wrong password for admin login", async () => {
        const admin = {
          email: "malik@mail.com",
          password: "wrongpasswordinput",
        };
        const res = await request(app).post("/login").send(admin);
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid email or password");
      });

      test("should return error message Invalid email or password with status 401 due to email is not inputted for admin login", async () => {
        const admin = {
          email: "",
          password: "wrongpasswordinput",
        };
        const res = await request(app).post("/login").send(admin);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Email is required");
      });

      test("should return error message Invalid email or password with status 401 due to password is not inputted for admin login", async () => {
        const admin = {
          email: "malik@mail.com",
          password: "",
        };
        const res = await request(app).post("/login").send(admin);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Password is required");
      });
    });

    describe("POST /login -- failure case for user login", () => {
      test("should return error message Invalid email or password with status 401 due to wrong email for user login", async () => {
        const consultant = {
          email: "adlan1@gmail.com",
          password: "12345",
        };
        const res = await request(app).post("/users/login").send(consultant);
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid email or password");
      });

      test("should return error message Invalid email or password with status 401 due to wrong password for user login", async () => {
        const consultant = {
          email: "adlan@gmail.com",
          password: "wrongpasswordinput",
        };
        const res = await request(app).post("/users/login").send(consultant);
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid email or password");
      });

      test("should return error message Invalid email or password with status 401 due to email is not inputted for admin login", async () => {
        const consultant = {
          email: "",
          password: "wrongpasswordinput",
        };
        const res = await request(app).post("/users/login").send(consultant);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Email is required");
      });

      test("should return error message Invalid email or password with status 401 due to password is not inputted for admin login", async () => {
        const consultant = {
          email: "adlan@gmail.com",
          password: "",
        };
        const res = await request(app).post("/users/login").send(consultant);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Password is required");
      });
    });
  });
});

describe("GET /consultants", () => {
  describe("GET /consultants -- success case to get consultant list", () => {
    test("should return consultant list", async () => {
      const res = await request(app)
        .get("/consultants")
        .set("access_token", validToken);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /consultants -- fail case to get consultant list", () => {
    test("should invalid token", async () => {
      const res = await request(app)
        .get("/consultants")
        .set("access_token", invalidToken);
      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty(
        "message",
        "Invalid identification token, please login first"
      );
    });

    test("should return Unauthorized", async () => {
      const res = await request(app)
        .get("/consultants")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty(
        "message",
        "Unauthorized access account"
      );
    });
  });
});

describe("GET /users/detail", () => {
  describe("GET /users/detail -- success case to get user detail data", () => {
    test("should return user detail data", async () => {
      const res = await request(app)
        .get("/users/detail")
        .set("access_token", validTokenUser);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("username", expect.any(String));
      expect(res.body).toHaveProperty("email", expect.any(String));
    });
  });
});

describe("DELETE /consultants", () => {
  describe("DELETE /consultants -- success case to delete consultant by id", () => {
    test("should return consultant list", async () => {
      const res = await request(app)
        .delete("/consultants/3")
        .set("access_token", validToken);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("username");
      expect(res.body).toHaveProperty("username", expect.any(String));
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("email", expect.any(String));
      expect(res.body).toHaveProperty("role");
      expect(res.body).toHaveProperty("role", expect.any(String));
    });
  });

  describe("DELETE /consultants -- fail case to delete consultant by id", () => {
    test("should return consultant list", async () => {
      const res = await request(app)
        .delete("/consultants/10")
        .set("access_token", validToken);
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Consultant not found");
    });
  });
});
