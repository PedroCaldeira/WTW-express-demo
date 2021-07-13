const chai = require("chai");
const expect = chai.expect;
const app = require("../app");
const supertest = require("supertest");

let server, request, response;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

describe("GET /", () => {
  beforeEach(async () => {
    response = await request.get("/?message=John Doe");
  });
  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });
  it("is expected to respond with a bit of HTML", () => {
    expect(response.text).to.equal("<h1>Hello John Doe</h1>");
  });
});

describe("POST /", () => {
  beforeEach(async () => {
    response = await request.post("/").send({ name: "john" });
  });
  it("is expected to respond with a bit of HTML", () => {
    actual_response = JSON.stringify(response.body);
    expect(actual_response).to.equal(
      JSON.stringify({ message: { name: "john" } })
    );
  });
});

describe("POST /user", () => {

  it("is expected to send UNDERAGE if age < 18", async () => {
    response = await request.post("/user").send({ name: "john", age: 17 });
    actual_response = response.text;
    expect(actual_response).to.equal("UNDERAGE");
  });

  it("is expected to send ALL GOOD if age >= 18", async () => {
    response = await request.post("/user").send({ name: "john", age: 21 });
    actual_response = response.text;
    expect(actual_response).to.equal("ALL GOOD");
  });
});
