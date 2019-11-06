const userService = require("../services/user");

module.exports.post = async (req, res, next) => {
  try {
    const post = await userService.add(req.body);
    res.send(post);
  } catch (err) {
    res.status(400).send(err);
  }
};
