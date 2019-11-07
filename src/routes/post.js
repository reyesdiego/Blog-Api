const postController = require("../controllers/post");
const { verify } = require("../controllers/auth");
module.exports = router => {
  const route = router.route("/posts");
  route.post(verify, postController.post);
  route.patch(verify, postController.update);
  route.get(verify, postController.get);
  route.delete(verify, postController.delete);
  return router;
};
