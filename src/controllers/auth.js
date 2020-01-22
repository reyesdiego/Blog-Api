const authService = require("../services/auth");

module.exports.verify = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    req.user = await authService.verify(token);
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    res.status(200).send(await authService.login(req.body));
  } catch (err) {
    res.status(401).send(err.message);
  }
};

