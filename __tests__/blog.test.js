const request = require("supertest");
var { app, start } = require("../app");
var Blog = require("../models/blogModel");

describe("Blogs api", () => {
  let createdBlogId;
  beforeAll(() => {
    return start();
  }, 5000);

  beforeAll(async () => {
    const blog = await Blog.create({
      title: "Some title",
      text: "some text",
    });
    createdBlogId = blog._id;
  });

  afterAll(async () => {
    await Blog.deleteMany();
  });

  it("GET /blogs => 200", () => {
    return request(app)
      .get("/api/v1/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /blogs/:id => 200", () => {
    return request(app)
      .get(`/api/v1/blogs/${createdBlogId}`)
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

  it("PUT /blogs/correctId => 200", () => {
    return request(app)
      .put(`/api/v1/blogs/${createdBlogId}`)
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(200);
  });

  it("PUT /blogs/nonExistingId => 404", () => {
    return request(app)
      .put("/api/v1/blogs/652bfcde2353571f78a52334")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(404);
  });

  it("PUT /blogs/wrongFormattedId => 404", () => {
    return request(app)
      .put("/api/v1/blogs/123")
      .send({
        title: "new title",
        text: "new text",
      })
      .expect(404);
  });

  it("PUT /blogs/updateTrustVote/correctId => 200", () => {
    return request(app)
      .put(`/api/v1/blogs/updateTrustVote/${createdBlogId}`)
      .send({
        voteState: "up",
      })
      .expect(200);
  });

  it("DELETE /blogs/correctId => 200", () => {
    return request(app).delete(`/api/v1/blogs/${createdBlogId}`).expect(200);
  });

  it("DELETE /blogs/nonExistingID => 404", () => {
    return request(app)
      .delete("/api/v1/blogs/652bgdd12353571f78a58980")
      .expect(404);
  });
});
