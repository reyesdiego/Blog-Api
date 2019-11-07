const express = require("express");
const router = express.Router();
const auth = require("./auth");
const user = require("./user");
const post = require("./post");

router.route("/").get((req, res) => {
  res.send({ hi: "there" });
});

auth(router);
user(router);
post(router);

module.exports = router;
