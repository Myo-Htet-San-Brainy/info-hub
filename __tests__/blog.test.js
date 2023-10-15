const request = require("supertest");
var { app, start } = require("../app");

describe("Blogs api", () => {
  beforeAll(() => {
    return start();
  }, 5000);

  it("GET /blogs => 200", () => {
    return request(app)
      .get("/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /blogs/:id => 200", () => {
    return request(app)
      .get("/blogs/1")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /blogs/nonExistingID => 404", () => {
    return request(app).get("/blogs/123").expect(404);
  });

  it("POST /blogs => 201", () => {
    return request(app)
      .post("/blogs")
      .send({
        title: "some title",
        text: "some text",
      })
      .expect(201);
  });

  it("POST /blogs => validates req body,400", () => {
    return request(app)
      .post("/blogs")
      .send({
        title: 123,
        text: 123,
      })
      .expect(400);
  });

  it("PUT /blogs/:id => 200", () => {
    return request(app)
      .put("/blogs/123")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(200);
  });

  it("PUT /blogs/nonExistingId => 404", () => {
    return request(app)
      .put("/blogs/nonExist")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(404);
  });

  it("PUT /blogs/wrongFormattedId => 404", () => {
    return request(app)
      .put("/blogs/wrongFormat")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(404);
  });

  it("GET /blogs/updateTrustVote/:id => 200", () => {
    return request(app)
      .put("/blogs/updateTrustVote/correctId")
      .send({
        voteState: "up",
      })
      .expect(200);
  });

  it("DELETE /blogs/:id => 200", () => {
    return request(app).delete("/blogs/correctId").expect(200);
  });

  it("DELETE /blogs/nonExistingID => 404", () => {
    return request(app).delete("/blogs/nonExistId").expect(404);
  });
});
