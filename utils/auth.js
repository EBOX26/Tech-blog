// utils/auth.js
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn || req.session.cookie.expires < Date.now()) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
