import request from "supertest";
import app from "./index";

let accessToken: string = "";
let refreshToken: string = "";
let maxLengthPassword: string = "a".repeat(323);

// user can sign up
test("user can sign up", async () => {
  await request(app)
    .post("/auth/signup")
    .send({
      name: "test",
      email: "test@test.com",
      password: "testsecret123",
      avatar: "https://www.google.com",
    })
    .expect((res) => {
      accessToken = res.body.authToken;
      refreshToken = res.body.refreshToken;
      expect(res.status).toBe(200);
      expect(res.body.authToken).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
    });
});

// user can sign in
test("user can sign in", async () => {
  await request(app)
    .post("/auth/signin")
    .send({
      email: "test@test.com",
      password: "testsecret123",
    })
    .expect((res) => {
      accessToken = res.body.authToken;
      refreshToken = res.body.refreshToken;
      expect(res.status).toBe(200);
      expect(res.body.authToken).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
    });
});

// user can refresh token
test("user can refresh token", async () => {
  await request(app)
    .post("/auth/refresh")
    .send({
      refreshToken: refreshToken,
    })
    .expect((res) => {
      accessToken = res.body.authToken;
      refreshToken = res.body.refreshToken;
      expect(res.status).toBe(200);
      expect(res.body.authToken).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
    });
});

// user can get user info
test("user can get user info", async () => {
  await request(app)
    .get("/auth/me")
    .set("Authorization", `Bearer ${accessToken}`)
    .expect((res) => {
      expect(res.status).toBe(200);
    });
});

// user cannot refresh token with invalid refresh token
test("user cannot refresh token with invalid refresh token", async () => {
  await request(app)
    .post("/auth/refresh")
    .send({
      refreshToken: "invalid",
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});

// user cannot get user info with invalid access token
test("user cannot get user info with invalid access token", async () => {
  await request(app)
    .get("/auth/me")
    .set("Authorization", `Bearer invalid`)
    .expect((res) => {
      expect(res.status).toBe(401);
    });
});

// user cannot sign up with invalid email
test("user cannot sign up with invalid email", async () => {
  await request(app)
    .post("/auth/signup")
    .send({
      email: "invalid",
      password: "testsecret123",
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});

// user cannot sign up with too short password
test("user cannot sign up with too short password", async () => {
  await request(app)
    .post("/auth/signup")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});

// user cannot sign in with invalid email
test("user cannot sign in with invalid email", async () => {
  await request(app)
    .post("/auth/signin")
    .send({
      email: "invalid",
      password: "testsecret123",
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});

// user cannot sign in with invalid password
test("user cannot sign in with invalid password", async () => {
  await request(app)
    .post("/auth/signin")
    .send({
      email: "test@test.com",
      password: "invalid",
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});

// user cannot sign in with invalid email and password
test("user cannot sign in with invalid email and password", async () => {
  await request(app)
    .post("/auth/signin")
    .send({
      email: "invalid",
      password: "invalid",
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});
// user cannot sign up with too long password
test("user cannot sign up with too long password", async () => {
  await request(app)
    .post("/auth/signup")
    .send({
      email: "test@test.com",
      password: maxLengthPassword,
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});
// user cannot sign in with too long password
test("user cannot sign in with too long password", async () => {
  await request(app)
    .post("/auth/signin")
    .send({
      email: "test@test.com",
      password: maxLengthPassword,
    })
    .expect((res) => {
      expect(res.status).toBe(400);
    });
});

// after all tests are done, delete the user
afterAll(async () => {
  await request(app)
    .delete("/auth/delete")
    .set("Authorization", `Bearer ${accessToken}`)
    .expect((res) => {
      expect(res.status).toBe(200);
    });
  app.close();
});
