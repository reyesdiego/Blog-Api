const userController = require("../controllers/user");

module.exports = router => {
  const route = router.route("/users");
  route.post(userController.post);
  return router;
};
