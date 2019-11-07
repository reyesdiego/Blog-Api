const postService = require("../services/post");

module.exports.post = async (req, res) => {
  try {
    res.send(await postService.add({ ...req.body, userId: req.user._id }));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.update = async (req, res) => {
  try {
    res.send(await postService.update(req.body));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.delete = async (req, res) => {
  try {
    res.send(await postService.delete(req.body._id));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.get = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const posts = await postService.get(tags);
    res.send(posts);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
