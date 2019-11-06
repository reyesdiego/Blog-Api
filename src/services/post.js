const Post = require("../models/post");

module.exports.add = async post => {
  try {
    return await Post.create(post);
  } catch (err) {
    throw err;
  }
};

module.exports.update = async post => {
  const { _id } = post;
  delete post._id;
  try {
    return await Post.findByIdAndUpdate(_id, post, { new: true });
  } catch (err) {
    throw err;
  }
};

module.exports.delete = async _id => {
  try {
    return await Post.findByIdAndDelete(_id);
  } catch (err) {
    throw err;
  }
};
