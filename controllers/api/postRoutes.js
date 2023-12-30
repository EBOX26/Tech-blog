const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { user_id } = req.session;

    const newPost = await Post.create({ title, content, user_id });

    console.log("New blog post: ", newPost);

    res.json(newPost);
  } catch (err) {
    console.log("Failed post!", err);
    res.status(500).json(err);
  }
});

// Update a post by ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await Post.update(req.body, {
      where: { id },
    });

    if (updatePost > 0) {
      res.status(200).json(updatePost);
    } else {
      res.status(404).json({ message: "No post found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.destroy({
      where: { id },
    });

    if (deletePost > 0) {
      res.status(200).json(deletePost);
    } else {
      res.status(404).json({ message: "No post found for this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
