import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signing up", async () => {
  return request(app)
    .post("/api/users/signUp")
    .send({
      password: "1234",
      email: "test@test.com",
    })
    .expect(201);
});

it("returns a 400 status code with an invalid email", async () => {
  return request(app)
    .post("/api/users/signUp")
    .send({
      password: "1234",
      email: "hello",
    })
    .expect(400);
});

it("disallows diplicate email", async () => {
  await request(app)
    .post("/api/users/signUp")
    .send({
      email: "test1@gmail.com",
      password: "1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signUp")
    .send({
      email: "test1@gmail.com",
      password: "1234",
    })
    .expect(400);
});
