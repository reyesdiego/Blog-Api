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

module.exports.get = async tags => {
  try {
    const tagsArray = tags.map(tag => new RegExp(tag, "i"));
    return await Post.find({ body: { $in: tagsArray } })
      .populate("userId", "email")
      .sort({ updatedAt: -1 });
  } catch (err) {
    throw err;
  }
};
