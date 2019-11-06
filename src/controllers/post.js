const postService = require("../services/post");

module.exports.post = async (req, res) => {
  try {
    const post = await postService.add(req.body);
    res.send(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.update = async (req, res) => {
  const post = await postService.update(req.body);
  try {
    res.send(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.get = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const posts = await postService.get(tags);
    res.send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
};
