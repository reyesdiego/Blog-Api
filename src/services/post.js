const Post = require("../models/post");

module.exports.add = async post => {
  try {
    return await Post.create(post);
  } catch (err) {
    throw err;
  }
};
