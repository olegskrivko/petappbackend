const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    // required: true,
  },
  source: {
    type: String,
    // required: true
  },
  sections: [sectionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
