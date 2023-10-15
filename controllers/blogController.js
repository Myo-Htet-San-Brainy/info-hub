//packages
const { StatusCodes } = require("http-status-codes");

//imports
const blogService = require("../services/blogService");

const getBlogs = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: [] });
};

const getBlog = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: {} });
};

const createBlog = async (req, res) => {
  res.status(StatusCodes.CREATED).send("Blog created.");
};

const updateBlog = async (req, res) => {
  const { id: blogId } = req.params;

  res.status(StatusCodes.OK).json({ data: {} });
};

const updateTrustVote = async (req, res) => {
  const { id: blogId } = req.params;

  res.status(StatusCodes.OK).json({ data: {} });
};

const deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;

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
