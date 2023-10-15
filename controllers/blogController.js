//packages
const { StatusCodes } = require("http-status-codes");

//imports
const blogService = require("../services/blogService");

const getBlogs = async (req, res) => {
  const blogs = await blogService.getBlogs();
  res.status(StatusCodes.OK).json({ data: blogs });
};

const getBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await blogService.getBlog(blogId);
  res.status(StatusCodes.OK).json({ data: blog });
};

const createBlog = async (req, res) => {
  await blogService.createBlog(req.body);
  res.status(StatusCodes.CREATED).send("Blog created.");
};

const updateBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await blogService.updateBlog(blogId, req.body);
  res.status(StatusCodes.OK).json({ data: blog });
};

const updateTrustVote = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await blogService.updateTrustVote(blogId, req.body);
  res.status(StatusCodes.OK).json({ data: {} });
};

const deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;
  await blogService.deleteBlog(blogId);
  res.status(StatusCodes.OK).send("Blog deleted.");
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  updateTrustVote,
  deleteBlog,
};
