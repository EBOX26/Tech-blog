// controllers/commentRoutes.js
const router = require('express').Router();
const { Comment } = require('../models/Comment');
const withAuth = require('../utils/auth');

// New Comment
router.post('/new/:post_id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      user_id: req.session.user_id,
      post_id: req.params.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
