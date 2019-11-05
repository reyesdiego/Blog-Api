const User = require("../models/user");

module.exports.add = async user => {
  try {
    return await User.create(user);
  } catch (err) {
    throw err;
  }
};
