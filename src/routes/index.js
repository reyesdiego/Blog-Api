const express = require("express");
const router = express.Router();
const user = require("./user");
const post = require("./post");

router.route("/").get((req, res) => {
  res.send({ hi: "there" });
});

user(router);
post(router);

module.exports = router;
