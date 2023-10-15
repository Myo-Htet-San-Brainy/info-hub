const request = require("supertest");
var { app, start } = require("../app");

describe("Blogs api", () => {
  beforeAll(() => {
    return start();
  }, 5000);

  it("GET /blogs => 200", () => {
    return request(app)
      .get("/api/v1/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /blogs/:id => 200", () => {
    return request(app)
      .get("/api/v1/blogs/1")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /blogs/nonExistingID => 404", () => {
    return request(app).get("/api/v1/blogs/123").expect(404);
  });

  it("POST /blogs => 201", () => {
    return request(app)
      .post("/api/v1/blogs")
      .send({
        title: "some title",
        text: "some text",
      })
      .expect(201);
  });

  it("POST /blogs => validates req body,400", () => {
    return request(app)
      .post("/api/v1/blogs")
      .send({
        title: 123,
        text: 123,
      })
      .expect(400);
  });

  it("PUT /blogs/:id => 200", () => {
    return request(app)
      .put("/api/v1/blogs/123")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(200);
  });

  it("PUT /blogs/nonExistingId => 404", () => {
    return request(app)
      .put("/api/v1/blogs/nonExist")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(404);
  });

  it("PUT /blogs/wrongFormattedId => 404", () => {
    return request(app)
      .put("/api/v1/blogs/wrongFormat")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(404);
  });

  it("GET /blogs/updateTrustVote/:id => 200", () => {
    return request(app)
      .put("/api/v1/blogs/updateTrustVote/correctId")
      .send({
        voteState: "up",
      })
      .expect(200);
  });

  it("DELETE /blogs/:id => 200", () => {
    return request(app).delete("/api/v1/blogs/correctId").expect(200);
  });

  it("DELETE /blogs/nonExistingID => 404", () => {
    return request(app).delete("/api/v1/blogs/nonExistId").expect(404);
  });
});
