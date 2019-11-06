const postController = require("../controllers/post");

module.exports = router => {
  const route = router.route("/posts");
  route.post(postController.post);
  route.patch(postController.update);
  route.get(postController.get);
  return router;
};
