const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const { comment_content, post_id } = req.body;
    const { user_id } = req.session;

    const newComment = await Comment.create({ comment_content, post_id, user_id });

    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
