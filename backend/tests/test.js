const request = require("supertest");
const http = require("http");
const App = require("../app");
const db = require("../config/db");
const port = 4000;
const appExpress = new App(port, db).app;
const app = http.createServer(appExpress);
let auth;
let auth2;

// beforeAll(async () => {
//   app = require("../app");
// });

describe("Tests API", function () {
  test("signup", async () => {
    const user = {
      pseudo: "test@test",
      email: "test@test",
      password: "test@test",
    };
    const response = await request(app).post("/api/user/signup").send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Utilisateur créé !");
  });
  test("login", async () => {
    const user = {
      email: "test@test",
      password: "test@test",
    };
    const response = await request(app).post("/api/user/login").send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Utilisateur connecté !");
    auth2 = {
      pseudo: response.body.pseudo,
      uid: response.body.uid,
      token: response.body.token,
    };
  });
  test("getAllUsers", async () => {
    const user = {
      pseudo: "jean@test",
      email: "jean@test",
      password: "jean@test",
    };
    let response = await request(app).post("/api/user/signup").send(user);
    auth = {
      pseudo: response.body.pseudo,
      uid: response.body.uid,
      token: response.body.token,
    };
    //-------------------------------------
    response = await request(app)
      .get("/api/user")
      .auth(auth.token, { type: "bearer" });
    expect(response.statusCode).toBe(201);
    expect(response.body.users[0].pseudo).toEqual("test@test");
    expect(response.body.users[1].pseudo).toEqual("jean@test");
    // expect(response.body.users.length).toBe(2);
  });
  test("getOneUser", async () => {
    const response = await request(app)
      .get("/api/user/" + auth.uid)
      .auth(auth.token, { type: "bearer" });
    expect(response.statusCode).toBe(201);
    expect(response.body.user.pseudo).toEqual("jean@test");
  });
  test("modifyUser", async () => {
    const user = {
      email: "jean@56",
      password: "jean@56",
    };
    const response = await request(app)
      .put("/api/user/" + auth.uid)
      .send(user)
      .auth(auth.token, { type: "bearer" });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Utilisateur modifié !");
  });
  test("deleteUser", async () => {
    const password = {
      password: "test@test",
    };
    const response = await request(app)
      .post("/api/user/" + auth2.uid)
      .send(password)
      .auth(auth.token, { type: "bearer" });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual("Utilisateur supprimé !");
  });
  test("deleteUser", async () => {
    const password = {
      password: "jean@56",
    };
    const response = await request(app)
      .post("/api/user/" + auth.uid)
      .send(password)
      .auth(auth.token, { type: "bearer" });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual("Utilisateur supprimé !");
  });
});
