const jwt = require("jsonwebtoken");
const { secret } = require("../../settings");
module.exports.login = async payload => {
  const { email, password } = payload;
  /**
   * Here it would validates user credentials with database
   * If it is a valid user it will return a token
   */
  if (email && password) {
    return await jwt.sign({ email }, secret);
  } else {
    throw Error("Invalid Credentials");
  }
};
