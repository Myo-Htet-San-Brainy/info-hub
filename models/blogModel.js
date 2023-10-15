const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title."],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Please provide text."],
      trim: true,
    },
    noOfTrustVote: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
