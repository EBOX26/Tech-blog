const router = require("express").Router();
const { User } = require("../../models");

// Signup route
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !user.checkPassword(password)) {
      res.status(400).json({ message: "Invalid username or password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => res.status(204).end());
  } else {
    res.status(404).end();
  }
});

module.exports = router;
