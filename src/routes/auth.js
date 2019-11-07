const authController = require("../controllers/auth");

module.exports = router => {
  router.route("/auth/login").post(authController.login);
  return router;
};
