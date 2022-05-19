const request = require("supertest");
const app = require("../app.js");
const { User } = require("../models");
const { tokenGenerator } = require("../helpers/jwt");

let validToken;
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

    test("should return new admin with valid name, username, email, password", async () => {
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
    //     test('should return error message Email is required with status 400', async () => {
    //         const newViewer = {username: 'adlan', password: '12345'}
    //         const res = await request(app).post('/viewers/register').send(newViewer)
    //         expect(res.status).toBe(400)
    //         expect(res.body).toBeInstanceOf(Object)
    //         expect(res.body.message).toBeInstanceOf(Array)
    //         expect(res.body.message).toContain('Email is required')
    //     })

    //     test('should return error message Password is required & Min. Character of password is 5 with status 400', async () => {
    //         const newViewer = {username: 'adlan', email: 'adlanmalik@gmail.com', password: ''}
    //         const res = await request(app).post('/viewers/register').send(newViewer)
    //         expect(res.status).toBe(400)
    //         expect(res.body).toBeInstanceOf(Object)
    //         expect(res.body.message).toBeInstanceOf(Array)
    //         expect(res.body.message).toContain('Password is required')
    //         expect(res.body.message).toContain('Min. Character of password is 5')
    //     })

    //     test('should return error message Password is required with status 400', async () => {
    //         const newViewer = {username: 'adlan', email: 'adlanmalik@gmail.com'}
    //         const res = await request(app).post('/viewers/register').send(newViewer)
    //         expect(res.status).toBe(400)
    //         expect(res.body).toBeInstanceOf(Object)
    //         expect(res.body.message).toBeInstanceOf(Array)
    //         expect(res.body.message).toContain('Password is required')
    //     })

    //     test('should return error message Your email format is invalid with status 400', async () => {
    //         const newViewer = {username: 'adlan', email: 'adlanmalik', password: '12345'}
    //         const res = await request(app).post('/viewers/register').send(newViewer)
    //         expect(res.status).toBe(400)
    //         expect(res.body).toBeInstanceOf(Object)
    //         expect(res.body.message).toBeInstanceOf(Array)
    //         expect(res.body.message).toContain('Your email format is invalid')
    //     })

    //     test('should return error message Your email is already registered with status 400', async () => {
    //         const newViewer = {username: 'adlan', email: 'adlan@gmail.com', password: '12345'}
    //         const res = await request(app).post('/viewers/register').send(newViewer)
    //         expect(res.status).toBe(400)
    //         expect(res.body).toBeInstanceOf(Object)
    //         expect(res.body.message).toContain('Your email is already registered')
    //     })
  });
});

describe("POST /login", () => {
  describe("POST /login -- success case for login", () => {
    test("should return access_token with valid email, password", async () => {
      const user = { email: "adlan@gmail.com", password: "12345" };
      const res = await request(app).post("/users/login").send(user);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("access_token", expect.any(String));
    });

    test("should return new user with valid email, password", async () => {
      const admin = { email: "malik@mail.com", password: "12345" };
      const res = await request(app).post("/login").send(admin);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  // describe("POST /login -- failure case for login", () => {
  //   test("should return error message Invalid email or password with status 401 due to wrong password", async () => {
  //     const newViewer = {
  //       email: "adlan@gmail.com",
  //       password: "wrongpasswordinput",
  //     };
  //     const res = await request(app).post("/viewers/login").send(newViewer);
  //     expect(res.status).toBe(401);
  //     expect(res.body).toEqual(expect.any(Object));
  //     expect(res.body).toHaveProperty("message", "Invalid email or password");
  //   });

  //   test("should return error message Invalid email or password with status 401 due to unregister email", async () => {
  //     const newViewer = {
  //       email: "notregistered@gmail.com",
  //       password: "1234567",
  //     };
  //     const res = await request(app).post("/viewers/login").send(newViewer);
  //     expect(res.status).toBe(401);
  //     expect(res.body).toEqual(expect.any(Object));
  //     expect(res.body).toHaveProperty("message", "Invalid email or password");
  //   });
  // });
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

  // describe("POST /login -- failure case for login", () => {
  //   test("should return error message Invalid email or password with status 401 due to wrong password", async () => {
  //     const newViewer = {
  //       email: "adlan@gmail.com",
  //       password: "wrongpasswordinput",
  //     };
  //     const res = await request(app).post("/viewers/login").send(newViewer);
  //     expect(res.status).toBe(401);
  //     expect(res.body).toEqual(expect.any(Object));
  //     expect(res.body).toHaveProperty("message", "Invalid email or password");
  //   });

  //   test("should return error message Invalid email or password with status 401 due to unregister email", async () => {
  //     const newViewer = {
  //       email: "notregistered@gmail.com",
  //       password: "1234567",
  //     };
  //     const res = await request(app).post("/viewers/login").send(newViewer);
  //     expect(res.status).toBe(401);
  //     expect(res.body).toEqual(expect.any(Object));
  //     expect(res.body).toHaveProperty("message", "Invalid email or password");
  //   });
  // });
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

  // describe("POST /login -- failure case for login", () => {
  //   test("should return error message Invalid email or password with status 401 due to wrong password", async () => {
  //     const newViewer = {
  //       email: "adlan@gmail.com",
  //       password: "wrongpasswordinput",
  //     };
  //     const res = await request(app).post("/viewers/login").send(newViewer);
  //     expect(res.status).toBe(401);
  //     expect(res.body).toEqual(expect.any(Object));
  //     expect(res.body).toHaveProperty("message", "Invalid email or password");
  //   });

  //   test("should return error message Invalid email or password with status 401 due to unregister email", async () => {
  //     const newViewer = {
  //       email: "notregistered@gmail.com",
  //       password: "1234567",
  //     };
  //     const res = await request(app).post("/viewers/login").send(newViewer);
  //     expect(res.status).toBe(401);
  //     expect(res.body).toEqual(expect.any(Object));
  //     expect(res.body).toHaveProperty("message", "Invalid email or password");
  //   });
  // });
});
