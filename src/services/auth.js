const jwt = require("jsonwebtoken");
const { secret } = require("../../settings");
const User = require("../models/user");

module.exports.login = async payload => {
  const { email, password } = payload;

  // password is not implemented for the assessment

  if (email && password) {
    const user = await User.findOne({ email });
    if (user) {
      return await jwt.sign({ _id: user._id, email }, secret);
    } else {
      throw Error("User not found");
    }
  } else {
    throw Error("Invalid Credentials");
  }
};

module.exports.verify = async token => {
  try {
    return await jwt.verify(token, secret);
  } catch (err) {
    throw Error("Invalid Token");
  }
};
