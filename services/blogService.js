//packages

//imports
const Blog = require("../models/blogModel");
const customError = require("../errors");

async function getBlogs() {
  const blogs = await Blog.find({});
  return blogs;
}

async function getBlog(blogId) {
  const blog = await Blog.find({
    _id: blogId,
  });
  if (!blog) {
    throw new customError.NotFound(`No blog found with id: ${blogId}`);
  }
  return blog;
}

async function createBlog(data) {
  const { title, text } = data;
  if (typeof title != "string" || typeof text != "string") {
    throw new customError.BadRequest(
      "Please only give text for both title and content fields"
    );
  }
  const blog = await Blog.create({ title, text });
  return blog;
}

async function updateBlog(blogId, data) {
  if (data.noOfTrustVote) {
    delete data[noOfTrustVote];
  }
  const blog = await Blog.findOneAndUpdate(
    {
      _id: blogId,
    },
    data,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!blog) {
    throw new customError.NotFound(`No blog found with id: ${blogId}`);
  }
  return blog;
}

async function updateTrustVote(blogId, data) {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new customError.NotFound(`No blog found with id: ${blogId}`);
  }
  if (data.voteState.toString() === "up") {
    blog.noOfTrustVote += 1;
  } else {
    blog.noOfTrustVote -= 1;
  }
  await blog.save();
  return blog;
}

async function deleteBlog(blogId) {
  const blog = await Blog.findOneAndDelete({
    _id: blogId,
  });
  if (!blog) {
    throw new customError.NotFound(`No blog found with id: ${blogId}`);
  }
  return blog;
}

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  updateTrustVote,
  deleteBlog,
};
